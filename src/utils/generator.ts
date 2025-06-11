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

    formatFileSize(bytes: number): string {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    }
}
