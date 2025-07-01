import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import axios from 'axios';
import Downloader from '../src/scraper/downloader.js';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Downloader', () => {
    let downloader: Downloader;

    beforeEach(() => {
        downloader = new Downloader();
        jest.clearAllMocks();
    });

    describe('tiktokDownloader', () => {
        it('should successfully download TikTok video', async () => {
            const mockUrl = 'https://vt.tiktok.com/ZSB2LtXQF/';
            const mockHtmlResponse = {
                data: `
                    <html>
                        <body>
                            <p class="maintext">Test TikTok Video Title</p>
                            <a class="download_link without_watermark" href="https://example.com/video.mp4">Download Video</a>
                            <a class="download_link music" href="https://example.com/audio.mp3">Download Audio</a>
                        </body>
                    </html>
                `
            };

            mockedAxios.post.mockResolvedValueOnce(mockHtmlResponse);

            const result = await downloader.tiktokDownloader(mockUrl);

            expect(result.status).toBe(200);
            expect(result.result).toBeDefined();
            expect(result.result?.title).toBe('Test TikTok Video Title');
            expect(result.result?.video).toBe('https://example.com/video.mp4');
            expect(result.result?.audio).toBe('https://example.com/audio.mp3');
        });

        it('should handle invalid TikTok URL', async () => {
            const invalidUrl = 'https://invalid-url.com';
            const mockError = new Error('Failed to extract video or title from response.');

            mockedAxios.post.mockRejectedValueOnce(mockError);

            const result = await downloader.tiktokDownloader(invalidUrl);

            expect(result.status).toBe(false);
            expect(result.msg).toBeDefined();
        });
    });

    describe('facebookDownloader', () => {
        it('should successfully download Facebook video', async () => {
            const mockUrl = 'https://www.facebook.com/Add.Aja55/videos/1054552850113076';
            const mockHtmlResponse = {
                data: `
                    <html>
                        <body>
                            <video>
                                <source src="https://example.com/facebook_video.mp4" />
                            </video>
                            <img src="https://example.com/thumbnail.jpg" />
                        </body>
                    </html>
                `
            };

            mockedAxios.post.mockResolvedValueOnce(mockHtmlResponse);

            const result = await downloader.facebookDownloader(mockUrl);

            expect(result.status).toBe(200);
            expect(result.result).toBeDefined();
            expect(result.result?.videoUrl).toBe('https://example.com/facebook_video.mp4');
            expect(result.result?.thumbnail).toBe('https://example.com/thumbnail.jpg');
        });

        it('should handle invalid Facebook URL', async () => {
            const invalidUrl = 'https://invalid-facebook-url.com';
            const mockError = new Error('No video or image found in the response.');

            mockedAxios.post.mockRejectedValueOnce(mockError);

            const result = await downloader.facebookDownloader(invalidUrl);

            expect(result.status).toBe(false);
            expect(result.msg).toBeDefined();
        });
    });

    describe('instagramDownloader', () => {
        it('should successfully download Instagram media', async () => {
            const mockUrl = 'https://www.instagram.com/p/CK0tLXyAzEI/';
            const mockHtmlResponse = {
                data: `
                    <div class="download" id="download">
                        <div class="row">
                            <div class="col-12 col-md-4 download-item mt-3">
                                <div class="download-content">
                                    <div class="media-box">
                                        <img src="https://example.com/preview.jpg" alt="Preview">
                                        <span class="icon icon-downlabel icon-downvid"></span>
                                        <div class="download-bottom">
                                            <a href="https://example.com/download_video.mp4" class="btn download-media flex-center">Download Video</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            };

            mockedAxios.post.mockResolvedValueOnce(mockHtmlResponse);

            const result = await downloader.instagramDownloader(mockUrl);

            expect(result.status).toBe(200);
            expect(result.result).toBeDefined();
            expect(Array.isArray(result.result)).toBe(true);
            expect(result.result?.[0].type).toBe('video');
            expect(result.result?.[0].url).toBe('https://example.com/download_video.mp4');
            expect(result.result?.[0].preview).toBe('https://example.com/preview.jpg');
        });

        it('should handle invalid Instagram URL', async () => {
            const invalidUrl = 'https://invalid-instagram-url.com';
            const mockError = new Error('No media items found in the response.');

            mockedAxios.post.mockRejectedValueOnce(mockError);

            const result = await downloader.instagramDownloader(invalidUrl);

            expect(result.status).toBe(false);
            expect(result.msg).toBeDefined();
        });
    });

    describe('youtubeDownloader', () => {
        it('should successfully download YouTube video', async () => {
            const mockUrl = 'https://youtu.be/H_z0t5NQs7U?si=WnXwRNrNIsdaIERu';
            const mockResponse = {
                data: {
                    text: 'Test YouTube Video',
                    medias: [
                        {
                            media_type: 'video',
                            preview_url: 'https://example.com/thumbnail.jpg',
                            resource_url: 'https://example.com/video.mp4',
                            formats: [
                                { quality: '720', video_url: 'https://example.com/720p.mp4' },
                                { quality: '1080', video_url: 'https://example.com/1080p.mp4' }
                            ]
                        },
                        {
                            media_type: 'audio',
                            resource_url: 'https://example.com/audio.mp3'
                        }
                    ]
                }
            };

            mockedAxios.post.mockResolvedValueOnce(mockResponse);

            const result = await downloader.youtubeDownloader(mockUrl);

            expect(result.status).toBe(200);
            expect(result.result).toBeDefined();
            expect(result.result?.title).toBe('Test YouTube Video');
            expect(result.result?.thumbnail).toBe('https://example.com/thumbnail.jpg');
            expect(result.result?.video).toBe('https://example.com/video.mp4');
            expect(result.result?.audio).toBe('https://example.com/audio.mp3');
        });

        it('should handle invalid YouTube URL', async () => {
            const invalidUrl = 'https://invalid-youtube-url.com';
            const mockError = new Error('Network error');

            mockedAxios.post.mockRejectedValueOnce(mockError);

            const result = await downloader.youtubeDownloader(invalidUrl);

            expect(result.status).toBe(false);
            expect(result.msg).toBeDefined();
        });
    });

    describe('ytMp3Downloader', () => {
        it('should successfully download YouTube MP3', async () => {
            const mockUrl = 'https://youtu.be/H_z0t5NQs7U?si=WnXwRNrNIsdaIERu';


            const mockConversionResponse = {
                data: {
                    success: true,
                    data: {
                        info: {
                            title: 'Test Video',
                            thumbnail: 'https://example.com/thumb.jpg',
                            description: 'Test description',
                            view_count: '1000000'
                        },
                        slug: 'test-slug',
                        size: 5242880
                    }
                }
            };


            const mockPageResponse = {
                headers: {
                    'set-cookie': ['PHPSESSID=test; csrf_cookie_name=test']
                },
                data: 'page content'
            };


            const mockFinalResponse = {
                data: `
                    <html>
                        <body>
                            <div id="download-url" download-href="https://example.com/download.mp3"></div>
                        </body>
                    </html>
                `
            };

            mockedAxios
                .mockResolvedValueOnce(mockConversionResponse)
                .mockResolvedValueOnce(mockPageResponse)
                .mockResolvedValueOnce(mockFinalResponse);

            const result = await downloader.ytMp3Downloader(mockUrl) as {
                status: boolean;
                title: string;
                downloadUrl: string;
                creator: string;
            };

            expect(result.status).toBe(true);
            expect(result.title).toBe('Test Video');
            expect(result.downloadUrl).toBe('https://example.com/download.mp3');
        });

        it('should handle YouTube MP3 download errors', async () => {
            const mockUrl = 'https://youtu.be/invalid';
            const mockError = new Error('Failed to fetch video data');

            mockedAxios.mockRejectedValueOnce(mockError);

            try {
                await downloader.ytMp3Downloader(mockUrl);
            } catch (result) {
                const error = result as { status: boolean; error: string };
                expect(error.status).toBe(false);
                expect(error.error).toBe('Failed to fetch video data');
            }
        });
    });

    describe('sfileDownloader', () => {
        it('should successfully download from Sfile', async () => {
            const mockUrl = 'https://sfile.mobi/8tZaFADE7Ca';
            const mockHtmlResponse = {
                data: `
                    <html>
                        <body>
                            <div class="intro-container">
                                <img alt="Test File.zip" />
                            </div>
                            <div class="list">File Size: 1.5 MB - ZIP Archive
                            </div>
                            <a id="download" href="/download/123">Download</a>
                        </body>
                    </html>
                `
            };

            mockedAxios.get.mockResolvedValueOnce(mockHtmlResponse);

            const result = await downloader.sfileDownloader(mockUrl);

            expect(result.status).toBe(200);
            expect(result.result).toBeDefined();
            expect(result.result?.filename).toBe('Test File.zip');
            expect(result.result?.mimetype).toBe('ZIP Archive');
            expect(result.result?.download).toContain('/download/123');
        });

        it('should handle invalid Sfile URL', async () => {
            const invalidUrl = 'https://invalid-sfile-url.com';
            const mockError = new Error('Network error');

            mockedAxios.get.mockRejectedValueOnce(mockError);

            const result = await downloader.sfileDownloader(invalidUrl);

            expect(result.status).toBe(false);
            expect(result.msg).toBe('Network error');
        });
    });
});
