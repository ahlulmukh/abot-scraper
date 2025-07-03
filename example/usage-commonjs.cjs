const fs = require('fs');
const path = require('path');
const { Downloader, Search, Tools } = require('../dist/index.cjs');

class AbotScraper {
  constructor() {
    this.tools = new Tools();
    this.downloader = new Downloader();
    this.search = new Search();
  }

  // Tools Function

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
      const imagePath = path.join(__dirname, '..', 'test.jpeg');
      const imageBuffer = fs.readFileSync(imagePath);
      const result = await this.tools.removeBackground(imageBuffer);
      console.log('✅ result:', result);
    } catch (error) {
      console.log('❌ error:', error);
    }
  }

  // Downloader Function

  async downloaderTiktok() {
    try {
      const response = await this.downloader.tiktokDownloader(
        'https://vt.tiktok.com/ZSB2LtXQF/'
      );
      console.log('result:', response);
    } catch (error) {
      console.log('error:', error);
    }
  }

  async facebookDownloader() {
    try {
      const response = await this.downloader.facebookDownloader(
        'https://www.facebook.com/Add.Aja55/videos/1054552850113076'
      );
      console.log('result:', response);
    } catch (error) {
      console.log('error:', error);
    }
  }

  async instagramDownloader() {
    try {
      const response = await this.downloader.instagramDownloader(
        'https://www.instagram.com/p/CK0tLXyAzEI/'
      );
      console.log('result:', response);
    } catch (error) {
      console.log('error:', error);
    }
  }

  async ytDownloaderTest() {
    try {
      const response = await this.downloader.youtubeDownloader(
        'https://youtu.be/H_z0t5NQs7U?si=WnXwRNrNIsdaIERu'
      );
      console.log('result:', response);
    } catch (error) {
      console.log('error:', error);
    }
  }

  async ytmp3DownloaderTest() {
    try {
      const response = await this.downloader.ytMp3Downloader(
        'https://youtu.be/H_z0t5NQs7U?si=WnXwRNrNIsdaIERu'
      );
      console.log('result:', response);
    } catch (error) {
      console.log('error:', error);
    }
  }

  async sfileDownloaderTest() {
    try {
      const response = await this.downloader.sfileDownloader(
        'https://sfile.mobi/8tZaFADE7Ca'
      );
      console.log('result', response);
    } catch (error) {
      console.log(`error`, error);
    }
  }

  // Function Search

  async sfileSearchTest() {
    try {
      const response = await this.search.sfileSearch('Capcut Pro');
      console.log('result', response);
    } catch (error) {
      console.log(`error`, error);
    }
  }

  async ytSearchTest() {
    try {
      const response = await this.search.ytSearch('Phonk Terbaru');
      console.log('result', response);
    } catch (error) {
      console.log(`error`, error);
    }
  }

  async igStoryTest() {
    try {
      const response = await this.search.igStory('cristiano');
      console.log('result', response);
    } catch (error) {
      console.log(`error`, error);
    }
  }

  async wallpaperTest() {
    try {
      const response = await this.search.wallpaper('anime');
      console.log('result', response);
    } catch (error) {
      console.log(`error`, error);
    }
  }

  async wikimediaTest() {
    try {
      const response = await this.search.wikimedia('anime');
      console.log('result', response);
    } catch (error) {
      console.log(`error`, error);
    }
  }
}

(async () => {
  const scraper = new AbotScraper();
  await scraper.RemoveBgTest();
})();
