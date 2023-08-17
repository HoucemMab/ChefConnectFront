import { Component } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {OnInit} from '@angular/core';
import { Ingredient } from '../models/Ingredient';
import { TokenStorageService } from '../services/token-storage.service';
import { RecipeService } from '../services/recipe.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/User';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  
  localStorage = window.localStorage;
  newRecipe = new Recipe();
  addRecipeForm : FormGroup;
  submitted : boolean;
  ingredientsArray: FormArray; // Ajout de la propriété pour accéder aux ingrédients
  currentIngredientIndex: number; 
  selectedImage : File;
  selectedVideo : File;
  user : User = new User(1,"guizani","ghada","guizani@@","admin");

constructor(private formBuilder : FormBuilder,private service : RecipeService,private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
   this.addRecipeForm = this.formBuilder.group({
    title :[null,Validators.required],
    description : [null,Validators.required],
    preparationTime :[null,Validators.required],
    cookingTime : [null,Validators.required],
    steps :[null,Validators.required], 
    image: [''], // Contrôle de formulaire pour l'image
    video: [''], // Contrôle de formulaire pour la vidéo
    ingredients: this.formBuilder.array([
      this.formBuilder.group({
        name: this.formBuilder.control('', Validators.required),
      quantity: this.formBuilder.control('', Validators.required),
      unit: this.formBuilder.control('', Validators.required)
      }),
      
      
    ])

   })
   this.ingredientsArray = this.addRecipeForm.get('ingredients') as FormArray;

  }

  // retourne la liste des contrôles de formulaire à l'intérieur du groupe de formulaire 'ingredients' 
  getIngredientsControls() {
    return (this.addRecipeForm.get('ingredients') as FormArray).controls;
  }

  addIngredient() {
    const ingredientsArray = this.addRecipeForm.get('ingredients') as FormArray;
    ingredientsArray.push(
      this.formBuilder.group({
        name: '',
        quantity: '',
        unit: ''
      })
    );
  }

removeIngredient(index: number) {
    const ingredientsArray = this.addRecipeForm.get('ingredients') as FormArray;
    ingredientsArray.removeAt(index);
}

isFormValid(): boolean {
  return this.addRecipeForm.valid;
}

  // Vérifie si des ingrédients sont saisis
hasIngredients(): boolean {
    return this.ingredientsArray.length > 0;
}
// Vérifie si tous les champs d'un ingrédient sont remplis
isIngredientComplete(ingredientGroup: FormGroup): boolean {
  const nameControl = ingredientGroup.get('name');
  const quantityControl = ingredientGroup.get('quantity');
  const unitControl = ingredientGroup.get('unit');
  
  return !!nameControl?.value && !!quantityControl?.value && !!unitControl?.value;
}

  // Méthode pour définir l'index de l'ingrédient actuel
  setCurrentIngredientIndex(index: number) {
    this.currentIngredientIndex = index;
  }


// Vérifie si l'ingrédient précédent est complet
isPreviousIngredientComplete(index: number): boolean {
  if (index === 0) {
    return true; // Le premier ingrédient est toujours considéré comme complet
  }
  
  const previousIngredientGroup = this.ingredientsArray.controls[index - 1] as FormGroup;
  return this.isIngredientComplete(previousIngredientGroup);
}

addRecipe() {
  if (this.isFormValid()) {
    this.newRecipe.title = this.addRecipeForm.get('title')?.value;
    this.newRecipe.description = this.addRecipeForm.get('description')?.value;
    this.newRecipe.preparationTime = this.addRecipeForm.get('preparationTime')?.value;
    this.newRecipe.cookingTime = this.addRecipeForm.get('cookingTime')?.value;
    this.newRecipe.steps = this.addRecipeForm.get('steps')?.value;
    
    const ingredients = this.addRecipeForm.get('ingredients')?.value;
    this.newRecipe.ingredients = ingredients.map((ingredient: any) => {
      return {
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit
      };
    });
    this.newRecipe.user = this.user;

    this.localStorage.setItem('loggedInUser', JSON.stringify(this.user));

    // Call the service to add the recipe
    this.service.addRecipe(this.newRecipe).subscribe(
      response => {
        console.log('Recipe added successfully:', response);
        Swal.fire('Bonjour', 'La recette a été ajoutée avec succès !','success') .then((result) => {
          if (result.isConfirmed) {
            const idUtilisateur = this.user.userId;
  
            // Rediriger vers le composant profil avec l'ID en tant que paramètre
            this.router.navigate(['/profil', idUtilisateur]);
          };

      },
      error => {
        console.error('Error adding recipe:', error);
      }
    );
  })
}
}


/*addRecipe() {
  if (this.isFormValid()) {
    const mediaFormData = new FormData();
    if (this.selectedImage) {
      mediaFormData.append('files', this.selectedImage);
    }
    if (this.selectedVideo) {
      mediaFormData.append('files', this.selectedVideo);
    }

    this.service.uploadMedia(mediaFormData).subscribe(
      response => {
        console.log('Media uploaded successfully:', response);

        this.newRecipe.title = this.addRecipeForm.get('title')?.value;
        this.newRecipe.description = this.addRecipeForm.get('description')?.value;
        this.newRecipe.preparationTime = this.addRecipeForm.get('preparationTime')?.value;
        this.newRecipe.cookingTime = this.addRecipeForm.get('cookingTime')?.value;
        this.newRecipe.steps = this.addRecipeForm.get('steps')?.value;

        const ingredients = this.addRecipeForm.get('ingredients')?.value;
        this.newRecipe.ingredients = ingredients.map((ingredient: any) => {
          return {
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit
          };
        });
        this.newRecipe.user = this.user;
        

        // Appeler l'API d'ajout de recette avec les médias associés
        this.service.addRecipe(this.newRecipe).subscribe(
          response => {
            console.log('Recipe added successfully:', response);
            Swal.fire('Bonjour', 'La recette a été ajoutée avec succès !', 'success');
          },
          error => {
            console.error('Error adding recipe:', error);
          }
        );
      },
      error => {
        console.error('Error uploading media:', error);
        if (error instanceof HttpErrorResponse) {
          console.log('Status:', error.status); // Affichez le statut HTTP de l'erreur
          console.log('Error:', error.error);   // Affichez le corps de l'erreur
        }
      }
    );
  }
}*/


onSubmit(){
    this.submitted = true;
    if(this.isFormValid()){
      this.addRecipe();
      //console.log(this.addRecipeForm.value)
    }
    else{
      console.log("probleme");
    }
}

}
