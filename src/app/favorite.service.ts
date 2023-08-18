import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoriteRecipes: number[] = [];

  constructor(private http: HttpClient) {}

  addToFavorites(userId: number, recipeId: number): Observable<any> {
    const url = `http://localhost:8094/api/user/favorite/${userId}/${recipeId}`;
    return this.http.post(url, null);
  }

  removeFavoriteRecipe(recipeId: number): void {
    const index = this.favoriteRecipes.indexOf(recipeId);
    if (index !== -1) {
      this.favoriteRecipes.splice(index, 1);
      // You can also make an API call to update the backend with the user's favorite recipes
    }
  }

  isRecipeFavorite(recipeId: number): boolean {
    return this.favoriteRecipes.includes(recipeId);
  }
  getFavoriteRecipes(userId: number): Observable<any[]> {
    const url = `http://localhost:8094/api/user/favorite/${userId}`;
    return this.http.get<any[]>(url);
  }
}
