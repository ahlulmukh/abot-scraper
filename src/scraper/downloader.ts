import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import qs from 'qs';
import {
    ApiResponse,
    FacebookResult,
    InstagramMediaItem,
    SfileDownloadResult,
    TikTokResult,
    YoutubeResult,
    YoutubeResultV2
} from '../../types/index.js';
import Generator from '../utils/generator.js';


interface FileItem {
    __type: string;
    video_url?: string;
    download_url?: string;
    [key: string]: unknown;
}

interface InstagramFilesResponse {
    files: FileItem[];
}

interface YouTubeFormat {
    quality: string;
    video_url: string;
    [key: string]: unknown;
}

interface YouTubeMedia {
    media_type: string;
    preview_url?: string;
    resource_url?: string;
    formats?: YouTubeFormat[];
    [key: string]: unknown;
}

interface YouTubeApiResponse {
    text: string;
    medias: YouTubeMedia[];
}

declare global {
    // eslint-disable-next-line no-var
    var creator: string;
}

global.creator = '@abotscraper – ahmuq';

export default class Downloader {
    private generator: Generator;

    constructor() {
        this.generator = new Generator();
    }

    async facebookDownloader(url: string): Promise<ApiResponse<FacebookResult>> {
        try {
            const headers = {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0',
                Origin: 'https://www.fdown.world',
                referer: 'https://www.fdown.world/',
                'x-requested-with': 'XMLHttpRequest',
                Cookie: 'codehap_domain=www.fdown.world',
            };

            const data = new URLSearchParams({ codehap_link: url, codehap: 'true' });

            const response: AxiosResponse = await axios.post(
                'https://www.fdown.world/result.php',
                data,
                { headers }
            );

            const $ = cheerio.load(response.data);
            const videoUrl = $('video source').attr('src');
            const imageUrl = $('img').attr('src');

            if (!videoUrl && !imageUrl) {
                throw new Error('No video or image found in the response.');
            }

            return {
                creator: global.creator,
                status: 200,
                result: {
                    thumbnail: imageUrl || '',
                    videoUrl: videoUrl || '',
                },
            };
        } catch (error) {
            return {
                creator: global.creator,
                status: false,
                msg: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }

    async tiktokDownloader(url: string): Promise<ApiResponse<TikTokResult>> {
        try {
            const headers = {
                'sec-ch-ua':
                    '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
                'user-agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            };

            const data = new URLSearchParams({
                id: url,
                locale: 'en',
                tt: 'WmNzZDk_',
            });

            const response: AxiosResponse = await axios.post(
                'https://ssstik.io/abc?url=dl',
                data,
                {
                    headers,
                }
            );

            const $ = cheerio.load(response.data);
            const title = $('p.maintext').text().trim();
            const audio = $('a.download_link.music').attr('href');
            const video = $('a.download_link.without_watermark').attr('href');

            if (!title || !video) {
                throw new Error('Failed to extract video or title from response.');
            }

            return {
                creator: global.creator,
                status: 200,
                result: {
                    title: title,
                    video: video || '',
                    audio: audio || '',
                },
            };
        } catch (error) {
            return {
                creator: global.creator,
                status: false,
                msg: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }

    async instagramDownloader(url: string): Promise<ApiResponse<InstagramMediaItem[]>> {
        try {
            const payload = new URLSearchParams({ url });
            const headers = {
                accept: '*/*',
                'accept-language': 'en-US,en;q=0.9,ar;q=0.8,id;q=0.7,vi;q=0.6',
                'content-type': 'application/x-www-form-urlencoded',
                priority: 'u=1, i',
                'sec-ch-ua':
                    '"Not)A;Brand";v="8", "Chromium";v="138", "Microsoft Edge";v="138"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
            };

            const response: AxiosResponse = await axios.post(
                'https://snapinsta.llc/process',
                payload,
                { headers }
            );

            const $ = cheerio.load(response.data);
            const downloadItems: InstagramMediaItem[] = [];
            $('.download-item').each((_index, element) => {
                const $element = $(element);
                const previewImg = $element.find('.media-box img').attr('src');
                const downloadLink = $element.find('.download-media').attr('href');
                const downloadText = $element.find('.download-media').text().trim();
                const isVideo = downloadText.toLowerCase().includes('video') ||
                    $element.find('.icon-downvid').length > 0;
                if (downloadLink) {
                    const mediaItem: InstagramMediaItem = {
                        type: isVideo ? 'video' : 'image',
                        url: downloadLink
                    };
                    if (previewImg) {
                        mediaItem.preview = previewImg;
                    }
                    downloadItems.push(mediaItem);
                }
            });
            if (downloadItems.length === 0) {
                throw new Error('No media items found in the response.');
            }
            return {
                creator: global.creator,
                status: 200,
                result: downloadItems,
            };
        } catch (error) {
            return {
                creator: global.creator,
                status: false,
                msg: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }


    async instagramDownloaderTemp(url: string): Promise<ApiResponse<InstagramMediaItem[]>> {
        try {
            const config = new URLSearchParams({
                url: url,
                new: '2',
                lang: 'en',
                app: '',
            });

            const headers = {
                'user-agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            };

            const response: AxiosResponse<InstagramFilesResponse> = await axios.post(
                'https://snapinsta.app/get-data.php',
                config,
                { headers }
            );

            const downloadLinks = response.data.files
                .map((file: FileItem) =>
                    file.__type === 'GraphVideo'
                        ? { type: 'video' as const, url: file.video_url || '' }
                        : file.__type === 'GraphImage'
                            ? { type: 'image' as const, url: file.download_url || '' }
                            : null
                )
                .filter((link: InstagramMediaItem | null): link is InstagramMediaItem => link !== null);

            return {
                creator: global.creator,
                status: 200,
                result: downloadLinks,
            };
        } catch (error) {
            return {
                creator: global.creator,
                status: false,
                msg: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }

    async youtubeDownloader(url: string): Promise<ApiResponse<YoutubeResult>> {
        try {
            const config = qs.stringify({
                url: url,
                q_auto: 0,
                ajax: 1,
                lang: 'en',
            });

            const headers = {
                'user-agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            };

            const response: AxiosResponse = await axios.post(
                'https://yt1s.net/ajax?retry=undefined&platform=youtube',
                config,
                { headers }
            );

            const $ = cheerio.load(response.data.result);
            const title = $('.caption b').text().trim();
            const downloadLinks = {
                '480p': $('a[data-fquality="480p"]').attr('href') || '',
                '720p': $('a[data-fquality="720p"]').attr('href') || '',
                '1080p': $('a[data-fquality="1080p"]').attr('href') || '',
            };
            const thumbnailUrl = $('.thumbnail.cover img').attr('src');

            const mp3ConvertElement = $('#convert-mp3 a');
            const hrefAttr = mp3ConvertElement.attr('href');

            if (!hrefAttr) throw new Error('MP3 conversion link not found.');

            const mp3ConvertTokenMatch = hrefAttr.match(
                /mp3_convert_task\('(\d+)',\s*'([^']+)'\)/
            );

            if (!mp3ConvertTokenMatch)
                throw new Error('MP3 conversion token not found.');

            const mp3ConvertToken = mp3ConvertTokenMatch[2];

            const mp3Response: AxiosResponse = await axios.get(
                `https://api.fabdl.com/youtube/mp3-convert-task?token=${mp3ConvertToken}`
            );

            return {
                creator: global.creator,
                status: 200,
                result: {
                    title: title,
                    thumbnail: thumbnailUrl || '',
                    downloadLinks: downloadLinks,
                    mp3DownloadUrl: `https://api.fabdl.com${mp3Response.data.result.download_url}`,
                },
            };
        } catch (error) {
            return {
                creator: global.creator,
                status: false,
                msg: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }

    ytMp3Downloader = (url: string) => {
        return new Promise((resolve, reject) => {
            const headers = {
                accept: "*/*",
                "accept-language": "en-US,en;q=0.9,ar;q=0.8,id;q=0.7,vi;q=0.6",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                priority: "u=1, i",
                "sec-ch-ua":
                    '"Microsoft Edge";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                Referer: "https://y2hub.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin",
            };

            const payload = qs.stringify({
                action: "yt_convert",
                nonce: "1495b10e48",
                youtube_url: url,
            });

            axios(`https://youtubemp4free.com/wp-admin/admin-ajax.php`, {
                method: "POST",
                headers: headers,
                data: payload,
            })
                .then(({ data }) => {
                    if (!data.success) {
                        return reject(new Error("Failed to fetch video data"));
                    }

                    const videoInfo = data.data.info;
                    const slug = data.data.slug;
                    const size = data.data.size;
                    return axios("https://ryin.info/", {
                        method: "GET",
                        headers: {
                            "User-Agent":
                                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0",
                        },
                    }).then((response) => {
                        const setCookieHeaders = response.headers["set-cookie"];
                        let cookies;

                        if (setCookieHeaders) {
                            cookies = setCookieHeaders
                                .map((cookie) => cookie.split(";")[0])
                                .join("; ");
                        } else {
                            cookies =
                                "PHPSESSID=fl86pmq4dqgh2835b32mdm7380; csrf_cookie_name=739e04fcc21050c61c5325b34f449659; lang=en";
                        }

                        const pageUrl = "https://ryin.info/" + slug;

                        return axios(pageUrl, {
                            method: "GET",
                            headers: {
                                "User-Agent":
                                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0",
                                Cookie: cookies,
                            },
                        }).then((response) => {
                            const html = response.data;
                            const $ = cheerio.load(html);
                            const downloadHref = $("#download-url").attr("download-href");

                            if (!downloadHref) {
                                return reject(new Error("Download link not found on page"));
                            }
                            resolve({
                                creator: global.creator,
                                status: true,
                                title: videoInfo.title,
                                thumbnail: videoInfo.thumbnail,
                                description: videoInfo.description,
                                viewCount: videoInfo.view_count,
                                size: this.generator.formatFileSize(size),
                                downloadUrl: downloadHref,
                            });
                        });
                    });
                })
                .catch((error) => {
                    reject({
                        creator: global.creator,
                        status: false,
                        error: error.message,
                    });
                });
        });
    };


    async youtubeDownloaderV2(url: string): Promise<ApiResponse<YoutubeResultV2>> {
        try {
            const timestamp = this.generator.generateTimeStampYoutubeDL();
            const footer = this.generator.generateFooterYoutubeDL(timestamp, url);

            const payload = {
                link: url,
            };

            const headers = {
                'user-agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'g-footer': footer,
                'g-timestamp': timestamp,
                accept: '*/*',
                'accept-language': 'en',
                'content-type': 'application/json',
                priority: 'u=1, i',
                'sec-ch-ua':
                    '"Microsoft Edge";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                Referer: 'https://snapany.com/',
                'Referrer-Policy': 'strict-origin-when-cross-origin',
            };

            const response: AxiosResponse<YouTubeApiResponse> = await axios.post(
                'https://api.snapany.com/v1/extract',
                payload,
                { headers }
            );
            const data = response.data;

            const videoMedia = data.medias.find(
                (media: YouTubeMedia) => media.media_type === 'video'
            );
            const audioMedia = data.medias.find(
                (media: YouTubeMedia) => media.media_type === 'audio'
            );

            const downloadLinks: Record<string, string> = {};
            if (videoMedia && videoMedia.formats) {
                videoMedia.formats.forEach((format: YouTubeFormat) => {
                    const qualityKey = `${format.quality}p`;
                    downloadLinks[qualityKey] = format.video_url;
                });
            }

            return {
                creator: global.creator,
                status: 200,
                result: {
                    title: data.text,
                    thumbnail: videoMedia?.preview_url || null,
                    downloadLinks: downloadLinks,
                    video: videoMedia?.resource_url || null,
                    audio: audioMedia?.resource_url || null,
                    formats: videoMedia?.formats || [],
                },
            };
        } catch (error) {
            return {
                creator: global.creator,
                status: false,
                msg: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }

    async sfileDownloader(url: string): Promise<ApiResponse<SfileDownloadResult>> {
        try {
            const response: AxiosResponse = await axios.get(url, {
                headers: {
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    Referer: 'https://sfile.mobi/',
                    'Accept-Language': 'en-US,en;q=0.9',
                },
            });

            const $ = cheerio.load(response.data);
            const filename = $('.intro-container img').attr('alt') || '';
            const mimetype = $('div.list').text().split(' - ')[1]?.split('\n')[0] || '';
            const downloadHref = $('#download').attr('href');
            const download = downloadHref
                ? downloadHref + '&k=' + Math.floor(Math.random() * (15 - 10 + 1) + 10)
                : '';

            return {
                creator: global.creator,
                status: 200,
                result: { filename, mimetype, download },
            };
        } catch (error) {
            return {
                creator: global.creator,
                status: false,
                msg: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
}
