import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import {OnInit} from '@angular/core';
import { ValidatorFn,ValidationErrors } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

export const mustMatch : ValidatorFn = (control: AbstractControl): ValidationErrors|null => {
  let password = control.get('password');
  let confirmPassword = control.get('confirmPassword');
  if(password?.value != confirmPassword?.value){
    return {passwordmatcherror :true }
  }
  return null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;
  submitted : boolean = false;
  constructor(private formBuilder : FormBuilder, private service : UserService, private router:Router){}

  ngOnInit(): void {
    this.registerForm =this.formBuilder.group({
      firstName : new FormControl(null,Validators.required),
      lastName : new FormControl(null,Validators.required),
      mail : new FormControl(null,[Validators.required,Validators.email,Validators.minLength(6)]),
      phoneNumber : new FormControl(null,Validators.required),
      password : new FormControl(null,[Validators.required, Validators.minLength(3)]),
      confirmPassword : new FormControl(null)
    
    },
    {
      validators:mustMatch
    }
    )
  }

  showSweetAlert(type: 'success' | 'error', title: string, text: string) {
    Swal.fire({
      icon: type,
      title: title,
      text: text
    });}

  onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }

    const user = {
      firstName : this.registerForm.value.firstName,
      lastName : this.registerForm.value.lastName,
      mail: this.registerForm.value.mail,
      phoneNumber: this.registerForm.value.phoneNumber,
      password: this.registerForm.value.password,
      role: "simple_user"
    }
   /* this.service.register(user).subscribe(
      (resp: string) => {
        console.log(resp);
        this.showSweetAlert('success', 'Success', resp);
      },
      error => {
        console.log("Error:", error);
        this.showSweetAlert('error', 'Error', 'An error occurred');
      }
    );*/
    this.service.register(user).subscribe(resp=>
      {
        if(resp == "User registered successfully"){
          Swal.fire('Bonjour', 'User registered successfully!','success') .then((result) => {
            if (result.isConfirmed) {
            
              this.router.navigate(['/login']);
            };
  
        }   )     }

        else if(resp == "Email already exists"){
          console.log(resp);
          this.showSweetAlert('error', 'Error', resp);
        }
      },
      error => {
        console.log("Error:", error);
        this.showSweetAlert('error', 'Error', 'An error occurred');
      }
      );
      
  }
  

}
