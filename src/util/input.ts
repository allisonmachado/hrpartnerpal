import Joi from 'joi';

import { InputError } from './error';
import { logger } from './logger';
import { User, WebDriverArguments, YearMonth } from './types';

const isValidURI = (data: string | undefined): data is string => {
  const { error } = Joi.string().required().uri().validate(data);
  return !error;
};

const isValidEmail = (data: string | undefined): data is string => {
  const { error } = Joi.string().required().email().validate(data);
  return !error;
};

const isFilledString = (data: string | undefined): data is string => {
  const { error } = Joi.string().required().validate(data);
  return !error;
};

const isValidDate = (data: string | undefined): data is string => {
  const { error } = Joi.date().required().validate(data);
  return !error;
};

const getLoginUrlFromEnvironment = (): string => {  
  if (!isValidURI(process.env.HRPARTNERPAL_LOGIN_URL)) {
    throw new InputError('HRPARTNERPAL_LOGIN_URL');
  }
  
  return process.env.HRPARTNERPAL_LOGIN_URL;
};

const getUserFromEnvironment = (): User => {  
  if (!isValidEmail(process.env.HRPARTNERPAL_USERNAME)) {
    throw new InputError('HRPARTNERPAL_USERNAME');
  }
  
  if (!isFilledString(process.env.HRPARTNERPAL_PASSWORD)) {
    throw new InputError('HRPARTNERPAL_PASSWORD');
  }
  
  return {
    name: process.env.HRPARTNERPAL_USERNAME,
    password: process.env.HRPARTNERPAL_PASSWORD,
  };
};

const getTargetFromEnvironment = (): YearMonth => {  
  if (!isValidDate(process.env.HRPARTNERPAL_TARGET_DATE)) {
    throw new InputError('HRPARTNERPAL_TARGET_DATE');
  }
  const rawTargetDate = new Date(process.env.HRPARTNERPAL_TARGET_DATE);

  return {
    year: rawTargetDate.getFullYear(),
    month: rawTargetDate.getMonth() + 1,
  };
};

export const getWebDriverArguments = (): WebDriverArguments => {
  const loginUrl = getLoginUrlFromEnvironment();
  const period = getTargetFromEnvironment();
  const user = getUserFromEnvironment();

  logger.debug(`authentication url: ${loginUrl}`);
  logger.debug(`target period: [${period.month}/${period.year}]`);
  logger.debug(`user name: ${user.name}`);

  return {
    loginUrl,
    user,
    period,
  };
};
