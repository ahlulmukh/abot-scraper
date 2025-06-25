import Downloader from './scraper/downloader.js';
import Search from './scraper/search.js';
import Tools from './scraper/tools.js';

const downloader = new Downloader();
const search = new Search();
const tools = new Tools();
export default {
    downloader,
    search,
    tools
};

export { Downloader, downloader, Search, search, Tools, tools };

