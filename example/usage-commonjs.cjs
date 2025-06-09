const { Downloader, Search } = require('../dist/index.cjs');

const downloader = new Downloader();
const search = new Search();

async function allTestScraping() {
  try {
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
  }
}

async function singgleTest() {
  try {
    const test = await search.ytSearch('younglex');
    console.log('✅result:', test);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

if (require.main === module) {
  singgleTest();
}

module.exports = { singgleTest };
