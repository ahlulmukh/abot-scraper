const Downloader = require("../src/scraper/downloader");
const downloader = new Downloader();

// downloader
//   .ytMP4("https://youtu.be/j_MlBCb9-m8?si=g6KsGM6cHNotU-rH")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// This is example for instagram downloader, you can uncomment this

// downloader
//   .instagram("https://www.instagram.com/p/DG75kWfN6aY/")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// This is example for facebook downloader, you can uncomment this

// downloader
//   .facebook("https://www.facebook.com/100004512913170/videos/2122851521195311/")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// downloader
//   .tiktokDownloader("https://vt.tiktok.com/ZSMGBCeuT/")
//   .then((result) => {
//     console.log(result);
//   });

// This is igstory for instagram downloader, you can uncomment this

// downloader
//   .igstory("coachjustinl")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

downloader
  .youtubeDownloader("https://youtu.be/j_MlBCb9-m8?si=g6KsGM6cHNotU-rH")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
