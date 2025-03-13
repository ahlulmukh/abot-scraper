const Downloader = require("./scraper/downloader");
const Search = require("./scraper/search");

module.exports = {
  downloader: new Downloader(),
  search: new Search(),
};
