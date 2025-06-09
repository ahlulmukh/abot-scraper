import crypto from 'crypto';

export default class Generator {
    generateTimeStampYoutubeDL(): string {
        return Date.now().toString();
    }

    generateFooterYoutubeDL(timestamp: string, link: string): string {
        const locale = 'en';
        const secretKey = '6HTugjCXxR';
        const input = link + locale + timestamp + secretKey;
        const hash = crypto.createHash('md5').update(input).digest('hex');
        return hash;
    }
}
