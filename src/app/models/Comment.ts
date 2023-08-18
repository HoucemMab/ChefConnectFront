import { Recipe } from "./Recipe";
import { User } from "./User";

export class comment{
    commentId : number;
    content : String ;
    creationDate : Date;
    recipe : Recipe;
    user : User;
}