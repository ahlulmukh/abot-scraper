import { beforeEach, describe, expect, it } from '@jest/globals';
import Search from '../src/scraper/search.js';

describe('Search', () => {
  let search: Search;

  beforeEach(() => {
    search = new Search();
  });

  describe('Class and Method Existence', () => {
    it('should create Search instance successfully', () => {
      expect(search).toBeInstanceOf(Search);
    });

    it('should have all expected search methods', () => {
      expect(typeof search.igStory).toBe('function');
      expect(typeof search.sfileSearch).toBe('function');
      expect(typeof search.ytSearch).toBe('function');
      expect(typeof search.wallpaper).toBe('function');
      expect(typeof search.wikimedia).toBe('function');
    });
  });

  describe('Method Return Types', () => {
    it('igStory should return a Promise', () => {
      const mockUsername = 'testuser';
      const result = search.igStory(mockUsername);
      expect(result).toBeInstanceOf(Promise);
    });

    it('sfileSearch should return a Promise', () => {
      const mockQuery = 'test';
      const result = search.sfileSearch(mockQuery);
      expect(result).toBeInstanceOf(Promise);
    });

    it('ytSearch should return a Promise', () => {
      const mockQuery = 'test music';
      const result = search.ytSearch(mockQuery);
      expect(result).toBeInstanceOf(Promise);
    });

    it('wallpaper should return a Promise', () => {
      const mockTitle = 'nature';
      const result = search.wallpaper(mockTitle);
      expect(result).toBeInstanceOf(Promise);
    });

    it('wikimedia should return a Promise', () => {
      const mockQuery = 'anime';
      const result = search.wikimedia(mockQuery);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('Basic Input Validation', () => {
    it('should handle empty query for ytSearch', async () => {
      const emptyQuery = '';
      const result = await search.ytSearch(emptyQuery);
      expect(result.creator).toBe('@abotscraper – ahmuq');
      expect(result.status).toBeDefined();
    });
  });
});
