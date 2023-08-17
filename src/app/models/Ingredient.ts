import { Recipe } from "./Recipe";

export class Ingredient{
    ingredientId : number;
    ingredientName : String;
    quantity : String;
    unit : String;
    recipes : Recipe[];
}