# abot-scraper

A comprehensive scraper package for downloading content from social media platforms and performing AI-powered image processing tasks. Supports Facebook, TikTok, Instagram, YouTube, SFile downloads, plus advanced image enhancement and background removal tools.

## Features

### 📥 **Downloader**

- **Facebook**: Download videos from Facebook posts
- **TikTok**: Download videos from TikTok (watermark-free)
- **Instagram**: Download posts, stories, and reels
- **YouTube**: Download videos in multiple formats and quality options
- **YouTube MP3**: Download YouTube videos as MP3 audio files
- **SFile**: Download files from SFile sharing platform

### 🔍 **Search**

- **YouTube Search**: Find videos by keywords
- **Instagram Stories**: Get user's Instagram stories
- **Wallpaper Search**: Find high-quality wallpapers
- **Wikimedia Search**: Search for images and media from Wikimedia
- **SFile Search**: Search for files on SFile platform

### 🎨 **AI Tools**

- **Background Removal**: AI-powered background removal from images
- **Image Enhancement**: Enhance image quality using Remini AI (V1 & V2)
- **Image Upload**: Upload images and get shareable URLs

### 🛠️ **Technical Features**

- **TypeScript Support**: Full type definitions included
- **Dual Package**: Works with both CommonJS and ES Modules
- **Error Handling**: Comprehensive error handling and validation
- **Modern Architecture**: Built with latest Node.js standards

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

### Quick Start Example

```javascript
const { Downloader, Search, Tools } = require('abot-scraper');
const fs = require('fs');

async function example() {
  // Initialize classes
  const downloader = new Downloader();
  const search = new Search();
  const tools = new Tools();

  try {
    // Download a TikTok video
    const tiktokResult = await downloader.tiktokDownloader(
      'https://vt.tiktok.com/ZSB2LtXQF/'
    );
    console.log('TikTok download:', tiktokResult);

    // Search YouTube videos
    const ytResults = await search.ytSearch('phonk music');
    console.log('YouTube search results:', ytResults);

    // Remove background from image
    const bgRemoved = await tools.removeBackground(
      'https://example.com/photo.jpg'
    );
    console.log('Background removed:', bgRemoved);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

example();
```

### CommonJS (Node.js with require)

```javascript
// Import classes directly
const { Downloader, Search, Tools } = require('abot-scraper');

const downloader = new Downloader();
const search = new Search();
const tools = new Tools();

// Download a Facebook video
const result = await downloader.facebookDownloader(
  'https://facebook.com/video/123'
);
const searchResult = await search.sfileSearch('query', 1);
```

### ES Modules (modern JavaScript/TypeScript)

```javascript
// Import classes directly
import { Downloader, Search, Tools } from 'abot-scraper';

const downloader = new Downloader();
const search = new Search();
const tools = new Tools();

// Download a Facebook video
const result = await downloader.facebookDownloader(
  'https://facebook.com/video/123'
);
const searchResult = await search.sfileSearch('query', 1);
```

### TypeScript

TypeScript declarations are included, providing full type safety and IntelliSense support:

```typescript
import {
  Downloader,
  Search,
  Tools,
  type ApiResponse,
  type FacebookResult,
} from 'abot-scraper';

// TypeScript will provide full type checking and autocomplete
const downloader = new Downloader();
const result: ApiResponse<FacebookResult> = await downloader.facebookDownloader(
  'https://facebook.com/video/123'
);

// Types are automatically inferred
const fbResult = await downloader.facebookDownloader('https://example.com'); // Return type is known
```

## API Reference

### Downloader Class

The `Downloader` class provides methods to download content from various platforms.

#### Available Methods

- `facebookDownloader(url)` - Download Facebook videos
- `tiktokDownloader(url)` - Download TikTok videos
- `instagramDownloader(url)` - Download Instagram posts/stories/reels
- `youtubeDownloader(url)` - Download YouTube videos with multiple formats
- `ytMp3Downloader(url)` - Download YouTube videos as MP3 audio
- `sfileDownloader(url)` - Download files from SFile

#### Example Usage

```javascript
// Import the Downloader class
const { Downloader } = require('abot-scraper');
const downloader = new Downloader();

// Download YouTube video
const result = await downloader.youtubeDownloader(
  'https://youtu.be/j_MlBCb9-m8'
);
console.log(result);

// Download TikTok video
const tiktokResult = await downloader.tiktokDownloader(
  'https://vt.tiktok.com/ZSB2LtXQF/'
);
console.log(tiktokResult);

// Download Facebook video
const fbResult = await downloader.facebookDownloader(
  'https://facebook.com/video/123'
);
console.log(fbResult);

// Download Instagram content
const igResult = await downloader.instagramDownloader(
  'https://www.instagram.com/p/CK0tLXyAzEI/'
);
console.log(igResult);

// Download YouTube as MP3
const mp3Result = await downloader.ytMp3Downloader(
  'https://youtu.be/H_z0t5NQs7U'
);
console.log(mp3Result);
```

### Search Class

The `Search` class provides methods to search for content across various platforms.

#### Available Methods

- `ytSearch(query)` - Search YouTube videos by query
- `igStory(username)` - Get Instagram stories for a user
- `wallpaper(query, page?)` - Search for wallpapers
- `wikimedia(query)` - Search Wikimedia content
- `sfileSearch(query, page?)` - Search SFile for files

#### Example Usage

```javascript
// Import the Search class
const { Search } = require('abot-scraper');
const search = new Search();

// Search YouTube videos
const ytResults = await search.ytSearch('music video');
console.log(ytResults);

// Get Instagram stories
const igStories = await search.igStory('cristiano');
console.log(igStories);

// Search wallpapers
const wallpapers = await search.wallpaper('abstract art', 1);
console.log(wallpapers);

// Search Wikimedia
const wikimediaResults = await search.wikimedia('nature photos');
console.log(wikimediaResults);

// Search SFile
const sfileResults = await search.sfileSearch('Capcut Pro');
console.log(sfileResults);
```

### Tools Class

The `Tools` class provides utility methods for image processing and manipulation.

#### Available Methods

- `removeBackground(imageUrl)` - Remove background from an image using AI
- `reminiV1(buffer)` - Enhance image quality using Remini V1 API
- `reminiV2(buffer)` - Enhance image quality using Remini V2 API
- `uploadImage(buffer)` - Upload image and get a shareable URL

#### Example Usage

```javascript
// Import the Tools class
const { Tools } = require('abot-scraper');
const fs = require('fs');
const tools = new Tools();

// Remove background from image
const bgRemoved = await tools.removeBackground('https://example.com/image.jpg');
console.log(bgRemoved);

// Enhance image quality
const imageBuffer = fs.readFileSync('path/to/image.jpg');
const enhanced = await tools.reminiV1(imageBuffer);
console.log(enhanced);

// Upload image
const uploaded = await tools.uploadImage(imageBuffer);
console.log(uploaded);
```

### Error Handling

All methods return promises and should be wrapped in try-catch blocks or use `.catch()` for proper error handling:

```javascript
try {
  const downloader = new Downloader();
  const result = await downloader.youtubeDownloader(
    'https://youtu.be/invalid-url'
  );
  console.log(result);
} catch (error) {
  console.error('Download failed:', error.message);
}

// Or using .catch()
const downloader = new Downloader();
downloader
  .facebookDownloader('https://facebook.com/video/123')
  .then(result => console.log(result))
  .catch(error => console.error('Error:', error));
```

### Response Format

All API methods return a standardized response format:

```typescript
interface ApiResponse<T> {
  creator: string; // Package creator information
  status: number | boolean; // Success status (200 for success, false for error)
  result?: T; // The actual data (varies by method)
  msg?: string; // Error message if status indicates failure
}
```

Example responses:

```javascript
// Successful TikTok download
{
  creator: "@abotscraper – ahmuq",
  status: 200,
  result: {
    title: "Video Title",
    video: "https://download-url.com/video.mp4",
    audio: "https://download-url.com/audio.mp3"
  }
}

// Error response
{
  creator: "@abotscraper – ahmuq",
  status: false,
  msg: "Invalid URL provided"
}
```

## Requirements

- **Node.js**: Version 16.0.0 or higher
- **Internet connection**: Required for scraping online content
- **Dependencies**: All required dependencies are automatically installed

## Package Information

- **Package Type**: Dual (CommonJS + ES Modules)
- **Build System**: Modern TypeScript/JavaScript build pipeline
- **Source Format**: TypeScript with ES Modules
- **Distribution**: Both CommonJS (.cjs) and ESM (.mjs) builds included
- **TypeScript**: Full type declarations provided (.d.ts files)
- **Testing**: Comprehensive test suite with 100% coverage
- **Compatibility**: Works with Node.js, Bun, and other JavaScript runtimes

## Contributing

We welcome contributions from the community! If you encounter a bug or have a feature request, please open an issue on our [GitHub repository](https://github.com/ahlulmukh/abot-scraper).

To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
