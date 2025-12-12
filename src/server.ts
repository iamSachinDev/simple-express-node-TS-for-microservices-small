import http from 'http'
import app from './app'
import { config } from './config/env'
import { connectToMongo, disconnectMongo } from './db/mongoClient'
import { logger } from './lib/logger'

// Global error handling
process.on('unhandledRejection', (reason, promise) => {
  logger.error({ reason, promise }, 'Unhandled Rejection')
  // Optional: process.exit(1) depending on strategy
})

process.on('uncaughtException', (error) => {
  logger.error({ error }, 'Uncaught Exception')
  process.exit(1)
})

const gracefulShutdown = async (server: http.Server) => {
  logger.info('Received kill signal, shutting down gracefully...')
  server.close(async () => {
    logger.info('HTTP server closed')
    await disconnectMongo()
    process.exit(0)
  })

  // Force close after 10s
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down')
    process.exit(1)
  }, 10000)
}

const start = async () => {
  try {
    await connectToMongo()
    logger.info({ env: config.nodeEnv }, 'Environment loaded')

    const server = http.createServer(app)
    server.listen(config.port, () => {
      logger.info({ port: config.port }, 'Server listening')
    })

    process.on('SIGTERM', () => gracefulShutdown(server))
    process.on('SIGINT', () => gracefulShutdown(server))

  } catch (err) {
    logger.error({ err }, 'Failed to start server')
    process.exit(1)
  }
}

start()
