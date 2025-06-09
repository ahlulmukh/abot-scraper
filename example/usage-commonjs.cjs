const abot = require('../dist/index.cjs');
const { Downloader, Search } = require('../dist/index.cjs');

async function testCommonJS() {
  console.log('🧪 Testing CommonJS Usage\n');

  try {
    console.log('1. Using default export:');

    const fbResult = await abot.downloader.facebook(
      'https://www.facebook.com/video/example'
    );
    console.log('✅ Facebook result:', fbResult.status);

    const searchResult = await abot.search.sfileSearch('example', 1);
    console.log(
      '✅ Search result:',
      searchResult.status,
      searchResult.result?.length,
      'items'
    );

    console.log('\n2. Using class instances:');

    const downloader = new Downloader();
    const search = new Search();

    const ttResult = await downloader.tiktokDownloader(
      'https://www.tiktok.com/@user/video/123'
    );
    console.log('✅ TikTok result:', ttResult.status);

    const wallpaperResult = await search.wallpaper('nature');
    console.log(
      '✅ Wallpaper result:',
      wallpaperResult.status,
      wallpaperResult.result?.length,
      'items'
    );
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('Note: Errors are expected with demo URLs');
  }
}

if (require.main === module) {
  testCommonJS();
}

module.exports = { testCommonJS };
