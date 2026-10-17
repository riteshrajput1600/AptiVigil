import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';
async function bootstrap() { const app=await NestFactory.create(AppModule); app.setGlobalPrefix('api/v1'); app.enableCors({origin:process.env.WEB_ORIGINS?.split(',')??true,credentials:true}); app.useGlobalPipes(new ValidationPipe({whitelist:true,transform:true,forbidNonWhitelisted:true})); const config=new DocumentBuilder().setTitle('AptiVigil API').setDescription('Shared API foundation for the examination and proctoring platform').setVersion('1.0').addBearerAuth().build(); SwaggerModule.setup('api/docs',app,SwaggerModule.createDocument(app,config)); await app.listen(process.env.API_PORT??4000); }
void bootstrap();
