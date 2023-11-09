import { Injectable, UnauthorizedException  ,BadRequestException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './Schema/auth.schema';
import mongoose from 'mongoose';
import { MulterFile } from 'src/helper/MulterInterface';
import * as bcrypt from 'bcrypt';
// import { MulterFile } from 'src/common/types';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private AuthModal : mongoose.Model<Auth> ,
    private jwtService: JwtService
  ) {}
  async signIn(username, password) {
    if (!username || !password) {
      throw new BadRequestException('Invalid input', 'Username and password are required');
    }

    const user = await this.AuthModal.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Unauthorized', 'No user found with the provided username');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Unauthorized', 'Invalid password');
    }

    const payload = { id: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(signUpDto) {
    console.log(signUpDto,'signUpDto')
    if (!signUpDto.username || !signUpDto.password) {
      throw new BadRequestException('Invalid input', 'Username and password are required');
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    try {
      const user = await this.AuthModal.create({
        username: signUpDto.username,
        password: hashedPassword,
      });

      return user;
    } catch (error) {
      throw new BadRequestException('Invalid input', 'User with the provided username already exists');
    }
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