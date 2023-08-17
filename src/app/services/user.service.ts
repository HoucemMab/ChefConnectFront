import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpCLient : HttpClient) { }

  register(user: any) {
    return this.httpCLient.post("http://localhost:8094/api/save", user, { responseType: 'text' });
}

login(user: any) {

  return this.httpCLient.post("http://localhost:8094/api/login", user, { responseType: 'text' });

}
}
