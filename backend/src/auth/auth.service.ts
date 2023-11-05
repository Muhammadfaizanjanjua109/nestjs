import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './Schema/auth.schema';
import mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private AuthModal : mongoose.Model<Auth> ,
    private jwtService: JwtService
  ) {}

  async signIn(userNames, pass) {
    console.log(userNames,'username')
    const user = await this.AuthModal.findOne({ username: userNames });
if(!user){
  throw new UnauthorizedException('Unautorize','No User Name Found')
}

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { id: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }


  async signup(signInDto){
    console.log('movies' , signInDto)
    return this.AuthModal.create(signInDto)
  }


}