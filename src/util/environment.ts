import Joi from 'joi';

import * as util from 'util';

const INIT_ERROR_MSG = 'The %s environment variable is not initialized properly';

type Environment = 'development' | 'production';

const isEnvironment = (data: string | undefined): data is Environment => {
  return !!data && ['development', 'production'].includes(data);
};

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

if (!isEnvironment(process.env.NODE_ENV)) {
  throw new Error(util.format(INIT_ERROR_MSG, 'NODE_ENV'));
}

if (!isValidURI(process.env.HRPARTNERPAL_LOGIN_URL)) {
  throw new Error(util.format(INIT_ERROR_MSG, 'HRPARTNERPAL_LOGIN_URL'));
}

if (!isValidEmail(process.env.HRPARTNERPAL_USERNAME)) {
  throw new Error(util.format(INIT_ERROR_MSG, 'HRPARTNERPAL_USERNAME'));
}

if (!isFilledString(process.env.HRPARTNERPAL_PASSWORD)) {
  throw new Error(util.format(INIT_ERROR_MSG, 'HRPARTNERPAL_PASSWORD'));
}

if (!isValidDate(process.env.HRPARTNERPAL_TARGET_DATE)) {
  throw new Error(util.format(INIT_ERROR_MSG, 'HRPARTNERPAL_TARGET_DATE'));
}

const RAW_TARGET_DATE = new Date(process.env.HRPARTNERPAL_TARGET_DATE);

export const NODE_ENV: 'development' | 'production' = process.env.NODE_ENV || 'development';
export const PORTAL = process.env.HRPARTNERPAL_LOGIN_URL;
export const USERNAME = process.env.HRPARTNERPAL_USERNAME;
export const PASSWORD = process.env.HRPARTNERPAL_PASSWORD;
export const TARGET_DATE = {
  year: RAW_TARGET_DATE.getFullYear(),
  month: RAW_TARGET_DATE.getMonth() + 1,
};