export interface YearMonth {
  year: number,
  month: number,
}

export interface User {
  name: string;
  password: string;
}

export interface WebDriverArguments {
  loginUrl: string,
  user: User,
  period: YearMonth,
}
