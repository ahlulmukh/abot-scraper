import axios from "axios";
import * as cheerio from "cheerio";
import qs from "qs";
global.creator = `@abotscraper – ahmuq`;

export default class Downloader {
  constructor() {
    this.generator = new (require("../utils/generator.js").default)();
  }
  async facebook(url) {
    try {
      const headers = {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
        Origin: "https://www.fdown.world",
        referer: "https://www.fdown.world/",
        "x-requested-with": "XMLHttpRequest",
        Cookie: "codehap_domain=www.fdown.world",
      };

      const data = new URLSearchParams({ codehap_link: url, codehap: "true" });

      const response = await axios.post(
        "https://www.fdown.world/result.php",
        data,
        { headers }
      );

      const $ = cheerio.load(response.data);
      const videoUrl = $("video source").attr("src");
      const imageUrl = $("img").attr("src");

      return {
        creator: global.creator,
        status: 200,
        result: {
          thumbnail: imageUrl,
          videoUrl: videoUrl,
        },
      };
    } catch (error) {
      return { creator: global.creator, status: false, msg: error.message };
    }
  }

  async tiktokDownloader(url) {
    try {
      const headers = {
        "sec-ch-ua":
          '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      };

      const data = new URLSearchParams({
        id: url,
        locale: "en",
        tt: "WmNzZDk_",
      });

      const response = await axios.post("https://ssstik.io/abc?url=dl", data, {
        headers,
      });

      const $ = cheerio.load(response.data);
      const title = $("p.maintext").text().trim();
      const audio = $("a.download_link.music").attr("href");
      const video = $("a.download_link.without_watermark").attr("href");

      return {
        creator: global.creator,
        status: 200,
        result: {
          title: title,
          video: video,
          audio: audio,
        },
      };
    } catch (error) {
      return { creator: global.creator, status: false, msg: error.message };
    }
  }

  async igstory(username) {
    function encodeParameter(username) {
      const parameter = `-1::${username}::rJP2tBRKf6ktbRqPUBtRE9klgBWb7d`;
      let encoded = Buffer.from(parameter).toString("base64");
      return encoded
        .replace(/[+]/g, ".")
        .replace(/[/]/g, "_")
        .replace(/[=]/g, "-");
    }

    try {
      const headers = {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/",
      };

      const encodedParameter = encodeParameter(username);
      const response = await axios.get(
        `https://instanavigation.net/api/v1/stories/${encodedParameter}`,
        { headers }
      );

      const data = response.data;
      const sources = data.stories.map((story) => story.source);

      return {
        creator: global.creator,
        status: 200,
        result: {
          user_info: data.user_info,
          links: sources,
        },
      };
    } catch (error) {
      return { creator: global.creator, status: false, msg: error.message };
    }
  }

  async instagram(url) {
    try {
      const config = new URLSearchParams({
        url: url,
        new: 2,
        lang: "en",
        app: "",
      });

      const headers = {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      };

      const response = await axios.post(
        "https://snapinsta.app/get-data.php",
        config,
        { headers }
      );

      const downloadLinks = response.data.files
        .map((file) =>
          file.__type === "GraphVideo"
            ? { type: "video", url: file.video_url }
            : file.__type === "GraphImage"
            ? { type: "image", url: file.download_url }
            : null
        )
        .filter((link) => link !== null);

      return {
        creator: global.creator,
        status: 200,
        result: downloadLinks,
      };
    } catch (error) {
      return { creator: global.creator, status: false, msg: error.message };
    }
  }

  async youtubeDownloader(url) {
    try {
      const config = qs.stringify({ url: url, q_auto: 0, ajax: 1, lang: "en" });

      const headers = {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      };

      const response = await axios.post(
        "https://yt1s.net/ajax?retry=undefined&platform=youtube",
        config,
        { headers }
      );

      const $ = cheerio.load(response.data.result);
      const title = $(".caption b").text().trim();
      const downloadLinks = {
        "480p": $('a[data-fquality="480p"]').attr("href"),
        "720p": $('a[data-fquality="720p"]').attr("href"),
        "1080p": $('a[data-fquality="1080p"]').attr("href"),
      };
      const thumbnailUrl = $(".thumbnail.cover img").attr("src");

      const mp3ConvertElement = $("#convert-mp3 a");
      const hrefAttr = mp3ConvertElement.attr("href");

      if (!hrefAttr) throw new Error("MP3 conversion link not found.");

      const mp3ConvertTokenMatch = hrefAttr.match(
        /mp3_convert_task\('(\d+)',\s*'([^']+)'\)/
      );

      if (!mp3ConvertTokenMatch)
        throw new Error("MP3 conversion token not found.");

      const mp3ConvertToken = mp3ConvertTokenMatch[2];

      const mp3Response = await axios.get(
        `https://api.fabdl.com/youtube/mp3-convert-task?token=${mp3ConvertToken}`
      );

      return {
        creator: global.creator,
        status: true,
        result: {
          title: title,
          thumbnail: thumbnailUrl,
          downloadLinks: downloadLinks,
          mp3DownloadUrl: `https://api.fabdl.com${mp3Response.data.result.download_url}`,
        },
      };
    } catch (error) {
      return { creator: global.creator, status: false, msg: error.message };
    }
  }

  async youtubeDownloaderV2(url) {
    try {
      const timestamp = this.generator.generateTimeStampYoutubeDL();
      const footer = this.generator.generateFooterYoutubeDL(timestamp, url);

      const payload = {
        link: url,
      };

      const headers = {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "g-footer": footer,
        "g-timestamp": timestamp,
        accept: "*/*",
        "accept-language": "en",
        "content-type": "application/json",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Microsoft Edge";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        Referer: "https://snapany.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      };
      const response = await axios.post(
        "https://api.snapany.com/v1/extract",
        payload,
        { headers }
      );
      const data = response.data;

      const videoMedia = data.medias.find(
        (media) => media.media_type === "video"
      );
      const audioMedia = data.medias.find(
        (media) => media.media_type === "audio"
      );
      const downloadLinks = {};
      if (videoMedia && videoMedia.formats) {
        videoMedia.formats.forEach((format) => {
          const qualityKey = `${format.quality}p`;
          downloadLinks[qualityKey] = format.video_url;
        });
      }

      return {
        creator: global.creator,
        status: true,
        result: {
          title: data.text,
          thumbnail: videoMedia ? videoMedia.preview_url : null,
          downloadLinks: downloadLinks,
          video: videoMedia ? videoMedia.resource_url : null,
          audio: audioMedia ? audioMedia.resource_url : null,
          formats: videoMedia ? videoMedia.formats : [],
        },
      };
    } catch (error) {
      return { creator: global.creator, status: false, msg: error.message };
    }
  }

  async sfileDownloader(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Referer: "https://sfile.mobi/",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });
      const $ = cheerio.load(response.data);
      let filename = $(".intro-container img").attr("alt");
      let mimetype = $("div.list").text().split(" - ")[1].split("\n")[0];
      let download =
        $("#download").attr("href") +
        "&k=" +
        Math.floor(Math.random() * (15 - 10 + 1) + 10);
      return {
        creator: global.creator,
        status: true,
        result: { filename, mimetype, download },
      };
    } catch (error) {
      return { creator: global.creator, status: false, msg: error.message };
    }
  }
}
