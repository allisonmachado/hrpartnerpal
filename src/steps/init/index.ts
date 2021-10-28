import { WebDriver } from 'selenium-webdriver';

import { quickPause } from '../../util/time';

import { PORTAL } from '../../util/environment';

export const loadPortal = async (driver: WebDriver): Promise<void> => {
  await driver.get(PORTAL);
  await quickPause();
};
