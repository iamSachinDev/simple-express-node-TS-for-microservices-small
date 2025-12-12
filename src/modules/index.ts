import { Express } from 'express';
import { logger } from '../lib/logger';
import { ApiModule } from './types';
import { usersModule } from './users';

export const modules: ApiModule[] = [usersModule];

export const registerModules = (app: Express): void => {
  modules.forEach((mod) => {
    app.use(mod.basePath, mod.router);
    logger.info({ module: mod.name, basePath: mod.basePath }, 'Module registered');
  });
};
