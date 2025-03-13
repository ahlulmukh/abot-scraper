const { default: axios } = require("axios");
const cheerio = require("cheerio");
global.creator = `@abotscraper – ahmuq`;
const https = require("https");

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
        new: 2,
        lang: "en",
        app: "",
      };
      let headerss = {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      };
      axios("https://snapinsta.app/get-data.php", {
        method: "POST",
        data: new URLSearchParams(Object.entries(config)),
        headers: headerss,
      })
        .then(({ data }) => {
          const downloadLinks = data.files
            .map((file) => {
              if (file.__type === "GraphVideo") {
                return {
                  type: "video",
                  url: file.video_url,
                };
              } else if (file.__type === "GraphImage") {
                return {
                  type: "image",
                  url: file.download_url,
                };
              }
              return null;
            })
            .filter((link) => link !== null);
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

  youtubeDownloader(url) {
    return new Promise((resolve, reject) => {
      let configd = {
        url: url,
        q_auto: 0,
        ajax: 1,
        lang: "en",
      };
      let headerss = {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      };
      axios("https://yt1s.net/ajax?retry=undefined&platform=youtube", {
        method: "POST",
        data: new URLSearchParams(Object.entries(configd)),
        headers: headerss,
      })
        .then(({ data }) => {
          const $ = cheerio.load(data.result);
          const title = $(".caption b").text().trim();
          const downloadLinks = {
            "480p": $('a[data-fquality="480p"]').attr("href"),
            "720p": $('a[data-fquality="720p"]').attr("href"),
            "1080p": $('a[data-fquality="1080p"]').attr("href"),
          };
          const thumbnailUrl = $(".thumbnail.cover img").attr("src");
          const mp3ConvertElement = $("#convert-mp3 a");
          const hrefAttr = mp3ConvertElement.attr("href");
          const mp3ConvertTokenMatch = hrefAttr.match(
            /mp3_convert_task\('(\d+)',\s*'([^']+)'\)/
          );
          const mp3ConvertToken = mp3ConvertTokenMatch[2];
          axios
            .get(
              `https://api.fabdl.com/youtube/mp3-convert-task?token=${mp3ConvertToken}`
            )
            .then(({ data: mp3Data }) => {
              const mp3DownloadUrl = `https://api.fabdl.com${mp3Data.result.download_url}`;

              resolve({
                creator: global.creator,
                status: 200,
                result: {
                  title: title,
                  thumbnail: thumbnailUrl,
                  downloadLinks: downloadLinks,
                  mp3DownloadUrl: mp3DownloadUrl,
                },
              });
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
};
