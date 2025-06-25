import { beforeEach, describe, expect, it } from '@jest/globals';
import Generator from '../src/utils/generator.js';

describe('Generator', () => {
    let generator: Generator;

    beforeEach(() => {
        generator = new Generator();
    });

    describe('generateTimeStampYoutubeDL', () => {
        it('should generate a timestamp string', () => {
            const timestamp = generator.generateTimeStampYoutubeDL();

            expect(typeof timestamp).toBe('string');
            expect(timestamp).toMatch(/^\d+$/);
            expect(parseInt(timestamp)).toBeGreaterThan(0);
        });

        it('should generate different timestamps when called multiple times', async () => {
            const timestamp1 = generator.generateTimeStampYoutubeDL();


            await new Promise(resolve => setTimeout(resolve, 1));
            const timestamp2 = generator.generateTimeStampYoutubeDL();

            expect(timestamp1).not.toBe(timestamp2);
            expect(parseInt(timestamp2)).toBeGreaterThanOrEqual(parseInt(timestamp1));
        });

        it('should generate timestamp close to current time', () => {
            const beforeTime = Date.now();
            const timestamp = generator.generateTimeStampYoutubeDL();
            const afterTime = Date.now();

            const timestampNum = parseInt(timestamp);
            expect(timestampNum).toBeGreaterThanOrEqual(beforeTime);
            expect(timestampNum).toBeLessThanOrEqual(afterTime);
        });
    });

    describe('generateFooterYoutubeDL', () => {
        it('should generate MD5 hash footer', () => {
            const timestamp = '1234567890';
            const link = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

            const footer = generator.generateFooterYoutubeDL(timestamp, link);

            expect(typeof footer).toBe('string');
            expect(footer).toHaveLength(32);
            expect(footer).toMatch(/^[a-f0-9]{32}$/);
        });

        it('should generate consistent hash for same inputs', () => {
            const timestamp = '1234567890';
            const link = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

            const footer1 = generator.generateFooterYoutubeDL(timestamp, link);
            const footer2 = generator.generateFooterYoutubeDL(timestamp, link);

            expect(footer1).toBe(footer2);
        });

        it('should generate different hash for different inputs', () => {
            const timestamp1 = '1234567890';
            const timestamp2 = '1234567891';
            const link = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

            const footer1 = generator.generateFooterYoutubeDL(timestamp1, link);
            const footer2 = generator.generateFooterYoutubeDL(timestamp2, link);

            expect(footer1).not.toBe(footer2);
        });

        it('should handle different link inputs', () => {
            const timestamp = '1234567890';
            const link1 = 'https://www.youtube.com/watch?v=abc123';
            const link2 = 'https://www.youtube.com/watch?v=def456';

            const footer1 = generator.generateFooterYoutubeDL(timestamp, link1);
            const footer2 = generator.generateFooterYoutubeDL(timestamp, link2);

            expect(footer1).not.toBe(footer2);
        });
    });

    describe('formatFileSize', () => {
        it('should format 0 bytes', () => {
            const result = generator.formatFileSize(0);
            expect(result).toBe('0 Bytes');
        });

        it('should format bytes correctly', () => {
            expect(generator.formatFileSize(512)).toBe('512 Bytes');
            expect(generator.formatFileSize(1000)).toBe('1000 Bytes');
        });

        it('should format kilobytes correctly', () => {
            expect(generator.formatFileSize(1024)).toBe('1 KB');
            expect(generator.formatFileSize(1536)).toBe('1.5 KB');
            expect(generator.formatFileSize(2048)).toBe('2 KB');
        });

        it('should format megabytes correctly', () => {
            expect(generator.formatFileSize(1024 * 1024)).toBe('1 MB');
            expect(generator.formatFileSize(1024 * 1024 * 2.5)).toBe('2.5 MB');
            expect(generator.formatFileSize(1024 * 1024 * 10)).toBe('10 MB');
        });

        it('should format gigabytes correctly', () => {
            expect(generator.formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
            expect(generator.formatFileSize(1024 * 1024 * 1024 * 2.75)).toBe('2.75 GB');
        });

        it('should format terabytes correctly', () => {
            expect(generator.formatFileSize(1024 * 1024 * 1024 * 1024)).toBe('1 TB');
            expect(generator.formatFileSize(1024 * 1024 * 1024 * 1024 * 1.5)).toBe('1.5 TB');
        });

        it('should handle decimal precision', () => {
            const result = generator.formatFileSize(1536);
            expect(result).toBe('1.5 KB');

            const result2 = generator.formatFileSize(1234567);
            expect(result2).toBe('1.18 MB');
        });

        it('should handle large numbers', () => {
            const veryLargeNumber = Math.pow(1024, 4) * 2;
            const result = generator.formatFileSize(veryLargeNumber);


            expect(typeof result).toBe('string');
            expect(result).toContain('TB');
        });

        it('should handle negative numbers gracefully', () => {

            const result = generator.formatFileSize(-1024);
            expect(typeof result).toBe('string');
        });
    });
});
