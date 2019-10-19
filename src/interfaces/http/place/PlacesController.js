const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const PlacesController = {
  get router() {
    const router = Router();

    router.use(inject('placeSerializer'));

    router.get('/', inject('getAllPlaces'), this.index);
    router.get('/:id', inject('getPlace'), this.show);
    router.post('/', inject('createPlace'), this.create);
    router.put('/:id', inject('updatePlace'), this.update);
    router.delete('/:id', inject('deletePlace'), this.delete);

    return router;
  },

  async index(req, res, next) {
    const { getAllPlaces, placeSerializer } = req;
    const { SUCCESS } = getAllPlaces.outputs;

    const response = await getAllPlaces.execute();

    if (response.status === SUCCESS) {
      res
        .status(Status.OK)
        .json(response.payload.map(placeSerializer.serialize));
    }

    next(response.error);
  },

  async show(req, res, next) {
    const { getPlace, placeSerializer } = req;
    const { SUCCESS, NOT_FOUND } = getPlace.outputs;

    const response = await getPlace.execute(Number(req.params.id));

    if (response.status === SUCCESS) {
      return res
        .status(Status.OK)
        .json(placeSerializer.serialize(response.payload));
    }

    if (response.status === NOT_FOUND) {
      return res.status(Status.NOT_FOUND).json(response.payload);
    }

    next(response.error);
  },

  async create(req, res, next) {
    const { createPlace, placeSerializer } = req;
    const { SUCCESS, VALIDATION_ERROR } = createPlace.outputs;

    const response = await createPlace.execute(req.body);

    if (response.status === SUCCESS) {
      return res
        .status(Status.CREATED)
        .json(placeSerializer.serialize(response.payload));
    }

    if (response.status === VALIDATION_ERROR) {
      return res.status(Status.BAD_REQUEST).json(response.payload);
    }

    next(response.error);
  },

  async update(req, res, next) {
    const { updatePlace, placeSerializer } = req;
    const { SUCCESS, VALIDATION_ERROR, NOT_FOUND } = updatePlace.outputs;

    const response = await updatePlace.execute(Number(req.params.id), req.body);

    if (response.status === SUCCESS) {
      return res
        .status(Status.ACCEPTED)
        .json(placeSerializer.serialize(response.payload));
    }

    if (response.status === VALIDATION_ERROR) {
      return res.status(Status.BAD_REQUEST).json(response.payload);
    }

    if (response.status === NOT_FOUND) {
      return res.status(Status.NOT_FOUND).json(response.payload);
    }

    next(response.error);
  },

  async delete(req, res, next) {
    const { deletePlace } = req;
    const { SUCCESS, NOT_FOUND } = deletePlace.outputs;

    const response = await deletePlace.execute(Number(req.params.id));

    if (response.status === SUCCESS) {
      return res.status(Status.ACCEPTED).end();
    }

    if (response.status === NOT_FOUND) {
      return res.status(Status.NOT_FOUND).json(response.payload);
    }

    next(response.error);
  }
};

module.exports = PlacesController;
