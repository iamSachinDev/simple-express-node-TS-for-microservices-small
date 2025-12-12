import compression from 'compression';
import cors from 'cors';
import express from 'express';

import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/env';
import { checkConnection } from './db/mongoClient';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import requestLogger from './middleware/requestLogger';
import { registerModules } from './modules';
import swaggerOutput from './swagger_output.json';

const app = express();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:']
      }
    }
  })
);

// CORS configuration
const corsOrigins =
    config.corsOrigins === '*' ? '*' : config.corsOrigins.split(',').map((origin) => origin.trim());

const corsOptions = {
  origin: corsOrigins,
  credentials: true
};
app.use(cors(corsOptions));

// Compression (gzip)
app.use(
  compression({
    level: config.compressionLevel,
    threshold: config.compressionThreshold,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    }
  })
);

// Body parser
app.use(express.json());
app.use(requestLogger);

app.get('/', (_req, res) => {
  // #swagger.ignore = true
  res.json({
    message: 'Welcome to Transcription Service API',
    docs: '/api-docs',
    health: '/health'
  });
});

app.get('/health', async (_req, res) => {
  const isDbConnected = await checkConnection();
  const health = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    serviceId: config.serviceId,
    memoryUsage: process.memoryUsage(),
    db: isDbConnected ? 'connected' : 'disconnected'
  };

  if (!isDbConnected) {
    res.status(503).json(health);
    return;
  }
  res.json(health);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

registerModules(app);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
