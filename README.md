# Hr Partner Pal
Hrpartnerpal fills in timesheet info in hrparter website, so that you can have time and be happy! ;)

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/allisonmachado/hrpartnerpal) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/allisonmachado/hrpartnerpal) ![GitHub](https://img.shields.io/github/license/allisonmachado/hrpartnerpal)

## Get started in 4 easy steps

1. Download this source code:

```bash
$ git clone git@github.com:allisonmachado/hrpartnerpal.git
```

2. Then set the following environment variables to instruct our pal on how to login:

```bash
$ export NODE_ENV=production
$ export HRPARTNERPAL_LOGIN_URL=https://corporate.hrpartner.io/portal/employee/login
$ export HRPARTNERPAL_USERNAME=my.email.account@corporate.com
$ export HRPARTNERPAL_PASSWORD=supersecret
```

3. Install the dependencies and compile the source code:

```bash
$ cd hrpartnerpal && npm install
```

3. Install [Firefox](https://www.mozilla.org/en-US/firefox/new/) and the respective [Selenium Gecko Driver](https://www.selenium.dev/documentation/getting_started/installing_browser_drivers/)

4. Run Hrpartnerpal

```bash
$ npm run local
```

## Next steps
This project is currently at its earlier versions and it provides very basic functionality.
It is not yet very flexible in terms of installation and configuration options.

However it also means we have plenty of room for improvements, pull-requests and fun.
So please take a look [at the desired features here](https://github.com/allisonmachado/hrpartnerpal/issues) to be included in the Hrpartnerpal!

## License

  [MIT](LICENSE)
