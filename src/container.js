const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');

const {
  CreateUser,
  GetAllUsers,
  GetUser,
  UpdateUser,
  DeleteUser
} = require('./app/user');

const {
  CreatePlace,
  GetAllPlaces,
  GetPlace,
  UpdatePlace,
  DeletePlace
} = require('./app/place');

const UserSerializer = require('./interfaces/http/user/UserSerializer');
const PlaceSerializer = require('./interfaces/http/place/PlaceSerializer');

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

const logger = require('./infra/logging/logger');
const SequelizeUsersRepository = require('./infra/user/SequelizeUsersRepository');
const SequelizePlacesRepository = require('./infra/place/SequelizePlacesRepository');
const {
  database,
  User: UserModel,
  Place: PlaceModel
} = require('./infra/database/models');

const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config)
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware])
  });

// Repositories
container.register({
  usersRepository: asClass(SequelizeUsersRepository).singleton(),
  placesRepository: asClass(SequelizePlacesRepository).singleton()
});

// Database
container.register({
  database: asValue(database),
  UserModel: asValue(UserModel),
  PlaceModel: asValue(PlaceModel)
});

// --- Operations ---

// Users
container.register({
  createUser: asClass(CreateUser),
  getAllUsers: asClass(GetAllUsers),
  getUser: asClass(GetUser),
  updateUser: asClass(UpdateUser),
  deleteUser: asClass(DeleteUser)
});

// Places
container.register({
  createPlace: asClass(CreatePlace),
  getAllPlaces: asClass(GetAllPlaces),
  getPlace: asClass(GetPlace),
  updatePlace: asClass(UpdatePlace),
  deletePlace: asClass(DeletePlace)
});
// END :: Operations

// Serializers
container.register({
  userSerializer: asValue(UserSerializer),
  placeSerializer: asValue(PlaceSerializer)
});

module.exports = container;
