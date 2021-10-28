import { Builder } from 'selenium-webdriver';

import { logger } from './src/logger';
import { sleepSeconds } from './src/util';
import { authenticate } from './src/steps/login';
import { loadPortal } from './src/steps/init';
import { clickOnLastTimesheetPeriod, clickOnTimesheetSideMenu } from './src/steps/timesheet';

import { PORTAL } from './src/util/environment';

(async () => {
  const driver = await new Builder().forBrowser('firefox').build();
  try {
    await loadPortal(driver);
    logger.info(`login successfully done at ${PORTAL}`);

    await authenticate(driver);
    logger.info('login performed successfully');

    await clickOnTimesheetSideMenu(driver);
    logger.info('timesheet list loaded successfully');

    await clickOnLastTimesheetPeriod(driver);
    logger.info('last timesheet loaded successfully');

    await sleepSeconds(5);
  } finally {
    await driver.quit();
  }
})();
