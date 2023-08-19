import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  constructor(private http: HttpClient) {}

  getSubscribedUsers(userId: number): Observable<any[]> {
    // Replace with the actual API endpoint to fetch subscribed users
    const apiUrl = `http://localhost:8094/api/get-subs/${userId}`;
    return this.http.get<any[]>(apiUrl);
  }
}
