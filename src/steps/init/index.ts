import { WebDriver } from 'selenium-webdriver';

import { quickPause } from '../../util/time';

export const loadPortal = async ({ driver, loginUrl }: {
  driver: WebDriver,
  loginUrl: string,
}): Promise<void> => {
  await driver.get(loginUrl);
  await quickPause();
};
