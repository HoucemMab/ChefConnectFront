import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: any[] = [];
  categories: any[] = [];
  selectedCategory: string | null = null;
  filteredRecipes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRecipes();
    this.fetchCategories();
  }

  fetchRecipes(): void {
    this.http
      .get<any[]>('http://localhost:8094/api/recipes')
      .subscribe((data) => {
        // Sort recipes by averageGrade in descending order
        this.recipes = data.sort((a, b) => b.averageGrade - a.averageGrade);
        this.applyCategoryFilter();
      });
  }

  fetchCategories(): void {
    this.http
      .get<any[]>('http://localhost:8094/api/categories')
      .subscribe((data) => {
        this.categories = data;
      });
  }

  filterByCategory(categoryName: string | null): void {
    this.selectedCategory = categoryName;
    this.applyCategoryFilter();
  }

  applyCategoryFilter(): void {
    if (this.selectedCategory) {
      this.filteredRecipes = this.recipes.filter(
        (recipe) => recipe.category.categoryName === this.selectedCategory
      );
    } else {
      this.filteredRecipes = this.recipes;
    }
  }
}
