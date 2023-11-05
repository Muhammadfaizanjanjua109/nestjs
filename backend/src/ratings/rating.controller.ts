import { Body, Controller, Get, Param, Put, Req, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport";
import { RateDto } from "./dto/rating.dto";
import { Rating } from "./Schema/rating.schema";
import { RatingsService } from "./rating.service";
import { request } from "http";
import { Request } from "express";
import { JwtSecretRequestType } from "@nestjs/jwt";

import { JwtService } from '@nestjs/jwt';
@Controller()
export class ratingController{
    constructor(private ratingsService : RatingsService){}


    @Put('Rating')
@UseGuards(AuthGuard('jwt'))
async updateRating(
  @Req() request: Request,
  @Param('movie') movie: string,
  @Body() rateDto, // DTO with user's rating value
){
    const token =  request.headers.authorization; // Your token here
const tokenParts = token.split(" "); // Split the string by space
const jwtToken = tokenParts[1]; 
   
    const rating = await this.ratingsService.updateRating(jwtToken, rateDto); 
    return rating;
    // const userId = request?.auth.id; // Get the user ID from the JWT token
    // const rating = await this.ratingsService.updateRating(userId, movieId, rateDto.value); 
    //  return rating;
}








@Get('Rating')
@UseGuards(AuthGuard('jwt'))
async getUserRating(
  @Req() request: Request,
){
    const token =  request.headers.authorization; // Your token here
const tokenParts = token.split(" "); // Split the string by space
const jwtToken = tokenParts[1]; 
   
    const rating = await this.ratingsService.getUserRatings(jwtToken); 
    return rating;
    // const userId = request?.auth.id; // Get the user ID from the JWT token
    // const rating = await this.ratingsService.updateRating(userId, movieId, rateDto.value); 
    //  return rating;
}
}
