import { Builder, By } from 'selenium-webdriver';

import { logger } from './src/logger';
import { sleepSeconds } from './src/util';
import { quickPause } from './src/util/time';

import { PASSWORD, PORTAL, USERNAME } from './src/util/environment';

(async function example() {
  const driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get(PORTAL);

    await quickPause();
    logger.info('page successfully loaded');

    const usernameInput = await driver.findElement(By.name('username'));
    const passwordInput = await driver.findElement(By.name('password'));

    usernameInput.sendKeys(USERNAME);
    passwordInput.sendKeys(PASSWORD);

    const loginButton = await driver.findElement(By.css('button[type=submit]'));
    await loginButton.click();

    await quickPause();
    logger.info('login performed successfully');

    const timesheetMenu = await driver.findElement(By.xpath('/html/body/div[2]/nav/div/ul/li[9]/a'));
    await timesheetMenu.click();

    await quickPause();
    logger.info('timesheet list screen loaded successfully');

    const [ timesheetTable ] = await driver.findElements(By.css('table'));

    const rows = await timesheetTable.findElements(By.css('tr'));
    const targetRow = rows.pop();

    const buttons = await targetRow?.findElements(By.css('a'));
    const targetButton = buttons?.pop();

    targetButton?.click();

    await sleepSeconds(10);
  } finally {
    await driver.quit();
  }
})();
