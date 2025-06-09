import Downloader from './scraper/downloader.js';
import Search from './scraper/search.js';

const downloader = new Downloader();
const search = new Search();

export default {
    downloader,
    search,
};

export { Downloader, downloader, Search, search };
