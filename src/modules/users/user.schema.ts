import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  role: z.enum(['super-admin', 'admin', 'user']).default('user'),
  password: z.string().min(8)
});

export const userResponseSchema = createUserSchema.extend({
  _id: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(2).optional(),
  role: z.enum(['super-admin', 'admin', 'user']).optional(),
  password: z.string().min(8).optional()
});

export type UserDto = z.infer<typeof userResponseSchema>;
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
