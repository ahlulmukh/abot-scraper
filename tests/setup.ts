
import { jest } from '@jest/globals';


jest.setTimeout(30000);


global.console = {
    ...console,
    error: jest.fn(),
    warn: jest.fn(),
    log: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
};

global.creator = '@abotscraper – ahmuq';
