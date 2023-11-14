import { Injectable, UnauthorizedException  ,BadRequestException, ConflictException, NotFoundException} from '@nestjs/common';
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




  async isUsernameTaken(username: string): Promise<boolean> {
    const existingUser = await this.AuthModal.findOne({ username }).exec();
    return !!existingUser;
  }




  async signup(signUpDto ,file) {
    
    const isUsernameTaken = await this.isUsernameTaken(signUpDto.username);

    if (isUsernameTaken) {
      throw new ConflictException('Username already exists');
    }
  try {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const user = await this.AuthModal.create({
      username: signUpDto.username,
      password: hashedPassword,
      category: signUpDto.category,
      image: file.path,
      dob: signUpDto.dob,
      address: signUpDto.address,
    });

    console.log('User created successfully:', user);

    return user;
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.username) {
      // Duplicate key error for the username field
      throw new ConflictException('Username already exists');
    } else {
      // Other errors
      console.error('Error creating user:', error);
      throw new BadRequestException('Invalid input', error.message);
    }
  }

  }




  async getUserFromToken(jwtToken: string): Promise<Auth> {
    try {
      const decodedToken = this.jwtService.verify(jwtToken);
      const userId = decodedToken.id;

      const user = await this.AuthModal.findById(userId).exec();

      if (!user) {
        throw new BadRequestException('User not found');
      }

      return user;
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }









  
  async updateProfile(jwtToken: string, updateData: Partial<Auth>, file: any): Promise<any> {
    const decodedToken = this.jwtService.verify(jwtToken);
      const userId = decodedToken.id;

    try {
  
      const user = await this.AuthModal.findById(userId);
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      // Update the user fields based on the provided data
      if (updateData.username) {
        if(updateData.username !=user.username){
          const isUsernameTaken = await this.isUsernameTaken(updateData.username);
          if (isUsernameTaken) {
            throw new ConflictException('Username already exists');
          }
          
        }
        user.username = updateData.username;
      }






      if (updateData.password) {
        const hashedPassword = await bcrypt.hash(updateData.password, 10);
        user.password = hashedPassword;
      }



      if (updateData.category) {
        user.category =  updateData.category;
      }





  
      if (updateData.address) {
        user.address = updateData.address;
      }
      if (updateData.dob) {
        user.dob = updateData.dob;
      }

  
     
      if (file) {
        // Process the image file
        user.image = file.path;
      }
  console.log(user , 'user')
      // Save the updated user to the database
      await user.save();
  
      return { message: 'User profile updated successfully' };
    } catch (error) {
      // Handle errors
      console.log('Error updating user profile:', error);
      throw new BadRequestException('Failed to update user profile', error.message);
    }
  }
  
}