import { Router } from 'express';

import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController';
import TaskController from './app/controllers/TaskController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.delete);
routes.put('/users/:id', UserController.update);
routes.get('/users/:id', UserController.show);
routes.get('/users', UserController.index);

routes.post('/tasks', TaskController.store);
routes.delete('/tasks/:id', TaskController.delete);
routes.put('/tasks/:id', TaskController.update);
routes.get('/tasks/:id', TaskController.show);
routes.get('/tasks', TaskController.index);

routes.post('/login', LoginController.store);

export default routes;
