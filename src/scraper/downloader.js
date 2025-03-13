const { default: axios } = require("axios");
const cheerio = require("cheerio");
global.creator = `@abotscraper – ahmuq`;

module.exports = class Downloader {
  facebook = (url) => {
    return new Promise((resolve, reject) => {
      let config = {
        url: url,
      };
      let headerss = {
        "sec-ch-ua":
          '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Cookie:
          'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}',
      };
      axios("https://www.getfvid.com/downloader", {
        method: "POST",
        data: new URLSearchParams(Object.entries(config)),
        headers: headerss,
      })
        .then(({ data }) => {
          const $ = cheerio.load(data);
          const title = $(".card-title a").text().trim();
          const links = {
            hd: "",
            sd: "",
            audio: "",
          };

          $(".btns-download a").each((index, element) => {
            const link = $(element).attr("href");
            const text = $(element).text();
            if (text.includes("HD Quality")) {
              links.hd = link;
            } else if (text.includes("Normal Quality")) {
              links.sd = link;
            } else if (text.includes("Audio Only")) {
              links.audio = link;
            }
          });

          resolve({
            creator: global.creator,
            status: 200,
            result: {
              title: title,
              hd: links.hd,
              sd: links.sd,
              audio: links.audio,
            },
          });
        })
        .catch(reject);
    });
  };

  igstory = (username) => {
    return new Promise(async (resolve) => {
      try {
        const data = await axios.get(
          "https://insta-stories-viewer.com/" + username
        );
        const userIdRegex = /var USER_ID = (\d+);/;
        const match = data.data.match(userIdRegex);
        const userId = parseInt(match[1]);
        const hasil = await axios.get(
          "https://igs.sf-converter.com/api/stories/" + userId
        );
        const result = [];
        hasil.data.result.forEach((item, index) => {
          const imageUrl =
            item.image_versions2 &&
            item.image_versions2.candidates &&
            item.image_versions2.candidates.length > 0
              ? item.image_versions2.candidates[0].url
              : null;
          const videoUrl =
            item.video_versions && item.video_versions.length > 0
              ? item.video_versions[0].url
              : null;
          result.push(imageUrl);
          if (videoUrl) {
            result.push(videoUrl);
          }
          resolve({
            creator: global.creator,
            status: 200,
            result: result,
          });
        });
      } catch (error) {
        console.log(error);
        return resolve({
          creator: global.creator,
          status: false,
        });
      }
    });
  };

  instagram = (url) => {
    return new Promise((resolve, reject) => {
      let config = {
        url: url,
        lang_code: "en",
        token: "",
      };
      let headerss = {
        "sec-ch-ua":
          '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Cookie:
          'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}',
      };
      axios("https://fastdl.app/c/", {
        method: "POST",
        data: new URLSearchParams(Object.entries(config)),
        headers: headerss,
      })
        .then(({ data }) => {
          const $ = cheerio.load(data);
          const downloadLinks = [];
          $("a[href]").each((index, element) => {
            const hrefValue = $(element).attr("href");
            downloadLinks.push(hrefValue);
          });
          resolve({
            creator: global.creator,
            status: 200,
            result: downloadLinks,
          });
        })
        .catch(({ error }) => {
          reject(error);
        });
    });
  };

  ytMP3(url) {
    return new Promise((resolve, reject) => {
      let configd = {
        k_query: url,
        k_page: "Youtube Downloader",
        hl: "en",
        q_auto: 0,
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
          let url = "https://www.youtube.com/watch?v=" + data.vid;
          let configimg = {
            url: "https://www.youtube.be/" + url,
            q_auto: 0,
            ajax: 1,
          };
          let configdl = {
            vid: data.vid,
            k: data.links.mp3.mp3128.k,
          };
          let size = data.links.mp3.mp3128.size;
          axios("https://www.y2mate.com/mates/en68/analyze/ajax", {
            method: "POST",
            data: new URLSearchParams(Object.entries(configimg)),
            headers: headerss,
          }).then(({ data }) => {
            const $ = cheerio.load(data.result);
            let img = $("div.thumbnail.cover > a > img").attr("src");
            axios("https://www.y2mate.com/mates/convertV2/index", {
              method: "POST",
              data: new URLSearchParams(Object.entries(configdl)),
              headers: headerss,
            }).then(({ data }) => {
              resolve({
                creator: global.creator,
                status: 200,
                result: {
                  title: data.title,
                  ftype: data.ftype,
                  quality: data.fquality,
                  thumb: img,
                  size_mp3: size,
                  link: data.dlink,
                },
              });
            });
          });
        })
        .catch(reject);
    });
  }

  ytMP4 = (url) => {
    return new Promise((resolve, reject) => {
      let configd = {
        k_query: url,
        k_page: "Youtube Downloader",
        hl: "en",
        q_auto: 0,
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
          let url = "https://www.youtube.com/watch?v=" + data.vid;
          let configimg = {
            url: "https://www.youtube.be/" + url,
            q_auto: 0,
            ajax: 1,
          };
          let configdl = {
            vid: data.vid,
            k: data.links.mp4[135].k,
          };
          let size = data.links.mp4[135].size;
          axios("https://www.y2mate.com/mates/en68/analyze/ajax", {
            method: "POST",
            data: new URLSearchParams(Object.entries(configimg)),
            headers: headerss,
          }).then(({ data }) => {
            const $ = cheerio.load(data.result);
            let img = $("div.thumbnail.cover > a > img").attr("src");
            axios("https://www.y2mate.com/mates/convertV2/index", {
              method: "POST",
              data: new URLSearchParams(Object.entries(configdl)),
              headers: headerss,
            }).then(({ data }) => {
              resolve({
                creator: global.creator,
                status: 200,
                result: {
                  title: data.title,
                  ftype: data.ftype,
                  thumb: img,
                  size_mp4: size,
                  link: data.dlink,
                },
              });
            });
          });
        })
        .catch(reject);
    });
  };
};
