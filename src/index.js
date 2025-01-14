const { facebook, igstory, ytMP3, ytMP4 } = require("./scraper/downloader");
const { ytPlay, wallpaper, wikimedia } = require("./scraper/search");

module.exports = {
  facebook,
  igstory,
  ytMP3,
  ytMP4,
  ytPlay,
  wallpaper,
  wikimedia,
};
