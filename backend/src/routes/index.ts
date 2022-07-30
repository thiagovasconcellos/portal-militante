import { Router } from "express";

import { DeputadoController } from "./controllers/deputado.controller";

const deputadoController = new DeputadoController();

const routes = Router();

routes.get('/deputados', deputadoController.list);
routes.get('/deputados/leg', deputadoController.last);

export { routes };
