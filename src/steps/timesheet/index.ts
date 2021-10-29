import { By, Key, WebDriver } from 'selenium-webdriver';

import { quickPause } from '../../util/time';

export const clickOnTimesheetSideMenu = async (driver: WebDriver): Promise<void> => {
  const sideMenu = await driver.findElement(By.id('side-menu'));
  const timesheetButton = await sideMenu.findElement(By.css('.fa-clock-o'));

  await timesheetButton.click();

  await quickPause();
};

export const clickOnLastTimesheetPeriod = async (driver: WebDriver): Promise<void> => {
  const [timesheetTable] = await driver.findElements(By.css('table'));
  const rows = await timesheetTable.findElements(By.css('tr'));

  const lastPeriodRow = rows.pop();

  const lastPeriodActions = await lastPeriodRow?.findElements(By.css('a'));
  const updateButton = lastPeriodActions?.pop();

  updateButton?.click();

  await quickPause();
};

export const fillTimesheetForm = async (driver: WebDriver): Promise<void> => {
  const formTable = await driver.findElement(By.id('timesheetform'));

  const startTimeInputs = await formTable.findElements(By.name('start_time[]'));
  startTimeInputs.forEach(i => i.sendKeys('09:00'));

  const endTimeInputs = await formTable.findElements(By.name('end_time[]'));
  endTimeInputs.forEach(i => i.sendKeys('18:00'));

  const breakDurationInputs = await formTable.findElements(By.name('break_duration[]'));
  await Promise.all(breakDurationInputs.map(i => i.sendKeys(Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, '1')));

  const notesInput = await formTable.findElements(By.name('notes[]'));
  notesInput.forEach(i => i.sendKeys('Working on sprint task'));

  await quickPause();
};
