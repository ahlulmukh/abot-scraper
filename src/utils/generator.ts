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

    private static generateVisitorId(): string {
        const components = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            '1920x1080',
            new Date().getTimezoneOffset().toString(),
            'en-US',
            'Win32',
            Math.random().toString(36).substring(2, 15),
            Date.now().toString(),
            process.pid.toString(),
            Math.floor(Math.random() * 1000000).toString()
        ];
        const fingerprint = crypto.createHash('md5')
            .update(components.join('|'))
            .digest('hex');
        return fingerprint;
    }

    static getFingerprint(): string {
        const visitorId = this.generateVisitorId();
        return visitorId;
    }
}
