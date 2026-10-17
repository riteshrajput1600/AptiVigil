import 'reflect-metadata';
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import type { NextFunction, Request, Response } from 'express';
import { config as loadDotEnv } from 'dotenv';
import { parseApiEnvironment } from '@aptivigil/config';
import { AppModule } from './modules/app.module';
import { StructuredLogger } from './common/structured-logger';

async function bootstrap() {
  loadDotEnv({ path: resolve(process.cwd(), '../../.env'), quiet: true });
  const environment = parseApiEnvironment();
  const logger = new StructuredLogger();
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(logger);
  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: environment.webOrigins, credentials: true });
  app.use((request: Request, response: Response, next: NextFunction) => {
    const requestId = randomUUID();
    const startedAt = Date.now();
    response.setHeader('X-Request-ID', requestId);
    response.on('finish', () => logger.httpRequest({ requestId, method: request.method, path: request.path, statusCode: response.statusCode, durationMs: Date.now() - startedAt }));
    next();
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
  const config = new DocumentBuilder().setTitle('AptiVigil API').setDescription('Shared API foundation for the examination and proctoring platform').setVersion('1.0').addBearerAuth().build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config));
  await app.listen(environment.API_PORT);
}

void bootstrap().catch((error: unknown) => {
  const detail = error instanceof Error ? error.message : 'Unknown startup error';
  process.stderr.write(`${JSON.stringify({ timestamp: new Date().toISOString(), level: 'fatal', message: 'api.startup.failed', detail })}\n`);
  process.exitCode = 1;
});
