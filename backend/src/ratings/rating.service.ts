import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating } from './Schema/rating.schema';
import { JwtService } from '@nestjs/jwt';
import { Movies } from 'src/movies/Schema/movies.schema';
import { waitForDebugger } from 'inspector';
import { Auth } from 'src/auth/Schema/auth.schema';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel('Rating') private readonly ratingModel: Model<Rating>,  
    @InjectModel('Auth') private readonly authModel: Model<Auth>,  
     private jwtService: JwtService ,
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
  


  // async getUserRatings(jwtToken: string): Promise<Movies[]> {
  //   try {
  //     const decodedToken = await this.jwtService.verify(jwtToken);
  //     const userId = decodedToken.id;
  
  //     // Find all movies rated by the user
  //     const userRatings = await this.ratingModel
  //       .find({ user: userId })
  //       .select('movie value')
  //       .exec();
  
  //     if (userRatings.length === 0) {
  //       // If the user has not rated any movies, recommend movies with the most stars (highest average rating)
  //       const recommendedMovies = await this.moviesModel
  //         .aggregate([
  //           {
  //             $group: {
  //               _id: '$movie',
  //               averageRating: { $avg: '$value' },
  //             },
  //           },
  //           {
  //             $sort: { averageRating: -1 },
  //           },
  //           {
  //             $limit: 3, // Recommend only 3 movies
  //           },
  //         ])
  //         .exec();
  
  //       // Retrieve the full movie details based on the top-rated movies
  //       return this.moviesModel.find({ _id: { $in: recommendedMovies.map((movie) => movie._id) } }).exec();
  //     } else {
  //       // If the user has rated movies, recommend movies based on their ratings
  //       // Sort user ratings in descending order
  //       userRatings.sort((a, b) => b.value - a.value);
  
  //       // Recommend up to 3 movies based on the user's highest-rated movies
  //       const recommendedMoviesByRating = await this.moviesModel
  //         .find({ _id: { $in: userRatings.map((rating) => rating.movie) } })
  //         .limit(3) // Recommend only 3 movies based on rating
  //         .exec();
  
  //       // Find movies based on user's preferred category
  //       const userCategories = await this.authModel.findById(userId).select('category').exec();
  
  //       // Merge the recommendations based on rating and category
  //       const mergedRecommendations = [
  //         ...recommendedMoviesByRating,
  //         ...(await this.moviesModel
  //           .find({ category: { $in: userCategories.category } })
  //           .limit(3) // Recommend only 3 movies based on category
  //           .exec()),
  //       ];
  
  //       // Remove duplicates from the merged recommendations
  //       const uniqueRecommendations = Array.from(
  //         new Set(mergedRecommendations.map((movie) => movie._id))
  //       ).map((id) => mergedRecommendations.find((movie) => movie._id === id));
  
  //       return uniqueRecommendations;
  //     }
  //   } catch (error) {
  //     console.error('Error getting user ratings:', error);
  //     throw new Error('Unable to get user ratings');
  //   }
  // }
  
































  async getUserRatings(jwtToken: string): Promise<Movies[]> {
    try {
      const decodedToken = await this.jwtService.verify(jwtToken);
      const userId = decodedToken.id;
  
        // Find movies based on user's preferred category
        const userCategories = await this.authModel.findById(userId).select('category').exec();
     let movies=   await this.moviesModel
              .find({ category: { $in: userCategories.category } })
              .limit(3)  // Recommend only 3 movies based on category
              .exec()
        return movies;
      
    } catch (error) {
      console.error('Error getting user ratings:', error);
      throw new Error('Unable to get user ratings');
    }
  }
  
  
  // try {
  //   const decodedToken = await this.jwtService.verify(jwtToken);
  //   const userId = decodedToken.id;

  

    //  // Find movies based on user's preferred category
    //  const userCategories = await this.authModel.findById(userId).select('category').exec();
  
    //  // Merge the recommendations based on rating and category
    //  const mergedRecommendations = [
    //    ...recommendedMoviesByRating,
    //    ...(await this.moviesModel
    //      .find({ category: { $in: userCategories.category } })
    //      .limit(3) // Recommend only 3 movies based on category
    //      .exec()),
    //  ];
  



}
