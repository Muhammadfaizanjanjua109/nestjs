
import { Body, Controller, HttpCode, HttpStatus, Get  ,Post, UseGuards} from '@nestjs/common';
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
  getMovies() {
    return this.moviesService.getMovies();
  }



  @Post()
 async postMovies(
@Body() 
movies : CreateMoviesDTO ,
) {
    return this.moviesService.postMovies(movies);
  }
}