import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel  } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Movies } from './Schema/movies.schema';
import mongoose, { Model } from 'mongoose';
import { Rating, RatingSchema } from 'src/ratings/Schema/rating.schema';

@Injectable()
export class MoviesService {
  constructor( 
    @InjectModel(Movies.name) 
    private jwtService: JwtService ,
    @InjectModel('Rating') private readonly RatingModal: Model<Rating>,
    @InjectModel('Movies') private readonly MoviesModal: Model<Rating>,
   
  // private  :mongoose.Model<Movies>
  ) {}

  async getMovies(jwtToken) {

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
  async getMoviesById(jwtToken: string, movies_id: string) {
    // Your authentication logic here
//  let b= await  this.jwtService.verify(jwtToken)
//     let userId =b.id
console.log(movies_id,'movies_id')
    // Your logic to fetch movie details by ID
    // For now, let's assume you have a MoviesModel with a findById method
    // Replace this with your actual model and method
    const movieDetails = await this.MoviesModal.findById(movies_id);
console.log(movieDetails,'movieDetails')
    // Your logic to fetch ratings for the movie
    const ratings = await this.RatingModal.find({ movie: movies_id });

    // Calculate average sdasdrating
    const totalRatings = ratings.length;
    const sumRatings = ratings.reduce((sum, rating) => sum + rating.value, 0);
    const averageRating = totalRatings === 0 ? 0 : sumRatings / totalRatings;

    return { 
      movieDetails,
      averageRating,
    };
  }

 
}