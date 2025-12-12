import { validateBody } from '../../middleware/validate'
import { createUserSchema, updateUserSchema } from './user.schema'

export const validateUpdateUser = validateBody(updateUserSchema)
export const validateCreateUser = validateBody(createUserSchema)
