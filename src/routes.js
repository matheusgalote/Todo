import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.delete);
routes.put('/users/:id', UserController.update);
routes.get('/users/:id', UserController.show);
routes.get('/users', UserController.index);

export default routes;
