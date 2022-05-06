import * as util from 'util';

export class InputError extends Error {

  constructor(key: string) {
    const message = util.format(InputError.messageTemplate, key);
    super(message);
  }

  private static messageTemplate = 'The %s value was not initialized properly';
}
