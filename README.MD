# abot-scraper

`abot-scraper` is a Node.js library designed to simplify downloading and searching for content from popular platforms like YouTube, Facebook, Instagram, and more.

## Installation

### Stable Version

Install the latest stable version from npm:

```sh
npm install abot-scraper
```

### Development Version

Install the latest development version directly from GitHub (not recommended for production):

```sh
npm install github:ahlulmukh/abot-scraper
```

## Usage

### Downloader Example

Download videos from YouTube:

```js
const { downloader } = require("@ahlulmukh/abot-scraper");

downloader
  .ytMP4("https://youtu.be/j_MlBCb9-m8?si=g6KsGM6cHNotU-rH")
  .then((result) => {
    console.log(result); // JSON response
  })
  .catch((error) => {
    console.error(error);
  });
```

### Search Example

Search for YouTube content by query:

```js
const { search } = require("@ahlulmukh/abot-scraper");

search
  .ytPlay("Lagu Terbaru")
  .then((result) => {
    console.log(result); // JSON response
  })
  .catch((error) => {
    console.error(error);
  });
```

## Features

- **YouTube Downloader**: Download videos in various formats.
- **Facebook Downloader**: Fetch videos from Facebook.
- **TikTok Downloader**: Download TikTok videos.
- **Instagram Downloader**: Download Instagram posts and stories.
- **Pinterest Search**: Search for Pinterest content.
- **YouTube Play by Query**: Search and play YouTube content.
- **Wallpaper Search**: Find wallpapers.
- **SFile Search**: Find file in sfile.

## Contributing

We welcome contributions from the community! If you encounter a bug or have a feature request, please open an issue on our [GitHub repository](https://github.com/ahlulmukh/abot-scraper).

To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
