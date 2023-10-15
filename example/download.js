const { igstory, facebook, instagram, ytMP3, ytMP4 } = require("../src");

ytMP4("https://youtu.be/j_MlBCb9-m8?si=g6KsGM6cHNotU-rH")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

// This is example for instagram downloader, you can uncomment this

// instagram(
//   "https://www.instagram.com/reel/CwOMK_ohU85/?utm_source=ig_web_copy_link"
// )
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// This is example for facebook downloader, you can uncomment this

// facebook("https://www.facebook.com/100004512913170/videos/2122851521195311/")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// This is igstory for instagram downloader, you can uncomment this

// igstory("coachjustinl")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// This is ytmp3 for instagram downloader, you can uncomment this

// ytMP3("https://youtu.be/j_MlBCb9-m8?si=g6KsGM6cHNotU-rH")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
