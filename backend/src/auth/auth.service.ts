import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './Schema/auth.schema';
import mongoose from 'mongoose';
import { MulterFile } from 'src/helper/MulterInterface';
// import { MulterFile } from 'src/common/types';
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




  async updateProfile(jwtToken: string, updateData: Partial<Auth>, file: MulterFile) {
    let b= await  this.jwtService.verify(jwtToken)
    // console.log(b,'b  b b b b')
    let userId =b.id
    // console.log(userId,'body')
    const user = await this.AuthModal.findById(userId);
// console.log(user, 'user')
    if (!user) {
      throw new UnauthorizedException('Unauthorized', 'User not found');
    }

    if (file) {
      user.image = file.buffer;
    }

    if (updateData.username) {
      user.username = updateData.username;
    }
    if (updateData.dob) {
      user.dob = updateData.dob;
    }

    if (updateData.address) {
      user.address = updateData.address;
    }

    await user.save();

    return { user, message: 'User profile updated successfully' };
  }
}