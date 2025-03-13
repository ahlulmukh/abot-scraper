const Downloader = require("./scraper/downloader");
const Search = require("./scraper/search");

module.exports = {
  Downloader: new Downloader(),
  Search: new Search(),
};
