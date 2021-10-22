import { createLogger } from 'bunyan';
import { NODE_ENV } from '../util';

export const logger = createLogger({ 
  name: 'hrpartnerpal',
  level: NODE_ENV === 'development' ? 'trace' : 'info',
});
