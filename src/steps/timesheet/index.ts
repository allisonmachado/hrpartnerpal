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

export const clickOnTimesheetPeriod = async ({ driver, targetDate }: {
  driver: WebDriver,
  targetDate: {
    year: number,
    month: number,
  }
}): Promise<void> => {
  const [timesheetTable] = await driver.findElements(By.css('table'));
  const [timesheetTableBody] = await timesheetTable.findElements(By.css('tbody'));
  const rows = await timesheetTableBody.findElements(By.css('tr'));

  const strongWebElementsPromises = rows.map(r => r.findElements(By.css('strong')));
  const strongWebElements = await Promise.all(strongWebElementsPromises);

  const textPromises = strongWebElements
    .map(strongTuple => strongTuple.pop())
    .map(textWebElement => textWebElement?.getText());

  const texts = (await Promise.all(textPromises))
    .map<string>(t => t as string);

  const datesMap = texts
    .map(d => new Date(d))
    .map(d => ({
      year: d.getFullYear(),
      month: d.getMonth() + 1,
    }))
    .map((d, i) => ({
      [d.year + ':' + d.month]: i,
    }))
    .reduce((acc, curr) => ({
      ...acc,
      ...curr,
    }), {});

  const targetRowIndex = datesMap[targetDate.year + ':' + targetDate.month];
  const targetRow = rows[targetRowIndex];

  if (targetRow === undefined) {
    throw new Error('impossible to process: cannot find target date');
  }

  const lastPeriodActions = await targetRow?.findElements(By.css('a'));
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
    '09:30'
  ));

  const endTimeInputs = await driver.findElements(By.name('end_time[]'));
  endTimeInputs.forEach(i => i.sendKeys(
    Key.BACK_SPACE,
    Key.BACK_SPACE,
    Key.BACK_SPACE,
    Key.BACK_SPACE,
    Key.BACK_SPACE,
    '18:30'
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

  await quickPause();
};

export const submitTimesheetForm = async (driver: WebDriver): Promise<void> => {
  const loginButton = await driver.findElement(By.css('button[type=submit]'));
  await loginButton.click();

  await quickPause();
};
