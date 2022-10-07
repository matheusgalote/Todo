import { Router } from 'express';

import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.delete);
routes.put('/users/:id', UserController.update);
routes.get('/users/:id', UserController.show);
routes.get('/users', UserController.index);

routes.post('/login', LoginController.store);

export default routes;
