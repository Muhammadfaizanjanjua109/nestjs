import { Auth } from "src/auth/Schema/auth.schema";
import { Movies } from "src/movies/Schema/movies.schema";


export class RateDto{
    readonly user  : Auth ;
    readonly movie  : Movies ;
    readonly value  : number ;
 
}