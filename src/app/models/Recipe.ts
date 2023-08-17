import { Category } from "./Category";
import { Ingredient } from "./Ingredient";
import { Media } from "./Media";
import { User } from "./User";

export class Recipe {
recipeId : number;
title :String;
description : String;
preparationTime : String;
cookingTime : String;
avrageGrade : number;
globalRating : number;
totalNumberOfUser : number;
steps : String;
category : Category;
comments : Comment[];
user : User;
medias : Media[];
ingredients : Ingredient[];

}