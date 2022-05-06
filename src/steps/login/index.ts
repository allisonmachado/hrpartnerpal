import { By, WebDriver } from 'selenium-webdriver';

import { quickPause } from '../../util/time';
import { User } from '../../util/types';

export const authenticate = async ({ driver, user }: {
  driver: WebDriver,
  user: User,
}): Promise<void> => {
  const usernameInput = await driver.findElement(By.name('username'));
  const passwordInput = await driver.findElement(By.name('password'));

  usernameInput.sendKeys(user.name);
  passwordInput.sendKeys(user.password);

  const loginButton = await driver.findElement(By.css('button[type=submit]'));
  await loginButton.click();

  await quickPause();
};
