import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-favorite-recipes',
  templateUrl: './favorite-recipes.component.html',
  styleUrls: ['./favorite-recipes.component.css'],
})
export class FavoriteRecipesComponent implements OnInit {
  favoriteRecipes: any[] = [];
  userId: number | null = null; // Assuming you have a way to get the user ID

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    // Get user ID from local storage or your authentication service
    this.userId = parseInt(localStorage.getItem('userId') || '', 10);

    if (this.userId) {
      this.favoriteService.getFavoriteRecipes(this.userId).subscribe(
        (recipes: any[]) => {
          this.favoriteRecipes = recipes;
        },
        (error) => {
          console.log('Error fetching favorite recipes:', error);
        }
      );
    }
  }
}
