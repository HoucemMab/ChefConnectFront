import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipeId: number;
  recipeDetails: any; // Adjust the type based on your data structure
  newRating: number = 0; // New rating input
  recipeNotFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService // Inject your service
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.recipeId = params['id'];
      this.recipeService.getRecipeById(this.recipeId).subscribe(
        (res) => {
          this.recipeDetails = res;
          console.log(this.recipeDetails);
        },
        (err) => {
          console.log(err);
          this.recipeNotFound = true;
        }
      );
    });
  }

  setRating(rating: number) {
    // Update the newRating
    this.newRating = rating;
    // Call your recipe service to update the rating
    console.log(rating);
    this.recipeService
      .updateRecipeRating(this.recipeId, this.newRating)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
