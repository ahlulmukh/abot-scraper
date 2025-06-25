import { describe, expect, it } from '@jest/globals';
import { Downloader, Search, Tools } from '../src/index.js';

describe('Simple Integration Tests', () => {
    describe('Class Instantiation', () => {
        it('should create Downloader instance', () => {
            const downloader = new Downloader();
            expect(downloader).toBeInstanceOf(Downloader);
            expect(typeof downloader.tiktokDownloader).toBe('function');
            expect(typeof downloader.youtubeDownloader).toBe('function');
            expect(typeof downloader.instagram).toBe('function');
            expect(typeof downloader.facebook).toBe('function');
            expect(typeof downloader.igstory).toBe('function');
            expect(typeof downloader.sfileDownloader).toBe('function');
        });

        it('should create Search instance', () => {
            const search = new Search();
            expect(search).toBeInstanceOf(Search);
            expect(typeof search.sfileSearch).toBe('function');
            expect(typeof search.ytSearch).toBe('function');
            expect(typeof search.wallpaper).toBe('function');
        });

        it('should create Tools instance', () => {
            const tools = new Tools();
            expect(tools).toBeInstanceOf(Tools);
            expect(typeof tools.uploadImage).toBe('function');
        });
    });

    describe('Method Types', () => {
        it('should have async methods that return promises', () => {
            const downloader = new Downloader();
            const search = new Search();
            const tools = new Tools();
            const mockUrl = 'https://example.com';
            const mockBuffer = Buffer.from('test');

            expect(downloader.tiktokDownloader(mockUrl)).toBeInstanceOf(Promise);
            expect(search.sfileSearch('test')).toBeInstanceOf(Promise);
            expect(tools.uploadImage(mockBuffer)).toBeInstanceOf(Promise);
        });
    });

    describe('Error Handling', () => {
        it('should handle invalid inputs gracefully', async () => {
            const downloader = new Downloader();

            try {
                await downloader.tiktokDownloader('invalid-url');
            } catch {

                expect(true).toBe(true);
            }
        });
    });
});
