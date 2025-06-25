import { describe, expect, it } from '@jest/globals';
import defaultExport, { Downloader, Search, Tools, downloader, search, tools } from '../src/index.js';

describe('Index exports', () => {
    describe('Default export', () => {
        it('should export default object with instances', () => {
            expect(defaultExport).toBeDefined();
            expect(defaultExport.downloader).toBeDefined();
            expect(defaultExport.search).toBeDefined();
            expect(defaultExport.tools).toBeDefined();

            expect(defaultExport.downloader).toBeInstanceOf(Downloader);
            expect(defaultExport.search).toBeInstanceOf(Search);
            expect(defaultExport.tools).toBeInstanceOf(Tools);
        });
    });

    describe('Named exports', () => {
        it('should export class constructors', () => {
            expect(Downloader).toBeDefined();
            expect(Search).toBeDefined();
            expect(Tools).toBeDefined();

            expect(typeof Downloader).toBe('function');
            expect(typeof Search).toBe('function');
            expect(typeof Tools).toBe('function');
        });

        it('should export instances', () => {
            expect(downloader).toBeDefined();
            expect(search).toBeDefined();
            expect(tools).toBeDefined();

            expect(downloader).toBeInstanceOf(Downloader);
            expect(search).toBeInstanceOf(Search);
            expect(tools).toBeInstanceOf(Tools);
        });

        it('should export same instances as default export', () => {
            expect(downloader).toBe(defaultExport.downloader);
            expect(search).toBe(defaultExport.search);
            expect(tools).toBe(defaultExport.tools);
        });
    });

    describe('Class instantiation', () => {
        it('should be able to create new instances', () => {
            const newDownloader = new Downloader();
            const newSearch = new Search();
            const newTools = new Tools();

            expect(newDownloader).toBeInstanceOf(Downloader);
            expect(newSearch).toBeInstanceOf(Search);
            expect(newTools).toBeInstanceOf(Tools);


            expect(newDownloader).not.toBe(downloader);
            expect(newSearch).not.toBe(search);
            expect(newTools).not.toBe(tools);
        });
    });
});
