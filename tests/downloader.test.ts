import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import axios from 'axios';
import Downloader from '../src/scraper/downloader.js';

// Mock axios
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
            const mockUrl = 'https://vt.tiktok.com/ZSk3GxDPo/';
            const mockResponse = {
                data: JSON.stringify({
                    status: true,
                    result: {
                        title: 'Test TikTok Video',
                        video: 'https://example.com/video.mp4',
                        music: 'https://example.com/audio.mp3',
                        thumbnail: 'https://example.com/thumb.jpg'
                    }
                })
            };

            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const result = await downloader.tiktokDownloader(mockUrl);

            expect(result.status).toBe(true);
            expect(result.result).toBeDefined();
            expect(mockedAxios.get).toHaveBeenCalledWith(
                expect.stringContaining('snaptik.app/abc2'),
                expect.any(Object)
            );
        });

        it('should handle invalid TikTok URL', async () => {
            const invalidUrl = 'https://invalid-url.com';

            const result = await downloader.tiktokDownloader(invalidUrl);

            expect(result.status).toBe(false);
            expect(result.msg).toBeDefined();
        });

        it('should handle network errors', async () => {
            const mockUrl = 'https://www.tiktok.com/@officialjimin13/video/7016539716353011973';
            const mockError = new Error('Network error');

            mockedAxios.get.mockRejectedValueOnce(mockError);

            const result = await downloader.tiktokDownloader(mockUrl);

            expect(result.status).toBe(false);
            expect(result.msg).toBe('Network error');
        });
    });

    describe('youtubeDownloader', () => {
        it('should successfully download YouTube video', async () => {
            const mockUrl = 'https://youtu.be/YU7q8SwM_Ls?si=0Y6x3ed57h4FPbw6';
            const mockResponse = {
                data: {
                    formats: [{
                        quality: '720p',
                        video_url: 'https://example.com/video.mp4'
                    }],
                    title: 'Test Video',
                    thumbnail: 'https://example.com/thumb.jpg'
                }
            };

            mockedAxios.post.mockResolvedValueOnce(mockResponse);

            const result = await downloader.youtubeDownloader(mockUrl);

            expect(result.status).toBe(true);
            expect(result.result).toBeDefined();
        });

        it('should handle invalid YouTube URL', async () => {
            const invalidUrl = 'https://invalid-youtube-url.com';

            const result = await downloader.youtubeDownloader(invalidUrl);

            expect(result.status).toBe(false);
            expect(result.msg).toBeDefined();
        });
    });

    describe('instagram', () => {
        it('should successfully download Instagram media', async () => {
            const mockUrl = 'https://www.instagram.com/reel/DJxwKe_zA9E/?igsh=MXRhamhyMHYyYWs5bA==';
            const mockResponse = {
                data: {
                    files: [{
                        __type: 'video',
                        download_url: 'https://example.com/video.mp4'
                    }]
                }
            };

            mockedAxios.post.mockResolvedValueOnce(mockResponse);

            const result = await downloader.instagram(mockUrl);

            expect(result.status).toBe(true);
            expect(result.result).toBeDefined();
        });

        it('should handle invalid Instagram URL', async () => {
            const invalidUrl = 'https://invalid-instagram-url.com';

            const result = await downloader.instagram(invalidUrl);

            expect(result.status).toBe(false);
            expect(result.msg).toBeDefined();
        });
    });

    describe('facebook', () => {
        it('should successfully download Facebook video', async () => {
            const mockUrl = 'https://www.facebook.com/share/v/15sJqGWE6T/';
            const mockHtmlResponse = {
                data: `
          <html>
            <body>
              <script>
                window.__INITIAL_DATA__ = {
                  video: {
                    hd_src: "https://example.com/hd_video.mp4",
                    sd_src: "https://example.com/sd_video.mp4"
                  },
                  title: "Test Facebook Video"
                };
              </script>
            </body>
          </html>
        `
            };

            mockedAxios.get.mockResolvedValueOnce(mockHtmlResponse);

            const result = await downloader.facebook(mockUrl);

            expect(result.status).toBe(true);
            expect(result.result).toBeDefined();
        });

        it('should handle invalid Facebook URL', async () => {
            const invalidUrl = 'https://invalid-facebook-url.com';

            const result = await downloader.facebook(invalidUrl);

            expect(result.status).toBe(false);
            expect(result.msg).toBeDefined();
        });
    });

    describe('igstory', () => {
        it('should successfully fetch Instagram stories', async () => {
            const mockUsername = 'cristiano';
            const mockResponse = {
                data: {
                    stories: [{
                        source: 'https://example.com/story1.jpg'
                    }],
                    user_info: {
                        username: 'cristiano'
                    }
                }
            };

            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const result = await downloader.igstory(mockUsername);

            expect(result.status).toBe(true);
            expect(result.result).toBeDefined();
            expect(result.result?.user_info.username).toBe('testuser');
        });

        it('should handle invalid username', async () => {
            const invalidUsername = '';

            const result = await downloader.igstory(invalidUsername);

            expect(result.status).toBe(false);
            expect(result.msg).toBeDefined();
        });
    });

    describe('sfileDownloader', () => {
        it('should successfully download from Sfile', async () => {
            const mockUrl = 'https://sfile.mobi/123456';
            const mockHtmlResponse = {
                data: `
          <html>
            <body>
              <div class="download-link">
                <a href="https://example.com/download.zip">Download</a>
              </div>
              <h1>Test File</h1>
            </body>
          </html>
        `
            };

            mockedAxios.get.mockResolvedValueOnce(mockHtmlResponse);

            const result = await downloader.sfileDownloader(mockUrl);

            expect(result.status).toBe(true);
            expect(result.result).toBeDefined();
        });

        it('should handle invalid Sfile URL', async () => {
            const invalidUrl = 'https://invalid-sfile-url.com';

            const result = await downloader.sfileDownloader(invalidUrl);

            expect(result.status).toBe(false);
            expect(result.msg).toBeDefined();
        });
    });
});
