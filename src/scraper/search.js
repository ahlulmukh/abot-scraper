const { default: axios } = require("axios");
const cheerio = require("cheerio");
global.creator = `@abotscraper – ahmuq`;

function ytPlay(text) {
  return new Promise((resolve, reject) => {
    let configd = {
      k_query: text,
      k_page: "mp3",
      q_auto: 1,
    };
    let headerss = {
      "sec-ch-ua":
        '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      Cookie:
        'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}',
    };

    axios("https://www.y2mate.com/mates/analyzeV2/ajax", {
      method: "POST",
      data: new URLSearchParams(Object.entries(configd)),
      headers: headerss,
    })
      .then(({ data }) => {
        let v = data.vitems;
        var v2 = v[Math.floor(Math.random() * v.length)].v;
        let url = "https://www.youtube.com/watch?v=" + v2;
        let config = {
          k_query: "https://www.youtube.be/" + url,
          k_page: "mp3",
          hl: "en",
          q_auto: 1,
        };
        let config2 = {
          url: "https://www.youtube.be/" + url,
          q_auto: 0,
          ajax: 1,
        };
        axios("https://www.y2mate.com/mates/en68/analyze/ajax", {
          method: "POST",
          data: new URLSearchParams(Object.entries(config2)),
          headers: headerss,
        }).then(({ data }) => {
          const $ = cheerio.load(data.result);
          let img = $("div.thumbnail.cover > a > img").attr("src");
          axios("https://www.y2mate.com/mates/analyzeV2/ajax", {
            method: "POST",
            data: new URLSearchParams(Object.entries(config)),
            headers: headerss,
          }).then(({ data }) => {
            const convertConfig = {
              vid: data.vid,
              k: data.links.mp3.mp3128.k,
            };
            let size = data.links.mp3.mp3128.size;
            axios("https://www.y2mate.com/mates/convertV2/index", {
              method: "POST",
              data: new URLSearchParams(Object.entries(convertConfig)),
              headers: headerss,
            })
              .then((response) => {
                resolve({
                  creator: global.creator,
                  status: 200,
                  result: {
                    status: response.data.status,
                    title: response.data.title,
                    ftype: response.data.ftype,
                    thumb: img,
                    size_mp3: size,
                    link: response.data.dlink,
                  },
                });
              })
              .catch(reject);
          });
        });
      })
      .catch(reject);
  });
}

module.exports = {
  ytPlay,
};
