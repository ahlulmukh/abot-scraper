const { Downloader, Search } = require('../dist/index.cjs');

const downloader = new Downloader();
const search = new Search();

async function allTestScraping() {
  try {
    const ttResult = await downloader.tiktokDownloader(
      'https://www.tiktok.com/@user/video/123'
    );
    console.log('✅ TikTok result:', ttResult.status);

    const wallpaperResult = await search.wallpaper(
      'https://youtu.be/QKJNaEi3T70?si=GHIu7nZ0NujiMlBi'
    );
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
    const test = await downloader.igstory('cristiano');
    console.log('✅result:', test);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

if (require.main === module) {
  singgleTest();
}

module.exports = { singgleTest };
