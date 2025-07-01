# abot-scraper

A versatile scraper package for downloading and searching content from various social media platforms.

## Installation

### Stable Version

Install the latest stable version from npm:

```bash
npm install abot-scraper
# or
yarn add abot-scraper
# or
bun add abot-scraper
```

### Development Version

Install the latest development version directly from GitHub (not recommended for production):

```bash
npm install github:ahlulmukh/abot-scraper
```

## Usage

### CommonJS (Node.js with require)

```javascript
// Default import
const abot = require('abot-scraper');

// Use the pre-instantiated classes
const result = await abot.downloader.facebook('https://facebook.com/video/123');
const searchResult = await abot.search.sfileSearch('query', 1);

// Or import classes directly
const { Downloader, Search } = require('abot-scraper');
const downloader = new Downloader();
const search = new Search();
```

### ES Modules (modern JavaScript/TypeScript)

```javascript
// Default import
import abot from 'abot-scraper';

// Use the pre-instantiated classes
const result = await abot.downloader.facebook('https://facebook.com/video/123');
const searchResult = await abot.search.sfileSearch('query', 1);

// Or import classes directly
import { Downloader, Search } from 'abot-scraper';
const downloader = new Downloader();
const search = new Search();
```

### TypeScript

TypeScript declarations are included, providing full type safety and IntelliSense support:

```typescript
import abot, {
  Downloader,
  Search,
  type ApiResponse,
  type FacebookResult,
} from 'abot-scraper';

// TypeScript will provide full type checking and autocomplete
const result: ApiResponse<FacebookResult> = await abot.downloader.facebook(
  'https://facebook.com/video/123'
);

// Types are automatically inferred
const downloader = new Downloader();
const fbResult = await downloader.facebook('https://example.com'); // Return type is known
```

## API Reference

### Downloader Class

The `Downloader` class provides methods to download content from various platforms.

#### Available Methods

- `facebook(url)` - Download Facebook videos
- `tiktokDownloader(url)` - Download TikTok videos
- `instagram(url)` - Download Instagram posts/stories
- `igstory(username)` - Get Instagram stories for a user
- `youtubeDownloader(url)` - Download YouTube videos with multiple formats
- `sfileDownloader(url)` - Download files from SFile

#### Example Usage

```javascript
// CommonJS
const { downloader } = require('abot-scraper');

// ES Modules
import { downloader } from 'abot-scraper';

// Download YouTube video
const result = await downloader.youtubeDownloader(
  'https://youtu.be/j_MlBCb9-m8'
);
console.log(result);

// Download TikTok video
const tiktokResult = await downloader.tiktokDownloader(
  'https://tiktok.com/@user/video/123'
);
console.log(tiktokResult);

// Download Facebook video
const fbResult = await downloader.facebook('https://facebook.com/video/123');
console.log(fbResult);

// Get Instagram stories
const storiesResult = await downloader.igstory('username');
console.log(storiesResult);
```

### Search Class

The `Search` class provides methods to search for content across various platforms.

#### Available Methods

- `ytPlay(query)` - Search YouTube videos by query
- `wallpaper(query, page)` - Search for wallpapers
- `wikimedia(query)` - Search Wikimedia content
- `sfileSearch(query, page)` - Search SFile for files

#### Example Usage

```javascript
// CommonJS
const { search } = require('abot-scraper');

// ES Modules
import { search } from 'abot-scraper';

// Search YouTube videos
const ytResults = await search.ytPlay('music video');
console.log(ytResults);

// Search wallpapers
const wallpapers = await search.wallpaper('abstract art', '1');
console.log(wallpapers);

// Search Wikimedia
const wikimediaResults = await search.wikimedia('nature photos');
console.log(wikimediaResults);
```

### Error Handling

All methods return promises and should be wrapped in try-catch blocks or use `.catch()` for proper error handling:

```javascript
try {
  const result = await downloader.youtubeDownloader(
    'https://youtu.be/invalid-url'
  );
  console.log(result);
} catch (error) {
  console.error('Download failed:', error.message);
}

// Or using .catch()
downloader
  .facebook('https://facebook.com/video/123')
  .then(result => console.log(result))
  .catch(error => console.error('Error:', error));
```

## Requirements

- **Node.js**: Version 16.0.0 or higher
- **Internet connection**: Required for scraping online content

## Package Information

- **Package Type**: Dual (CommonJS + ES Modules)
- **Build Tool**: Bun.js
- **Source Format**: ES Modules
- **Distribution**: Both CommonJS and ESM builds included
- **TypeScript**: Full type declarations provided

## Contributing

We welcome contributions from the community! If you encounter a bug or have a feature request, please open an issue on our [GitHub repository](https://github.com/ahlulmukh/abot-scraper).

To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
