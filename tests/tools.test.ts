import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import axios from 'axios';
import Tools from '../src/scraper/tools.js';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Tools', () => {
    let tools: Tools;

    beforeEach(() => {
        tools = new Tools();
        jest.clearAllMocks();
    });

    describe('uploadImage', () => {
        it('should successfully upload image to catbox.moe', async () => {
            const mockBuffer = Buffer.from('fake image data');
            const mockResponse = {
                data: 'https://files.catbox.moe/abc123.jpg'
            };

            mockedAxios.post.mockResolvedValueOnce(mockResponse);

            const result = await tools.uploadImage(mockBuffer) as {
                creator: string;
                status: boolean;
                result: string;
            };

            expect(result).toEqual({
                creator: '@abotscraper – ahmuq',
                status: true,
                result: 'https://files.catbox.moe/abc123.jpg'
            });

            expect(mockedAxios.post).toHaveBeenCalledWith(
                'https://catbox.moe/user/api.php',
                expect.any(Object),
                expect.objectContaining({
                    headers: expect.any(Object)
                })
            );
        });

        it('should handle upload errors', async () => {
            const mockBuffer = Buffer.from('fake image data');
            const mockError = new Error('Network error');

            mockedAxios.post.mockRejectedValueOnce(mockError);

            try {
                await tools.uploadImage(mockBuffer);
            } catch (result) {
                const error = result as { creator: string; status: boolean; error: string };
                expect(error).toEqual({
                    creator: '@abotscraper – ahmuq',
                    status: false,
                    error: 'Network error'
                });
            }
        });
    });

    describe('Method Existence', () => {
        it('should have all expected methods', () => {
            expect(typeof tools.uploadImage).toBe('function');
            expect(typeof tools.removeBackground).toBe('function');
            expect(typeof tools.reminiV1).toBe('function');
            expect(typeof tools.reminiV2).toBe('function');
        });

        it('should create tools instance successfully', () => {
            expect(tools).toBeInstanceOf(Tools);
        });
    });
});
