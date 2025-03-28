const Search = require("../src/scraper/search");
const search = new Search();

// search
//   .wallpaper("Anime")
//   .then((result) => {
//     console.log(result.hasil);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

search
  .sfileSearch("anime", 1)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// ytPlay("Abadi Speedup")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
