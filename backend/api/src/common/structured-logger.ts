import { Injectable, LoggerService } from '@nestjs/common';

type Level = 'log' | 'error' | 'warn' | 'debug' | 'verbose' | 'fatal';

@Injectable()
export class StructuredLogger implements LoggerService {
  log(message: unknown, context?: string) { this.write('info', message, context); }
  error(message: unknown, _trace?: string, context?: string) { this.write('error', message, context); }
  warn(message: unknown, context?: string) { this.write('warn', message, context); }
  debug(message: unknown, context?: string) { this.write('debug', message, context); }
  verbose(message: unknown, context?: string) { this.write('trace', message, context); }
  fatal(message: unknown, context?: string) { this.write('fatal', message, context); }

  httpRequest(fields: { requestId: string; method: string; path: string; statusCode: number; durationMs: number }) {
    this.emit('info', 'http.request.completed', fields);
  }

  private write(level: Level | 'trace' | 'info', message: unknown, context?: string) {
    // Serialize only a string message and known context; omit arbitrary objects and payloads.
    this.emit(level === 'log' ? 'info' : level, typeof message === 'string' ? message : '[non-string log message omitted]', context ? { context } : {});
  }

  private emit(level: string, message: string, fields: Record<string, string | number> = {}) {
    const line = JSON.stringify({ timestamp: new Date().toISOString(), level, message, ...fields });
    (level === 'error' || level === 'fatal' ? process.stderr : process.stdout).write(`${line}\n`);
  }
}
