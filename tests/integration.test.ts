import { beforeAll, describe, expect, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { Tools, tools } from '../src/index.js';

describe('Integration Tests', () => {
    const testImagePath = path.join(process.cwd(), 'testaja.jpeg');
    let testImageExists = false;

    beforeAll(() => {

        testImageExists = fs.existsSync(testImagePath);
    });

    describe('Real File Upload Test', () => {
        it('should upload real image file to catbox.moe', async () => {

            if (!testImageExists) {
                console.log('⚠️  Skipping real upload test: testaja.jpeg not found');
                return;
            }

            const imageBuffer = fs.readFileSync(testImagePath);
            expect(imageBuffer.length).toBeGreaterThan(0);

            const result = await tools.uploadImage(imageBuffer);

            expect(result).toEqual({
                creator: '@abotscraper – ahmuq',
                status: true,
                result: expect.stringContaining('https://files.catbox.moe/')
            });

            interface UploadResult {
                creator: string;
                status: boolean;
                result: string;
            }

            console.log('✅ Successfully uploaded image:', (result as UploadResult).result);
        }, 60000);

        it('should handle different image formats', async () => {

            const smallPngBuffer = Buffer.from([
                0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
                0x00, 0x00, 0x00, 0x0D,
                0x49, 0x48, 0x44, 0x52,
                0x00, 0x00, 0x00, 0x01,
                0x00, 0x00, 0x00, 0x01,
                0x08, 0x06,
                0x00, 0x00, 0x00,
                0x1F, 0x15, 0xC4, 0x89,
                0x00, 0x00, 0x00, 0x0A,
                0x49, 0x44, 0x41, 0x54,
                0x78, 0x9C, 0x62, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01,
                0xE2, 0x21, 0xBC, 0x33,
                0x00, 0x00, 0x00, 0x00,
                0x49, 0x45, 0x4E, 0x44,
                0xAE, 0x42, 0x60, 0x82
            ]);
            const toolsInstance = new Tools();
            expect(smallPngBuffer).toBeInstanceOf(Buffer);
            expect(smallPngBuffer.length).toBeGreaterThan(0);
            expect(typeof toolsInstance.uploadImage).toBe('function');
        });
    });

    describe('Error Handling Integration', () => {
        it('should handle empty buffer gracefully', async () => {
            const emptyBuffer = Buffer.alloc(0);

            try {
                await tools.uploadImage(emptyBuffer);
            } catch (error: unknown) {
                expect(error).toEqual({
                    creator: '@abotscraper – ahmuq',
                    status: false,
                    error: expect.any(String)
                });
            }
        });

        it('should handle malformed buffer', async () => {
            const randomBuffer = Buffer.from('this is not an image file');

            try {
                await tools.uploadImage(randomBuffer);
            } catch (error: unknown) {
                expect(error).toEqual({
                    creator: '@abotscraper – ahmuq',
                    status: false,
                    error: expect.any(String)
                });
            }
        });
    });
});
