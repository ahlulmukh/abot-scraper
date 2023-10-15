const { ytPlay } = require("../src");

ytPlay("Abadi Speedup")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
