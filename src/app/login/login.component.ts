import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { JwtClientService } from '../jwt-client.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  loginForm: FormGroup;
  errorMessage: String;
  submitted:boolean=false;
  
  constructor(private service : UserService,
    private router: Router , private tokenStorage:TokenStorageService, private http : HttpClient
    ){

  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    })
    
  }

onSubmit(){
  this.submitted = true;
  if(this.loginForm.invalid) {
    return;
  }

  const user = {
    mail: this.loginForm.value.email,
    password: this.loginForm.value.password
  };

  console.log(user);
  this.service.login(user).subscribe((resp: any) => {
    console.log(resp);
    if (resp === null) {
      alert("Email not exists or Login Failed");
    } else {
      console.log(resp); // Afficher les détails de l'utilisateur connecté
      // Stocker l'ID de l'utilisateur dans le local storage
      localStorage.setItem('userId', resp.userId); // Assurez-vous que resp.userId correspond à la propriété de l'ID dans l'objet User
      Swal.fire({
        title: 'Bonjour',
        text: 'Login Success',
        icon: 'success'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/register']);
        }
      });
    }
  })

/*  this.service.login(user).subscribe((resp: any)=>{
   console.log(user);
    console.log(user.email);
    console.log(user.password);
    console.log(resp);
    if (resp === "Email not exists") {
      alert("Email not exists");
    } else if (resp === "Login Success") {
      alert("Login Success");
    } else if (resp === "Login Failed") {
      alert("Incorrect Email and Password not match");
    }
  })*/

  /*let user : User;
  //this.service.generateToken(this.loginForm.value)
  let resp = this.service.generateToken(this.loginForm.value);
  resp.subscribe(data=>{
    //this.tokenStorage.saveToken(data)
    
    console.log("token : "+data);
    
    console.log("l id est ", user.userId);
    this.router.navigate(['welcome']);
   
  },
  err => {
    this.errorMessage = "Nous n’avons pas trouvé de compte correspondant à ce que vous avez entré"
    console.log(this.errorMessage);
    Swal.fire('Bonjour', 'Nous n’avons pas trouvé de compte correspondant à ce que vous avez entré','error');
  });*/
  
 // resp.subscribe(data => this.accessApi(data));
}

}
