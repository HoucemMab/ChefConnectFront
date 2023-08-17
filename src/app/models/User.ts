import { first, last } from "rxjs";
import { Recipe } from "./Recipe";
import { RecipeAlert } from "./RecipeAlert";

export class User {
    userId : number;
    lastName : String;
    firstName : String;
    mail : String;
    password : String;
    phoneNumber : String;
    role : String;
    recipes : Recipe[];
    comments : Comment[];
    recipeAlert : RecipeAlert[];
    //notification
    //abonne

    constructor(userId: number,lastName: String,firstName:String,mail:String,role:String){
        this.userId = userId;
        this.lastName = lastName;
        this.firstName = firstName;
        this.mail = mail;
        this.role = role;
    }
    
}