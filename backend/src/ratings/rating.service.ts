import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating } from './Schema/rating.schema';
import { JwtService } from '@nestjs/jwt';
import { Movies } from 'src/movies/Schema/movies.schema';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel('Rating') private readonly ratingModel: Model<Rating>
 ,   private jwtService: JwtService ,
 @InjectModel('Movies') private readonly moviesModel: Model<Movies>

  ) {}

 






  async updateRating( jwt , rateDto): Promise<any> {

  let b= await  this.jwtService.verify(jwt)
  console.log(rateDto,'body')

    const existingRating = await this.ratingModel.findOne({ user: b.id, movie: rateDto.movie }).exec();
    
    if (existingRating) {
      existingRating.value = rateDto.value;
       await existingRating.save();
       return await this.ratingModel.findById(existingRating._id)
       .populate('user')
       .populate('movie')
       .exec();
    } else {
      const newRating = new this.ratingModel({
        user: b.id,
        movie: rateDto.movie,
        value :parseInt(rateDto.value) ,
      });
     let sb=  await newRating.save();
     console.log(sb._id,'sb._id')
     return await this.ratingModel.findById(sb._id)
     .populate('user')
     .populate('movie')
     .exec();
    }
  }
  





 







  async getUserRatings(jwtToken: string): Promise<Movies[]> {

    let b= await  this.jwtService.verify(jwtToken)
    let userId =b.id
    // console.log(rateDto,'body')
    // Find all movies rated by the user
    const userRatings = await this.ratingModel
      .find({ user: userId })
      .select('movie value')
      .exec();
  
    if (userRatings.length === 0) {
      // If the user has not rated any movies, recommend movies with the most stars (highest average rating)
      const topRatedMovies = await this.moviesModel
        .aggregate([
          {
            $group: {
              _id: '$movie',
              averageRating: { $avg: '$value' },
            },
          },
          {
            $sort: { averageRating: -1 },
          },
          {
            $limit: 3, // Recommend only 3 movies
          },
        ])
        .exec();
  
      // Retrieve the full movie details based on the top-rated movies
      const recommendedMovies = await this.moviesModel
        .find({ _id: { $in: topRatedMovies.map((movie) => movie._id) } })
        .exec();
  
      return recommendedMovies;
    } else {
      // If the user has rated movies, recommend movies based on their ratings
      // Sort user ratings in descending order
      userRatings.sort((a, b) => b.value - a.value);
  
      // Recommend up to 3 movies based on the user's highest-rated movies
      const recommendedMovies = await this.moviesModel
        .find({ _id: { $in: userRatings.map((rating) => rating.movie) } })
        .limit(3) // Recommend only 3 movies
        .exec();
  
      return recommendedMovies;
    }
  }
  
}