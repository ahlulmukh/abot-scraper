const { ytPlay, wallpaper } = require("../src");

wallpaper("Naruto")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
