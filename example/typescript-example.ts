import abot, {
    Downloader,
    Search,
    downloader,
    search
} from "abot-scraper";

async function demonstrateTypedUsage() {
    console.log("🎯 TypeScript Example for abot-scraper\n");

    try {

        console.log("1. Using default export (pre-instantiated):");

        const fbResult = await abot.downloader.facebook(
            "https://www.facebook.com/video/example"
        );

        if (fbResult.status === 200 && fbResult.result) {
            console.log("✅ Facebook download successful:");
            console.log("  Thumbnail:", fbResult.result.thumbnail);
            console.log("  Video URL:", fbResult.result.videoUrl);
        }


        console.log("\n2. Using named imports with classes:");

        const downloaderInstance = new Downloader();
        const searchInstance = new Search();

        const tiktokResult = await downloaderInstance.tiktokDownloader(
            "https://www.tiktok.com/@user/video/123"
        );

        if (tiktokResult.status === 200 && tiktokResult.result) {
            console.log("✅ TikTok download successful:");
            console.log("  Title:", tiktokResult.result.title);
            console.log("  Video:", tiktokResult.result.video);
            console.log("  Audio:", tiktokResult.result.audio);
        }


        console.log("\n3. Search functionality with types:");

        const searchResult = await searchInstance.sfileSearch("example", 1);

        if (searchResult.status && searchResult.result) {
            console.log("✅ Search successful:");
            searchResult.result.forEach((item, index) => {
                console.log(`  ${index + 1}. ${item.title} (${item.size})`);
            });
        }


        console.log("\n4. Using pre-instantiated exports:");

        const wallpaperResult = await search.wallpaper("nature", "1");
        if (wallpaperResult.status && wallpaperResult.result) {
            console.log("✅ Wallpaper search successful:", wallpaperResult.result.length, "results");
        }

        const sfileResult = await downloader.sfileDownloader("https://sfile.mobi/example");
        console.log("✅ SFile download result:", sfileResult.status);

    } catch (error: unknown) {

        if (error instanceof Error) {
            console.error("❌ Error:", error.message);
        } else {
            console.error("❌ Unknown error:", error);
        }
        console.log("Note: Errors are expected in this demo without real URLs");
    }
}


class CustomDownloader extends Downloader {
    async downloadWithRetry(url: string, maxRetries: number = 3) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await this.facebook(url);
            } catch (error) {
                if (i === maxRetries - 1) throw error;
                console.log(`Retry ${i + 1}/${maxRetries}`);
            }
        }
        throw new Error("Max retries exceeded");
    }
}

function processApiResponse<T>(response: { status: number | boolean; result?: T; msg?: string }): T | null {
    if (response.status === 200 || response.status === true) {
        return response.result || null;
    }
    console.error("API Error:", response.msg);
    return null;
}

export { CustomDownloader, demonstrateTypedUsage, processApiResponse };

demonstrateTypedUsage().catch(console.error);