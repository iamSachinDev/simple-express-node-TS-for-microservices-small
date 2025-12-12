import { Router } from 'express';

import { validateCreateUser, validateUpdateUser } from './user.validate';
import { userController } from './user.controller';

// #swagger.tags = ['Users']
const r = Router();

r.get('/', (req, res) => userController.getUsers(req, res));
r.post('/', validateCreateUser, (req, res) => userController.createUser(req, res));
r.put('/:id', validateUpdateUser, (req, res) => userController.updateUser(req, res));

export default r;
