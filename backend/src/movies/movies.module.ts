import { Module } from '@nestjs/common';
// import { AuthService } from './movies.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

import {  MovieController } from './movies.controller';
import { jwtConstants } from './constants';
import { MoviesService } from './movies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesSchema } from './Schema/movies.schema';
import { JwtStrategy } from 'src/helper/jwt.stretegy';
import { RatingSchema } from 'src/ratings/Schema/rating.schema';
import { RatingModule } from 'src/ratings/rating.module';

@Module({
  imports: [ MongooseModule.forFeature([{ name :'Movies'  , schema : MoviesSchema} , { name :'Rating'  , schema : RatingSchema}]) , RatingModule ],
  providers: [MoviesService ,JwtStrategy],
  controllers: [MovieController],
  exports: [MoviesService],
})
export class MovieModule {}