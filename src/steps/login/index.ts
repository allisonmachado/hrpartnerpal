import { By, WebDriver } from 'selenium-webdriver';

import { quickPause } from '../../util/time';

import { PASSWORD, USERNAME } from '../../util/environment';

export const authenticate = async (driver: WebDriver): Promise<void> => {
  const usernameInput = await driver.findElement(By.name('username'));
  const passwordInput = await driver.findElement(By.name('password'));

  usernameInput.sendKeys(USERNAME);
  passwordInput.sendKeys(PASSWORD);

  const loginButton = await driver.findElement(By.css('button[type=submit]'));
  await loginButton.click();

  await quickPause();
};
