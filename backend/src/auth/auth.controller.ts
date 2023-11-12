
import { Body, Controller, Post, HttpCode, HttpStatus , Patch, UploadedFile, UseInterceptors ,UseGuards ,Req} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from './Schema/auth.schema';
import { request } from 'http';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
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
@UseInterceptors(FileInterceptor('image' , {storage:diskStorage({
  destination:'./uploads' ,
  filename(req, file, callback) {
    console.log(file,'file from callback')
    const filename=path.parse(file.originalname).name.replace(/\s/g, '') +Date.now();
    const extension =path.parse(file.originalname).ext;
    callback(null,`${filename}${extension}`)
  },
})})) // 'image' should match the field name in the FormData
async signup(@Body() signupDto: any,    @UploadedFile() file: Express.Multer.File): Promise<any> {
  signupDto.image = file; 
  return this.authService.signup(signupDto , file);
}








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