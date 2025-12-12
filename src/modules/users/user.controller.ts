import { Request, Response } from 'express';
import { userService } from './user.service';

export class UserController {
  async getUsers (_req: Request, res: Response) {
    /*
           #swagger.path = '/users'
           #swagger.summary = 'Get all users'
           #swagger.responses[200] = {
               description: 'List of users',
               content: {
                   'application/json': {
                       schema: { $ref: '#/components/schemas/UserResponse' }
                   }
               }
           }
        */
    const users = await userService.getAllUsers();
    res.json(users);
  }

  async createUser (req: Request, res: Response) {
    /*
           #swagger.path = '/users'
           #swagger.summary = 'Create a new user'
           #swagger.requestBody = {
               required: true,
               content: {
                   "application/json": {
                       schema: { $ref: "#/components/schemas/CreateUser" }
                   }
               }
           }
           #swagger.responses[201] = {
               description: 'User created',
               content: {
                   'application/json': {
                       schema: { $ref: '#/components/schemas/UserResponse' }
                   }
               }
           }
        */
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      if (error.message === 'User already exists') {
        res.status(409).json({ message: error.message });
      } else {
        throw error;
      }
    }
  }

  async updateUser (req: Request, res: Response) {
    /*
           #swagger.path = '/users/{id}'
           #swagger.summary = 'Update a user'
           #swagger.parameters['id'] = {
               type: 'string',
               required: true
           }
           #swagger.requestBody = {
               required: true,
               content: {
                   "application/json": {
                       schema: { $ref: "#/components/schemas/UpdateUser" }
                   }
               }
           }
           #swagger.responses[200] = {
               description: 'User updated',
               content: {
                   'application/json': {
                       schema: { $ref: '#/components/schemas/UserResponse' }
                   }
               }
           }
        */
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'User ID is required' });
        return;
      }
      const user = await userService.updateUser(id, req.body);
      res.json(user);
    } catch (error: any) {
      if (error.message === 'User not found') {
        res.status(404).json({ message: error.message });
      } else {
        throw error;
      }
    }
  }
}

export const userController = new UserController();
