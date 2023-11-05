import { Module } from '@nestjs/common';
import { AppController} from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { MovieModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingModule } from './ratings/rating.module';
// import { MongooseModule } from '@nestjs/mongoose';
// import { env } from 'process';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal:true
  }) ,MongooseModule.forRoot('mongodb://127.0.0.1:27017/faizan'),
  AuthModule ,
  MovieModule ,
  RatingModule
],
  controllers: [AppController],
  providers: [AppService   ],
})
export class AppModule {}
