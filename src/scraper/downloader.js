const { default: axios } = require("axios");
const cheerio = require("cheerio");
const FormData = require("form-data");
global.creator = `@abotscraper – ahmuq`;

module.exports = class Downloader {
  facebook = (url) => {
    return new Promise((resolve, reject) => {
      let headerss = {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
        Origin: "https://www.fdown.world",
        referer: "https://www.fdown.world/",
        "x-requested-with": "XMLHttpRequest",
        Cookie: "codehap_domain=www.fdown.world",
      };

      const data = {
        codehap_link: url,
        codehap: "true",
      };

      axios("https://www.fdown.world/result.php", {
        method: "POST",
        data: new URLSearchParams(Object.entries(data)),
        headers: headerss,
      })
        .then(({ data }) => {
          const $ = cheerio.load(data);
          const videoUrl = $("video source").attr("src");
          const imageUrl = $("img").attr("src");

          resolve({
            creator: global.creator,
            status: 200,
            result: {
              thumbnail: imageUrl,
              videoUrl: videoUrl,
            },
          });
        })
        .catch(reject);
    });
  };

  tiktokDownloader = (url) => {
    return new Promise((resolve, reject) => {
      let headers = {
        "sec-ch-ua":
          '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      };

      let config = {
        id: url,
        locale: "en",
        tt: "WmNzZDk_",
      };
      axios("https://ssstik.io/abc?url=dl", {
        method: "POST",
        data: new URLSearchParams(Object.entries(config)),
        headers: headers,
      })
        .then(({ data }) => {
          const $ = cheerio.load(data);
          const title = $("p.maintext").text().trim();
          const audio = $("a.download_link.music").attr("href");
          const video = $("a.download_link.without_watermark").attr("href");
          resolve({
            creator: global.creator,
            status: 200,
            result: {
              title: title,
              video: video,
              audio: audio,
            },
          });
        })
        .catch(reject);
    });
  };

  igstory = (username) => {
    function encodeParameter(username) {
      const parameter = `-1::${username}::rJP2tBRKf6ktbRqPUBtRE9klgBWb7d`;
      let encoded = Buffer.from(parameter).toString("base64");
      encoded = encoded
        .replace(/[+]/g, ".")
        .replace(/[/]/g, "_")
        .replace(/[=]/g, "-");

      return encoded;
    }
    return new Promise(async (resolve) => {
      const headers = {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/",
      };
      try {
        const encodedParameter = encodeParameter(username);
        const storyData = await axios(
          `https://instanavigation.net/api/v1/stories/${encodedParameter}`,
          {
            method: "GET",
            headers: headers,
          }
        );
        const data = storyData.data;
        const sources = data.stories.map((story) => story.source);
        return resolve({
          creator: global.creator,
          status: 200,
          result: {
            user_info: data.user_info,
            links: sources,
          },
        });
      } catch (error) {
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
