import { Injectable } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private httpCLient: HttpClient) {}

  addRecipe(recipe: Recipe) {
    return this.httpCLient.post<any>(
      'http://localhost:8094/api/add-recipe',
      recipe
    );
  }

  //formData : l objet qui contient les fichiers qu on souhaite télécharger
  uploadMedia(formData: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        enctype: 'multipart/form-data',
      }),
    };
    return this.httpCLient.post(
      'http://localhost:8094/api/upload',
      formData,
      httpOptions
    );
  }

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpCLient.post('http://localhost:8094/api/upload', formData);
  }

  getRecipesByUser(): Observable<any> {
    return this.httpCLient.get('http://localhost:8094/api/recipesByUser');
  }

  deleteService(id: any): Observable<any> {
    let url = 'http://localhost:8094/api/recipe/';
    let baseUrl = url.concat(id.toString());
    return this.httpCLient.delete(baseUrl);
  }
  getRecipeById(recipeId: number): Observable<any> {
    console.log('recipe=>', recipeId);
    const url = `http://localhost:8094/api/recipe/${recipeId}`;

    return this.httpCLient.get(url);
  }
  updateRecipeRating(recipeId: number, newRating: number): Observable<any> {
    const url = `http://localhost:8094/api/recipe/note/${recipeId}/${newRating}`;
    return this.httpCLient.post(url, null);
  }
}
