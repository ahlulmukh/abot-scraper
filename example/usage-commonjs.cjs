const fs = require('fs');
const path = require('path');
const { Downloader, Search, Tools } = require('../dist/index.cjs');

class AbotScraper {
  constructor() {
    this.tools = new Tools();
    this.downloader = new Downloader();
    this.search = new Search();
  }

  async uploadImage() {
    const imagePath = path.join(__dirname, '..', 'test.jpeg');
    const imageBuffer = fs.readFileSync(imagePath);
    const test = await this.tools.uploadImage(imageBuffer);
    console.log('✅ result:', test);
  }

  async reminiV1Test() {
    try {
      const imagePath = path.join(__dirname, '..', 'test.jpeg');
      const imageBuffer = fs.readFileSync(imagePath);
      const test = await this.tools.reminiV1(imageBuffer);
      console.log('✅ result:', test);
    } catch (error) {
      console.log('❌ error:', error);
    }
  }

  async reminiV2Test() {
    try {
      const imagePath = path.join(__dirname, '..', 'test.jpeg');
      const imageBuffer = fs.readFileSync(imagePath);
      const test = await this.tools.reminiV2(imageBuffer);
      console.log('✅ result:', test);
    } catch (error) {
      console.log('❌ error:', error);
    }
  }

  async RemoveBgTest() {
    try {
      const url = 'https://files.catbox.moe/rexka9.jpg';
      const result = await this.tools.removeBackground(url);
      console.log('✅ result:', result);
    } catch (error) {
      console.log('❌ error:', error);
    }
  }
}

(async () => {
  const scraper = new AbotScraper();
  await scraper.reminiV2Test();
})();
