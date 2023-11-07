
import { Body, Controller, Post, HttpCode, HttpStatus , Patch, UploadedFile, UseInterceptors ,UseGuards ,Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from './Schema/auth.schema';
import { request } from 'http';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    console.log(signInDto,'signInDto')
    return this.authService.signIn(signInDto.username, signInDto.password);
  }


  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signInDto: Record<string, any>) {
    console.log(signInDto,'signInDto')
    return this.authService.signup(signInDto);
  }



  //   @HttpCode(HttpStatus.OK)
  
  // @Patch('update_profile')
  // @UseInterceptors(FileInterceptor('image'))
  // update_profile(@Body() signInDto: Record<string, any>) {
  //   return this.authService.updateProfile(req.user.id, updateData, file);
  // }







  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Patch('update_profile')
  @UseInterceptors(FileInterceptor('image'))
  async updateProfile(
    @UploadedFile() file: any,
    @Req() request: Request,
    @Body() updateData: Partial<Auth>, // Include other data you want to update
  
  ) {
    const token = (request.headers as any).authorization; // Your token here
const tokenParts = token.split(" "); // Split the string by space
const jwtToken = tokenParts[1]; 
   console.log(updateData,'updateData, updateData')
    try {
      return await this.authService.updateProfile(jwtToken, updateData, file);
    } catch (error) {
      return { message: 'Failed to update user profile' };
    }
  }
}