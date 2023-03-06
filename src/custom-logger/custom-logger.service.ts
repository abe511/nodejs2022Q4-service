import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { ConsoleLogger } from "@nestjs/common";

// export declare type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose';

@Injectable()
export class CustomLoggerService extends ConsoleLogger implements LoggerService {
    // error(message: any, stack?: string, context?: string) {
    //     super.error(...arguments)
    // }

    /**
     * Write a 'log' level log.
     */
    log(message: any, ...optionalParams: any[]): any {
        super.log(message, ...optionalParams);
    }
    /**
     * Write an 'error' level log.
     */
    error(message: any, ...optionalParams: any[]): any {
        super.error(message, ...optionalParams);
    }
    /**
     * Write a 'warn' level log.
     */
    warn(message: any, ...optionalParams: any[]): any {
        super.warn(message, ...optionalParams);
    }
    /**
     * Write a 'debug' level log.
     */
    debug(message: any, ...optionalParams: any[]): any {}
    /**
     * Write a 'verbose' level log.
     */
    verbose(message: any, ...optionalParams: any[]): any {}
    /**
     * Set log levels.
     * @param levels log levels
     */
    setLogLevels(levels: LogLevel[]): any {}

}
