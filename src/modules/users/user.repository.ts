import { BaseDocument, MongoRepository } from '../../db/mongo.repository'
import { CreateUserDto } from './user.schema'

export interface User extends BaseDocument, CreateUserDto { }

export class UserRepository extends MongoRepository<User> {
    constructor() {
        super('users')
    }

    async findByEmail(email: string) {
        return this.collection.findOne({ email })
    }

    async createIndexes() {
        await this.collection.createIndex({ email: 1 }, { unique: true })
    }
}

export const userRepository = new UserRepository()
