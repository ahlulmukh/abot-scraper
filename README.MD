# abot-scraper

abot-scraper is a library node js. Can get data downloader like facebook, youtube, instagram and etc.

# Installation

Install stable version of scraper:

```sh
npm i @ahlulmukh/abot-scraper
```

Install latest version from github (not recommended)

```sh
npm i github:ahlulmukh/abot-scraper
```

## Usage

```js
const { ytMP4 } = require("@ahlulmukh/abot-scraper)
ytMP4("https://youtu.be/j_MlBCb9-m8?si=g6KsGM6cHNotU-rH")
  .then((result) => {
    console.log(result); // json;
  })
  .catch((error) => {
    console.error(error);
  });
```

## Features

- Simple and easy to use
- Many feature scraping
- You can install the package that you will use

## Contributing

If you find a bug or have a feature request, please open an issue on our GitHub repository.

We welcome contributions from the community. If you'd like to contribute, please fork the repository and submit a pull request.

## License

Scraper is licensed under the GPL-3.0-or-later license. See [LICENSE](LICENSE) for more information.
