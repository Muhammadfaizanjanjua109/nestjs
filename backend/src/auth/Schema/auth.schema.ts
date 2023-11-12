// Import necessary modules
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Category } from '../../movies/Schema/movies.schema';

@Schema({
    timestamps:true
})
export class Auth{


@Prop ()
username:string 

@Prop()
image: string; 

@Prop ()
  dob:string

@Prop ()
address:string

@Prop ()
password:string 

@Prop({ enum: Category }) // Use the Category enum
category: Category;

}

export const AuthSchema = SchemaFactory.createForClass(Auth);
