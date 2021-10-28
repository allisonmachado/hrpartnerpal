import { By, WebDriver } from 'selenium-webdriver';

import { quickPause } from '../../util/time';

export const clickOnTimesheetSideMenu = async (driver: WebDriver): Promise<void> => {
  const sideMenu = await driver.findElement(By.id('side-menu'));
  const timesheetButton = await sideMenu.findElement(By.css('.fa-clock-o'));

  await timesheetButton.click();

  await quickPause();
};

export const clickOnLastTimesheetPeriod = async (driver: WebDriver): Promise<void> => {
  const [ timesheetTable ] = await driver.findElements(By.css('table'));
  const rows = await timesheetTable.findElements(By.css('tr'));

  const lastPeriodRow = rows.pop();

  const lastPeriodActions = await lastPeriodRow?.findElements(By.css('a'));
  const updateButton = lastPeriodActions?.pop();

  updateButton?.click();
};
