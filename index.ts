import { Builder } from 'selenium-webdriver';

import { logger } from './src/logger';
import { authenticate } from './src/steps/login';
import { loadPortal } from './src/steps/init';
import {
  clickOnLastTimesheetPeriod,
  clickOnTimesheetSideMenu,
  fillTimesheetForm,
  submitTimesheetForm
} from './src/steps/timesheet';

(async () => {
  const driver = await new Builder().forBrowser('firefox').build();
  try {
    await loadPortal(driver);
    logger.info('hrpartner website loaded');

    await authenticate(driver);
    logger.info('login performed successfully');

    await clickOnTimesheetSideMenu(driver);
    logger.info('timesheet list loaded successfully');

    await clickOnLastTimesheetPeriod(driver);
    logger.info('last timesheet loaded successfully');

    await fillTimesheetForm(driver);
    logger.info('timesheet filled successfully');

    await submitTimesheetForm(driver);
    logger.info('timesheet submitted successfully');
  } finally {
    await driver.quit();
  }
})();
