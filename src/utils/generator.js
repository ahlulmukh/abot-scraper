import crypto from "crypto";

export default class Generator {
  generateTimeStampYoutubeDL() {
    return Date.now().toString();
  }

  generateFooterYoutubeDL(timestamp, link) {
    const locale = "en";
    const secretKey = "6HTugjCXxR";
    const input = link + locale + timestamp + secretKey;
    const hash = crypto.createHash("md5").update(input).digest("hex");
    return hash;
  }
}
