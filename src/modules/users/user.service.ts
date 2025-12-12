import { CreateUserDto, UpdateUserDto } from './user.schema'
import { userRepository } from './user.repository'

export class UserService {
    async getAllUsers() {
        return userRepository.findAll()
    }

    async createUser(data: CreateUserDto) {
        const existing = await userRepository.findByEmail(data.email)
        if (existing) {
            throw new Error('User already exists')
        }
        return userRepository.create(data)
    }

    async updateUser(id: string, data: UpdateUserDto) {
        const user = await userRepository.findById(id)
        if (!user) {
            throw new Error('User not found')
        }
        return userRepository.update(id, data)
    }
}

export const userService = new UserService()
