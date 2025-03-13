# abot-scraper

abot-scraper is a library node js. Can get data downloader like facebook, youtube, instagram and etc.

# Installation

Install stable version of scraper:

```sh
npm i abot-scraper
```

Install latest version from github (not recommended)

```sh
npm i github:ahlulmukh/abot-scraper
```

## Usage

For Downloader

```js
const { downloader } = require("@ahlulmukh/abot-scraper");

downloader
  .ytMP4("https://youtu.be/j_MlBCb9-m8?si=g6KsGM6cHNotU-rH")
  .then((result) => {
    console.log(result); // json;
  })
  .catch((error) => {
    console.error(error);
  });
```

For Search

```js
const { search } = require("@ahlulmukh/abot-scraper");

search
  .ytPlay("Lagu Terbaru")
  .then((result) => {
    console.log(result); // json;
  })
  .catch((error) => {
    console.error(error);
  });
```

## Features

- Youtube Downloader
- Facebok Downloader
- Tiktok Downloader
- Instagram Downloader
- Instastory Downloader
- Pinterest Search
- Youtube Play By query
- Wallpaper

## Contributing

If you find a bug or have a feature request, please open an issue on our GitHub repository.

We welcome contributions from the community. If you'd like to contribute, please fork the repository and submit a pull request.

## License

Scraper is licensed under the GPL-3.0-or-later license. See [LICENSE](LICENSE) for more information.
