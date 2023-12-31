import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ProfilComponent } from './profil/profil.component';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { PostsComponent } from './posts/posts.component';
import { FavoriteRecipesComponent } from './favorite-recipes/favorite-recipes.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-recipe', component: AddRecipeComponent },
  { path: 'profil/:id', component: ProfilComponent },
  // { path: 'recipe/:id', component: UpdateRecipeComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'subscribe', component: UserListComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'favorite', component: FavoriteRecipesComponent },
  { path: 'navigation', component: NavigationComponent },

  { path: 'recipe/:id', component: RecipeDetailsComponent }, // Route for recipe details
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
