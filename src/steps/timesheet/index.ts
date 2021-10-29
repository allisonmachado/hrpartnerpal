import { By, Key, WebDriver, WebElement } from 'selenium-webdriver';

import { quickPause } from '../../util/time';

const isWeekDayText = (strongElementText: string): boolean => {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    .some(day => strongElementText.includes(day));
};

const filterWeekDayRows = async (rows: WebElement[]): Promise<WebElement[]> => {
  const daysToFill = [];

  for (const row of rows) {
    try {
      const strongElement = await row.findElement(By.css('.col-xs-2'));
      const strongElementText = await strongElement.getText();

      if (isWeekDayText(strongElementText)) daysToFill.push(row);
    } catch (error) {
      continue; // element not found
    }
  }

  return daysToFill;
};

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

const fillTimesheetFormRow = async (driver: WebElement): Promise<void> => {
  const startTimeInputs = await driver.findElements(By.name('start_time[]'));
  startTimeInputs.forEach(i => i.sendKeys(
    Key.BACK_SPACE,
    Key.BACK_SPACE,
    Key.BACK_SPACE,
    Key.BACK_SPACE,
    Key.BACK_SPACE,
    '08:45'
  ));

  const endTimeInputs = await driver.findElements(By.name('end_time[]'));
  endTimeInputs.forEach(i => i.sendKeys(
    Key.BACK_SPACE,
    Key.BACK_SPACE,
    Key.BACK_SPACE,
    Key.BACK_SPACE,
    Key.BACK_SPACE,
    '17:45'
  ));

  const breakDurationInputs = await driver.findElements(By.name('break_duration[]'));
  breakDurationInputs.forEach(i => i.sendKeys(
    Key.BACK_SPACE,
    Key.BACK_SPACE,
    Key.BACK_SPACE,
    '1'
  ));

  const notesInput = await driver.findElements(By.name('notes[]'));
  notesInput.forEach(i => i.clear());
  notesInput.forEach(i => i.sendKeys('Working on sprint task.'));

  await quickPause();
};

export const fillTimesheetForm = async (driver: WebDriver): Promise<void> => {
  const formTable = await driver.findElement(By.id('timesheetform'));

  const allRows = await formTable.findElements(By.css('.row'));
  const fillableRows = await filterWeekDayRows(allRows);

  await Promise.all(fillableRows.map(row => fillTimesheetFormRow(row)));
};
