import { Router } from "express";

import { DeputadoController } from "./controllers/deputado.controller";
import { UserController } from "./controllers/user.controller";
import { UserFavoritesController } from "./controllers/user.favorites.controller";
import { DashboardController } from './controllers/dashboard.controller';
import { SessionController } from './controllers/session.controller';

const deputadoController = new DeputadoController();
const userController = new UserController();
const userFavoritesController = new UserFavoritesController();
const dashboardController = new DashboardController();
const sessionController = new SessionController();

const routes = Router();

routes.post('/users', userController.save);
routes.get('/users', userController.list);

routes.post('/session', sessionController.create);

routes.get('/deputados', deputadoController.list);
routes.get('/deputados/leg', deputadoController.last);
routes.get('/deputados/:matricula', deputadoController.index);

routes.post('/users-favorites', userFavoritesController.save);
routes.get('/users-favorites/:userId', userFavoritesController.list);

routes.get('/dashboard', dashboardController.list);

export { routes };
