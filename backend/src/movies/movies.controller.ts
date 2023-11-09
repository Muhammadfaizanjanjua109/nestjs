
import { Body, Controller,Param, HttpCode, HttpStatus, Get  ,Post, UseGuards ,Req} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movies } from './Schema/movies.schema';
import {  CreateMoviesDTO } from './dto/createMovieDTO';
import { AuthGuard } from '@nestjs/passport';

@Controller('movies')
export class MovieController {
  constructor(private moviesService:MoviesService ) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMovies(
    @Req() request: Request,
  ) {
    const token = (request.headers as any).authorization; // Your token here
    const tokenParts = token.split(" "); // Split the string by space
    const jwtToken = tokenParts[1]; 
    return this.moviesService.getMovies(jwtToken);
  }


  // @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard('jwt'))
  // @Get('detail')
  // async getMoviesbyid(
  //   @Req() request: Request,
  //   @Param('id') movie: string,
  // ) {
  //   const token = (request.headers as any).authorization; // Your token here
  //   const tokenParts = token.split(" "); // Split the string by space
  //   const jwtToken = tokenParts[1]; 
  //   console.log(movie,'movie_id from controller' )
  //   return this.moviesService.getMoviesById(jwtToken ,movie);
  // }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')  // Make sure the parameter name matches the route parameter name
  async getMoviesbyid(
    @Req() request: Request,
    @Param('id') movieId: string,  // Corrected variable name to movieId
  ) {
    const token = (request.headers as any).authorization;
    const tokenParts = token.split(" ");
    const jwtToken = tokenParts[1]; 
    console.log(movieId, 'movie_id from controller');  // Corrected variable name to movieId
    return this.moviesService.getMoviesById(jwtToken, movieId);  // Corrected variable name to movieId
  }





  @Post()
 async postMovies(
@Body() 
movies : CreateMoviesDTO ,
) {
    return this.moviesService.postMovies(movies);
  }
}