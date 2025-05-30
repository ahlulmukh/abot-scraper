import abot, { Downloader, Search, downloader, search } from "abot-scraper";

async function testESModule() {
  console.log("🧪 Testing ES Module Usage\n");

  try {
    console.log("1. Using default export:");

    const fbResult = await abot.downloader.facebook(
      "https://www.facebook.com/video/example"
    );
    console.log("✅ Facebook result:", fbResult.status);

    const searchResult = await abot.search.sfileSearch("example", 1);
    console.log(
      "✅ Search result:",
      searchResult.status,
      searchResult.result?.length,
      "items"
    );

    console.log("\n2. Using named exports (pre-instantiated):");

    const igResult = await downloader.igstory("username");
    console.log("✅ Instagram stories result:", igResult.status);

    const ytResult = await search.ytPlay("music");
    console.log("✅ YouTube play result:", ytResult.status);

    console.log("\n3. Using class instances:");

    const downloaderInstance = new Downloader();
    const searchInstance = new Search();

    const ytDownload = await downloaderInstance.youtubeDownloader(
      "https://youtube.com/watch?v=example"
    );
    console.log("✅ YouTube download result:", ytDownload.status);

    const wikimedia = await searchInstance.wikimedia("javascript");
    console.log(
      "✅ Wikimedia result:",
      wikimedia.status,
      wikimedia.result?.length,
      "items"
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.log("Note: Errors are expected with demo URLs");
  }
}

testESModule().catch(console.error);

export { testESModule };
