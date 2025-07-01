import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import {
    ApiResponse,
    InstagramStoriesResult,
    SfileSearchResult,
    WallpaperResult,
    WikimediaResult,
    YtPlayResult,
    YtSearchResult,
} from '../../types/index.js';

declare global {
    // eslint-disable-next-line no-var
    var creator: string;
}

interface StoryItem {
    source: string;
    [key: string]: unknown;
}

interface InstagramApiResponse {
    stories: StoryItem[];
    user_info: {
        username: string;
        [key: string]: unknown;
    };
}

global.creator = '@abotscraper – ahmuq';

interface YtPlayConfig {
    k_query: string;
    k_page: string;
    q_auto: number;
    hl?: string;
}

interface ConvertConfig {
    vid: string;
    k: string;
}

export default class Search {
    async igStory(username: string): Promise<ApiResponse<InstagramStoriesResult>> {
        const payload = {
            username: username,
        }
        const headers = {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9,ar;q=0.8,id;q=0.7,vi;q=0.6',
            'content-type': 'application/json',
            priority: 'u=1, i',
            'sec-ch-ua':
                '"Microsoft Edge";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            Referer: 'https://storyviewer.com/',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
        };
        try {
            const response: AxiosResponse = await axios.post(
                `https://storyviewer.com/api/data`,
                payload,
                { headers }
            );

            const data: InstagramApiResponse = response.data;
            const sources = data.stories.map((story: StoryItem) => story.source);

            return {
                creator: global.creator,
                status: 200,
                result: {
                    user_info: data.user_info,
                    links: sources,
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


    async sfileSearch(
        query: string,
        page: number = 1
    ): Promise<ApiResponse<SfileSearchResult[]>> {
        try {
            const response: AxiosResponse = await axios.get(
                `https://sfile.mobi/search.php?q=${query}&page=${page}`,
                {
                    headers: {
                        'User-Agent':
                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                        Referer: 'https://sfile.mobi/',
                        'Accept-Language': 'en-US,en;q=0.9',
                    },
                }
            );
            const $ = cheerio.load(response.data);
            const results: SfileSearchResult[] = [];

            $('div.list').each(function () {
                const title = $(this).find('a').text();
                const sizeText = $(this).text().trim().split('(')[1];
                const link = $(this).find('a').attr('href');

                if (link && sizeText) {
                    results.push({
                        title,
                        size: sizeText.replace(')', ''),
                        link
                    });
                }
            });

            return {
                creator: global.creator,
                status: 200,
                result: results,
            };
        } catch (error) {
            return {
                creator: global.creator,
                status: false,
                msg: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    async ytSearch(query: string): Promise<ApiResponse<YtSearchResult[]>> {
        try {
            const headers = {
                accept: "*/*",
                "accept-language": "en-US,en;q=0.9,ar;q=0.8,id;q=0.7,vi;q=0.6",
                priority: "u=1, i",
                "sec-ch-ua":
                    '"Microsoft Edge";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
            }
            const response: AxiosResponse = await axios.get(
                `https://line.1010diy.com/web/free-mp3-finder/query?q=${encodeURIComponent(query)}&type=youtube&pageToken=`,
                { headers }
            );

            const data = response.data;
            const videos = data?.data?.items || [];
            const results: YtSearchResult[] = videos.map((item: {
                title: string;
                thumbnail: string;
                url: string;
            }) => ({
                title: item.title,
                thumbnail: item.thumbnail,
                url: item.url
            }));

            return {
                creator: global.creator,
                status: 200,
                result: results,
            };
        } catch (error) {
            return {
                creator: global.creator,
                status: false,
                msg: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    ytPlay = (text: string): Promise<ApiResponse<YtPlayResult>> => {
        return new Promise((resolve, reject) => {
            const configd: YtPlayConfig = {
                k_query: text,
                k_page: 'mp3',
                q_auto: 1,
            };

            const headerss = {
                'sec-ch-ua':
                    '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
                'user-agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                Cookie:
                    'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}',
            };

            axios('https://www.y2mate.com/mates/analyzeV2/ajax', {
                method: 'POST',
                data: new URLSearchParams(Object.entries(configd)),
                headers: headerss,
            })
                .then(({ data }) => {
                    const v = data.vitems;
                    const v2 = v[Math.floor(Math.random() * v.length)].v;
                    const url = 'https://www.youtube.com/watch?v=' + v2;

                    const config: YtPlayConfig = {
                        k_query: 'https://www.youtube.be/' + url,
                        k_page: 'mp3',
                        hl: 'en',
                        q_auto: 1,
                    };


                    axios('https://www.y2mate.com/mates/en68/analyze/ajax', {
                        method: 'POST',
                        data: new URLSearchParams({
                            url: 'https://www.youtube.be/' + url,
                            q_auto: '0',
                            ajax: '1',
                        }),
                        headers: headerss,
                    }).then(({ data }) => {
                        const $ = cheerio.load(data.result);
                        const img = $('div.thumbnail.cover > a > img').attr('src');

                        axios('https://www.y2mate.com/mates/analyzeV2/ajax', {
                            method: 'POST',
                            data: new URLSearchParams(Object.entries(config)),
                            headers: headerss,
                        }).then(({ data }) => {
                            const convertConfig: ConvertConfig = {
                                vid: data.vid,
                                k: data.links.mp3.mp3128.k,
                            };

                            const size = data.links.mp3.mp3128.size;

                            axios('https://www.y2mate.com/mates/convertV2/index', {
                                method: 'POST',
                                data: new URLSearchParams(Object.entries(convertConfig)),
                                headers: headerss,
                            })
                                .then((response) => {
                                    resolve({
                                        creator: global.creator,
                                        status: 200,
                                        result: {
                                            status: response.data.status,
                                            title: response.data.title,
                                            ftype: response.data.ftype,
                                            thumb: img || '',
                                            size_mp3: size,
                                            link: response.data.dlink,
                                        },
                                    });
                                })
                                .catch(reject);
                        });
                    });
                })
                .catch(reject);
        });
    };

    wallpaper = (
        title: string,
        page: string = '1'
    ): Promise<ApiResponse<WallpaperResult[]>> => {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `https://www.besthdwallpaper.com/search?CurrentPage=${page}&q=${title}`
                )
                .then(({ data }) => {
                    const $ = cheerio.load(data);
                    const hasil: WallpaperResult[] = [];

                    $('div.grid-item').each(function (_, b) {
                        const titleAttr = $(b).find('p[title]').attr('title');
                        const typeText = $(b).find('div.info > a:nth-child(2)').text();
                        const hrefAttr = $(b).find('a').attr('href');
                        const imgSrc = $(b).find('picture > img').attr('src');
                        const srcset1 = $(b)
                            .find('picture > source:nth-child(1)')
                            .attr('srcset');
                        const srcset2 = $(b)
                            .find('picture > source:nth-child(2)')
                            .attr('srcset');

                        if (titleAttr && hrefAttr) {
                            hasil.push({
                                title: titleAttr.trim(),
                                type: typeText?.trim() || '',
                                source: 'https://www.besthdwallpaper.com' + hrefAttr,
                                image: [imgSrc || '', srcset1 || '', srcset2 || ''],
                            });
                        }
                    });

                    resolve({ creator: global.creator, status: 200, result: hasil });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    wikimedia = (title: string): Promise<ApiResponse<WikimediaResult[]>> => {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `https://commons.wikimedia.org/w/index.php?search=${title}&title=Special:MediaSearch&go=Go&type=image`
                )
                .then((res) => {
                    const $ = cheerio.load(res.data);
                    const hasil: WikimediaResult[] = [];

                    $('.sdms-search-results__list-wrapper > div > a').each(function (
                        _,
                        b
                    ) {
                        const altText = $(b).find('img').attr('alt');
                        const href = $(b).attr('href');
                        const dataSrc = $(b).find('img').attr('data-src');
                        const src = $(b).find('img').attr('src');

                        if (altText && href) {
                            hasil.push({
                                title: altText,
                                source: href,
                                image: dataSrc || src || '',
                            });
                        }
                    });

                    resolve({ creator: global.creator, status: 200, result: hasil });
                })
                .catch(reject);
        });
    };
}
