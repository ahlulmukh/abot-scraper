import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import axios from 'axios';
import Search from '../src/scraper/search.js';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Search', () => {
  let search: Search;

  beforeEach(() => {
    search = new Search();
    jest.clearAllMocks();
  });

  describe('sfileSearch', () => {
    it('should successfully search files on Sfile', async () => {
      const mockQuery = 'test file';
      const mockPage = 1;
      const mockHtmlResponse = {
        data: `
          <html>
            <body>
              <div class="list">
                <div class="entry">
                  <h3><a href="/file/123">Test File 1</a></h3>
                  <div class="description">Test description 1</div>
                  <div class="date">2023-01-01</div>
                  <div class="size">1.5 MB</div>
                </div>
                <div class="entry">
                  <h3><a href="/file/456">Test File 2</a></h3>
                  <div class="description">Test description 2</div>
                  <div class="date">2023-01-02</div>
                  <div class="size">2.5 MB</div>
                </div>
              </div>
            </body>
          </html>
        `
      };

      mockedAxios.get.mockResolvedValueOnce(mockHtmlResponse);

      const result = await search.sfileSearch(mockQuery, mockPage);

      expect(result.status).toBe(true);
      expect(result.result).toBeDefined();
      expect(Array.isArray(result.result)).toBe(true);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://sfile.mobi/search.php?q=${mockQuery}&page=${mockPage}`,
        expect.objectContaining({
          headers: expect.objectContaining({
            'User-Agent': expect.stringContaining('Mozilla'),
            'Referer': 'https://sfile.mobi/'
          })
        })
      );
    });

    it('should handle empty search results', async () => {
      const mockQuery = 'nonexistent file';
      const mockHtmlResponse = {
        data: `
          <html>
            <body>
              <div class="list">
                <!-- No results -->
              </div>
            </body>
          </html>
        `
      };

      mockedAxios.get.mockResolvedValueOnce(mockHtmlResponse);

      const result = await search.sfileSearch(mockQuery);

      expect(result.status).toBe(true);
      expect(result.result).toBeDefined();
      expect(Array.isArray(result.result)).toBe(true);
      expect(result.result?.length).toBe(0);
    });

    it('should handle network errors', async () => {
      const mockQuery = 'test file';
      const mockError = new Error('Network error');

      mockedAxios.get.mockRejectedValueOnce(mockError);

      const result = await search.sfileSearch(mockQuery);

      expect(result.status).toBe(false);
      expect(result.msg).toBe('Network error');
    });

    it('should use default page number when not provided', async () => {
      const mockQuery = 'test file';
      const mockHtmlResponse = { data: '<html><body></body></html>' };

      mockedAxios.get.mockResolvedValueOnce(mockHtmlResponse);

      await search.sfileSearch(mockQuery);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://sfile.mobi/search.php?q=${mockQuery}&page=1`,
        expect.any(Object)
      );
    });
  });

  describe('ytSearch', () => {
    it('should successfully search YouTube videos', async () => {
      const mockQuery = 'test music';
      const mockResponse = {
        data: {
          status: true,
          results: [
            {
              title: 'Test Music Video 1',
              url: 'https://www.youtube.com/watch?v=abc123',
              thumbnail: 'https://img.youtube.com/vi/abc123/maxresdefault.jpg',
              duration: '3:45',
              views: '1M views',
              published: '1 day ago'
            },
            {
              title: 'Test Music Video 2',
              url: 'https://www.youtube.com/watch?v=def456',
              thumbnail: 'https://img.youtube.com/vi/def456/maxresdefault.jpg',
              duration: '4:12',
              views: '500K views',
              published: '2 days ago'
            }
          ]
        }
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await search.ytSearch(mockQuery);

      expect(result.status).toBe(true);
      expect(result.result).toBeDefined();
      expect(Array.isArray(result.result)).toBe(true);
      expect(result.result?.length).toBeGreaterThan(0);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('youtube-search-api'),
        expect.objectContaining({
          params: expect.objectContaining({
            q: mockQuery
          })
        })
      );
    });

    it('should handle empty search query', async () => {
      const emptyQuery = '';

      const result = await search.ytSearch(emptyQuery);

      expect(result.status).toBe(false);
      expect(result.msg).toBeDefined();
    });

    it('should handle API errors', async () => {
      const mockQuery = 'test music';
      const mockError = new Error('API error');

      mockedAxios.get.mockRejectedValueOnce(mockError);

      const result = await search.ytSearch(mockQuery);

      expect(result.status).toBe(false);
      expect(result.msg).toBe('API error');
    });
  });

  describe('wallpaper', () => {
    it('should successfully search wallpapers', async () => {
      const mockTitle = 'nature';
      const mockPage = '1';
      const mockHtmlResponse = {
        data: `
          <html>
            <body>
              <div class="wallpaper-grid">
                <div class="wallpaper-item">
                  <a href="/wallpaper/123">
                    <img src="https://example.com/thumb1.jpg" alt="Nature Wallpaper 1">
                  </a>
                  <h3>Nature Wallpaper 1</h3>
                </div>
                <div class="wallpaper-item">
                  <a href="/wallpaper/456">
                    <img src="https://example.com/thumb2.jpg" alt="Nature Wallpaper 2">
                  </a>
                  <h3>Nature Wallpaper 2</h3>
                </div>
              </div>
            </body>
          </html>
        `
      };

      mockedAxios.get.mockResolvedValueOnce(mockHtmlResponse);

      const result = await search.wallpaper(mockTitle, mockPage);

      expect(result.status).toBe(true);
      expect(result.result).toBeDefined();
      expect(Array.isArray(result.result)).toBe(true);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('besthdwallpaper.com')
      );
    });

    it('should handle empty search results', async () => {
      const mockTitle = 'nonexistent';
      const mockHtmlResponse = {
        data: `
          <html>
            <body>
              <div class="wallpaper-grid">
                <!-- No results -->
              </div>
            </body>
          </html>
        `
      };

      mockedAxios.get.mockResolvedValueOnce(mockHtmlResponse);

      const result = await search.wallpaper(mockTitle);

      expect(result.status).toBe(true);
      expect(result.result).toBeDefined();
      expect(Array.isArray(result.result)).toBe(true);
    });

    it('should use default page when not provided', async () => {
      const mockTitle = 'nature';
      const mockHtmlResponse = { data: '<html><body></body></html>' };

      mockedAxios.get.mockResolvedValueOnce(mockHtmlResponse);

      await search.wallpaper(mockTitle);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('CurrentPage=1')
      );
    });

    it('should handle network errors', async () => {
      const mockTitle = 'nature';
      const mockError = new Error('Network error');

      mockedAxios.get.mockRejectedValueOnce(mockError);

      const result = await search.wallpaper(mockTitle);

      expect(result.status).toBe(false);
      expect(result.msg).toBe('Network error');
    });
  });
});
