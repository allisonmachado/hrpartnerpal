import { Builder } from 'selenium-webdriver';

import { logger } from './src/util/logger';
import { loadPortal } from './src/steps/init';
import { InputError } from './src/util/error';
import { authenticate } from './src/steps/login';
import { getWebDriverArguments } from './src/util/input';
import {
  clickOnTimesheetPeriod,
  clickOnTimesheetSideMenu,
  fillTimesheetForm,
  submitTimesheetForm
} from './src/steps/timesheet';

(async () => {
  const driver = await new Builder().forBrowser('firefox').build();
  try {
    const {
      loginUrl,
      user,
      period,
    } = getWebDriverArguments();

    await loadPortal({
      driver,
      loginUrl,
    });
    logger.info('hrpartner website loaded');

    await authenticate({
      driver,
      user,
    });
    logger.info('login performed successfully');

    await clickOnTimesheetSideMenu(driver);
    logger.info('timesheet list loaded successfully');

    await clickOnTimesheetPeriod({
      driver,
      period,
    });
    logger.info('last timesheet loaded successfully');

    await fillTimesheetForm(driver);
    logger.info('timesheet filled successfully');

    await submitTimesheetForm(driver);
    logger.info('timesheet submitted successfully');
  } catch (error: unknown) {
    if (error instanceof InputError) {
      logger.warn(error.message);
      return;
    }
    logger.error(error); // stack trace
  } finally {
    await driver.quit();
  }
})();
