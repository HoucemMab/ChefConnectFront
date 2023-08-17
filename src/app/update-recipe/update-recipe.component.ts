import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/Recipe';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css']
})
export class UpdateRecipeComponent implements OnInit{
  ngOnInit(): void {
  }

  currentRecipe = new Recipe();
}
