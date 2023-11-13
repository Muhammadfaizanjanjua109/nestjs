import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

// import { CorsModule } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = express();
  expressApp.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
  
  // Use the express application as middleware in NestJS
  app.use(expressApp);
  
 
  app.enableCors({
    origin:'*'
  });
  await app.listen(3008);



}
bootstrap();
