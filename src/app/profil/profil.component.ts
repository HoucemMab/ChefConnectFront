import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/Recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{
  user : User;
  recipes: Recipe[];
  constructor(private service : RecipeService, private router: Router){}
  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    console.log(storedUser);
    if(storedUser){
      this.user  = JSON.parse(storedUser);
      console.log(this.user.firstName);
    }
    this.service.getRecipesByUser().subscribe(resp => {
      this.recipes = Object.values(resp);
      console.log("les recettes : ",this.recipes);

    })
  }

  navigateToEditRecipe(recipeId : number){
    this.router.navigate(['/recipe',recipeId])
  }

  deleteRecipe(id : any) {
    let conf = confirm("etes vous sur?")
    if(conf) {
      this.service.deleteService(id).subscribe(
        resp => {
          console.log(resp);
          location.reload;
        }, err =>{
          console.log("erreur");
        }
      )
    }
  }

 /* deleteRecipe(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px', // ajustez la largeur selon vos besoins
      data: "Êtes-vous sûr de vouloir supprimer cette recette?"
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteService(id).subscribe(
          resp => {
            console.log(resp);
          }, err => {
            console.log("erreur");
          }
        );
      }
    });
  }*/
  

}
