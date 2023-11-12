import { Module } from '@nestjs/common';
// import { AuthService } from './movies.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

import { MongooseModule } from '@nestjs/mongoose';

import { JwtStrategy } from 'src/helper/jwt.stretegy';
import { RatingSchema } from './Schema/rating.schema';
import { RatingsService } from './rating.service';
import { ratingController } from './rating.controller';
import { Movies, MoviesSchema } from 'src/movies/Schema/movies.schema';
import { AuthSchema } from 'src/auth/Schema/auth.schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name :'Rating'  , schema : RatingSchema} , { name :'Movies'  , schema : MoviesSchema } , { name :'Auth'  , schema : AuthSchema}])  , ],
  providers: [RatingsService ,JwtStrategy],
  controllers: [ratingController],
  exports: [RatingsService],
})
export class RatingModule {}