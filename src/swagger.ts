import swaggerAutogen from 'swagger-autogen'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { createUserSchema, userResponseSchema, updateUserSchema } from './modules/users/user.schema'

const createUserJsonSchema = zodToJsonSchema(createUserSchema as any, 'CreateUser') as any
const userResponseJsonSchema = zodToJsonSchema(userResponseSchema as any, 'UserResponse') as any
const updateUserJsonSchema = zodToJsonSchema(updateUserSchema as any, 'UpdateUser') as any

const doc = {
  info: {
    title: 'Transcription Service API',
    description: 'API documentation for the Transcription Service'
  },
  host: 'localhost:7777',
  schemes: ['http'],

}


const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/app.ts', './src/modules/users/user.routes.ts']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc).then(() => {
  // Post-process: Inject valid JSON schema for CreateUser to avoid swagger-autogen treating it as an example
  const fs = require('fs')
  const path = require('path')

  const filePath = path.resolve(__dirname, '..', 'src', 'swagger_output.json')
  const swaggerFile = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  // Inject schemas
  swaggerFile.components = swaggerFile.components || {}
  swaggerFile.components.schemas = swaggerFile.components.schemas || {}
  swaggerFile.components.schemas.CreateUser = createUserJsonSchema.definitions.CreateUser
  swaggerFile.components.schemas.UserResponse = userResponseJsonSchema.definitions.UserResponse
  swaggerFile.components.schemas.UpdateUser = updateUserJsonSchema.definitions.UpdateUser

  // Fix paths...: map "/" to "/users" (handling trailing slash implicitly by client usually, but let's be standard)
  // Since swagger-autogen sees the router mounted at /users but doesn't prefix it automatically in this setup
  if (swaggerFile.paths['/']) {
    swaggerFile.paths['/users'] = swaggerFile.paths['/']
    delete swaggerFile.paths['/']
  }
  if (swaggerFile.paths['/{id}']) {
    swaggerFile.paths['/users/{id}'] = swaggerFile.paths['/{id}']
    delete swaggerFile.paths['/{id}']
  }

  fs.writeFileSync(filePath, JSON.stringify(swaggerFile, null, 2))
  console.log('Swagger docs updated with Zod schema!')
})