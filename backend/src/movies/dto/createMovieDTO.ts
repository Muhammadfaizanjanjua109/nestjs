import { Category } from "../Schema/movies.schema";

export class CreateMoviesDTO{
    readonly name  : string ;
    readonly description  : string ;
    readonly IDMRating  : string ;
    readonly category  : Category
}