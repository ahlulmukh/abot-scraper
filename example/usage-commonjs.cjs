const fs = require('fs');
const path = require('path');
const { Downloader, Search, Tools } = require('../dist/index.cjs');

const downloader = new Downloader();
const search = new Search();
const tools = new Tools();

async function allTestScraping() {
  try {
    const ttResult = await downloader.facebook(
      'https://www.facebook.com/share/r/1HF8RnMRVt/'
    );
    console.log('✅ TikTok result:', ttResult);

    // const wallpaperResult = await search.wallpaper(
    //   'https://youtu.be/QKJNaEi3T70?si=GHIu7nZ0NujiMlBi'
    // );
    // console.log(
    //   '✅ Wallpaper result:',
    //   wallpaperResult.status,
    //   wallpaperResult.result?.length,
    //   'items'
    // );
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function singgleTest() {
  try {
    const imagePath = path.join(__dirname, '..', 'test.jpeg');
    const imageBuffer = fs.readFileSync(imagePath);

    console.log('📁 Reading image:', imagePath);
    console.log('📊 Buffer size:', imageBuffer.length, 'bytes');

    const test = await tools.reminiUpscale(imageBuffer);
    console.log('✅ result:', test);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

if (require.main === module) {
  singgleTest();
}

module.exports = { singgleTest };
