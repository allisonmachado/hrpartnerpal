import { createLogger } from 'bunyan';

export const logger = createLogger({ 
  name: 'hrpartnerpal',
  level: 'trace',
});
