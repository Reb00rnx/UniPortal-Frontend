import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://uniportal-r6nm.onrender.com/api/users';
  constructor(private http: HttpClient) { }


  public getUserById(userId: number) {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

}
