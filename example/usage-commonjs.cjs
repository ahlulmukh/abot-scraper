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

  async RemoveBgTest() {
    const url = 'https://files.catbox.moe/rexka9.jpg';
    const result = await this.tools.RemoveBackground(url);
    console.log('✅ result:', result);
  }
}

(async () => {
  const scraper = new AbotScraper();
  await scraper.RemoveBgTest();
})();
