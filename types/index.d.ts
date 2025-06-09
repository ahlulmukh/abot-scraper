export interface ApiResponse<T = any> {
    creator: string;
    status: number | boolean;
    result?: T;
    msg?: string;
}

export interface FacebookResult {
    thumbnail: string;
    videoUrl: string;
}

export interface TikTokResult {
    title: string;
    video: string;
    audio: string;
}

export interface InstagramUserInfo {
    username: string;
    [key: string]: any;
}

export interface InstagramStoriesResult {
    user_info: InstagramUserInfo;
    links: string[];
}

export interface InstagramMediaItem {
    type: "video" | "image";
    url: string;
}

export interface YouTubeDownloadLinks {
    "480p"?: string;
    "720p"?: string;
    "1080p"?: string;
}

export interface YouTubeResult {
    title: string;
    thumbnail: string;
    downloadLinks: YouTubeDownloadLinks;
    mp3DownloadUrl: string;
}

export interface SFileDownloadResult {
    filename: string;
    mimetype: string;
    download: string;
}

export interface SFileSearchItem {
    title: string;
    size: string;
    link: string;
}

export interface YouTubePlayResult {
    status: string;
    title: string;
    ftype: string;
    thumb: string;
    size_mp3: string;
    link: string;
}

export interface WallpaperItem {
    title: string;
    type: string;
    source: string;
    image: string[];
}

export interface WikimediaItem {
    title: string;
    source: string;
    image: string;
}

export interface SfileSearchResult {
    title: string;
    size: string;
    link: string;
}

export interface YtPlayResult {
    status: string;
    title: string;
    ftype: string;
    thumb: string;
    size_mp3: string;
    link: string;
}

export interface WallpaperResult {
    title: string;
    type: string;
    source: string;
    image: string[];
}

export interface WikimediaResult {
    title: string;
    source: string;
    image: string;
}

export interface YoutubeResult {
    title: string;
    thumbnail: string;
    downloadLinks: Record<string, string>;
    mp3DownloadUrl: string;
}

export interface YoutubeResultV2 {
    title: string;
    thumbnail: string | null;
    downloadLinks: Record<string, string>;
    video: string | null;
    audio: string | null;
    formats: any[];
}

export interface SfileDownloadResult {
    filename: string;
    mimetype: string;
    download: string;
}

export declare class Downloader {
    facebook(url: string): Promise<ApiResponse<FacebookResult>>;

    tiktokDownloader(url: string): Promise<ApiResponse<TikTokResult>>;

    igstory(username: string): Promise<ApiResponse<InstagramStoriesResult>>;

    instagram(url: string): Promise<ApiResponse<InstagramMediaItem[]>>;

    youtubeDownloader(url: string): Promise<ApiResponse<YouTubeResult>>;

    sfileDownloader(url: string): Promise<ApiResponse<SFileDownloadResult>>;
}

export declare class Search {
    sfileSearch(query: string, page?: number): Promise<ApiResponse<SFileSearchItem[]>>;

    ytPlay(text: string): Promise<ApiResponse<YouTubePlayResult>>;

    wallpaper(title: string, page?: string): Promise<ApiResponse<WallpaperItem[]>>;

    wikimedia(title: string): Promise<ApiResponse<WikimediaItem[]>>;
}

export declare const downloader: Downloader;

export declare const search: Search;

declare const abot: {
    downloader: Downloader;
    search: Search;
};

export default abot;
