import { Schema, Prop ,SchemaFactory} from "@nestjs/mongoose";

@Schema({
    timestamps:true
})
export class Auth{

@Prop({ unique: true }) 
    id: string

 @Prop ({ unique: true })
username:string 

@Prop()
image: Buffer

  
@Prop ()
  dob:string

@Prop ()
address:string

@Prop ()
password:string


}

export const AuthSchema = SchemaFactory.createForClass(Auth)
