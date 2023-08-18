import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8094/api'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  getSubscribedRecipes(userId: number): Observable<any> {
    const url = `${this.baseUrl}/get-subs/${userId}`;
    console.log('a^pi', this.http.get(url));
    return this.http.get(url);
  }

  // Add more methods for other API endpoints as needed
}
