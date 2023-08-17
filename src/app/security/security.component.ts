import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import { JwtClientService } from '../jwt-client.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  authRequest : any = {
    "email": "ghada.mail@gmail.com",
    "password": "password"
}

  response: any;

  constructor(private service:JwtClientService) {}

  ngOnInit(): void {
    this.getAccesToken(this.authRequest)
  }

  public getAccesToken(authRequest: any){
    let resp = this.service.generateToken(authRequest);
   resp.subscribe(data=>console.log("token : "+data));
   resp.subscribe(data => this.accessApi(data));
   }

   public accessApi (token: any){
    let resp = this.service.welcome(token);
    resp.subscribe(data=>this.response = data);
    console.log(this.response);
   }

}
