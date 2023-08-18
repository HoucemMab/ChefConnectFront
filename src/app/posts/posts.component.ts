import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  subscribedRecipes: any[] = [];
  userIdString: any;

  constructor(
    private apiService: ApiService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    console.log('initiing');

    this.userIdString = localStorage.getItem('userId');
    console.log(this.userIdString);
    if (this.userIdString) {
      const userId = parseInt(this.userIdString, 10); // Convert string to number

      this.apiService.getSubscribedRecipes(userId).subscribe(
        (response: any) => {
          console.log('resp', response);
          const allRecipes = response
            .map((entry: any) => entry.abonne.recipes)
            .flat();

          // Filter out duplicate recipes by ID
          const uniqueRecipes = this.getUniqueRecipes(allRecipes, 'recipeId');

          this.subscribedRecipes = uniqueRecipes;
        },
        (error) => {
          console.log('Error fetching subscribed recipes:', error);
        }
      );
    }
  }

  // Helper function to filter out duplicates based on a specific property
  private getUniqueRecipes(recipes: any[], property: string): any[] {
    const uniqueMap = new Map();
    recipes.forEach((recipe) => {
      uniqueMap.set(recipe[property], recipe);
    });
    return Array.from(uniqueMap.values());
  }
}
