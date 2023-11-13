import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingModule } from './ratings/rating.module';
import { StaticAssetsMiddleware } from './middlewares/static-assets.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/faizan'),
    AuthModule,
    MovieModule,
    RatingModule,
      ServeStaticModule.forRoot({
   serveRoot: '/uploads',
   rootPath: join(__dirname, '..', 'uploads'),
  })
  ],

  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply the static assets middleware to serve uploaded images
    consumer.apply(StaticAssetsMiddleware).forRoutes('*');
  }
}
