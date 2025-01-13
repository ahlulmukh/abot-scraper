const { ytPlay, wallpaper } = require("../src");

wallpaper("Anime")
  .then((result) => {
    console.log(result.hasil);
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
