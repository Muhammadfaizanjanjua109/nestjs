import { Schema, Prop ,SchemaFactory} from "@nestjs/mongoose";

@Schema({
    timestamps:true
})
export class Auth{

    @Prop() 
    id: string

 @Prop ()
username:string


@Prop ()
address:string

@Prop ()
password:string


}

export const AuthSchema = SchemaFactory.createForClass(Auth)
