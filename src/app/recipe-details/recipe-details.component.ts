import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { FavoriteService } from '../favorite.service';

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
  userId: number | null = null; // Assuming you have a way to get the user ID
  recipeLink: string = ''; // Holds the generated recipe link
  showSharing: boolean = false; // Controls the visibility of the sharing section

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private favoriteRecipes: FavoriteService
  ) {}

  ngOnInit(): void {
    // Get user ID from local storage or your authentication service
    this.userId = parseInt(localStorage.getItem('userId') || '', 10);

    this.route.params.subscribe((params) => {
      this.recipeId = params['id'];
      this.recipeService.getRecipeById(this.recipeId).subscribe(
        (res) => {
          this.recipeDetails = res;
        },
        (err) => {
          this.recipeNotFound = true;
        }
      );
    });
    this.generateRecipeLink();
  }

  setRating(rating: number) {
    this.newRating = rating;
    this.recipeService
      .updateRecipeRating(this.recipeId, this.newRating)
      .subscribe((response) => {
        console.log(response);
      });
  }

  addToFavorites(recipeId: number): void {
    if (this.userId) {
      this.favoriteRecipes.addToFavorites(this.userId, recipeId).subscribe(
        (response) => {
          // Update favoriteRecipes array or do other necessary actions
          console.log('Added to favorites:', response);
        },
        (error) => {
          console.log('Error adding to favorites:', error);
        }
      );
    }
  }

  isRecipeFavorite(recipeId: number) {
    // return this.favoriteRecipes.includes(recipeId);
  }
  generateRecipeLink() {
    // Generate the link based on the current route or your specific requirements
    this.recipeLink = window.location.href;
  }

  toggleSharing() {
    this.showSharing = !this.showSharing;
  }

  copyRecipeLink() {
    const input = document.createElement('input');
    input.value = this.recipeLink;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }
}
