import {Prop , Schema  ,SchemaFactory } from "@nestjs/mongoose";



export enum Category {
    ADVENTURE='Adventure',
    HORROR='Horror',
    CRIME='Crime',
   ANIMATED='Animated'  
}
@Schema({
    timestamps:true
})

export class Movies {
    @Prop()
    name :string

 

    @Prop()
    description :string


    @Prop()
    IDMRating :string

 

    @Prop()
    category: Category

}

export const MoviesSchema = SchemaFactory.createForClass(Movies)