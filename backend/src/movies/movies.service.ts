import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel  } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Movies } from './Schema/movies.schema';
import mongoose from 'mongoose';

@Injectable()
export class MoviesService {
  constructor( @InjectModel(Movies.name)
  private MoviesModal :mongoose.Model<Movies>
  ) {}

  async getMovies() {

    // console.log(username,'username')
    // const user = await this.usersService.findOne(username);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    // const payload = { sub: user.userId, username: user.username };
  const books=await this.MoviesModal.find()
  return books
  }


  async postMovies(movies){

    console.log('movies' , movies)
    return this.MoviesModal.create(movies)
  }
}