import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private http = inject(HttpClient);

  constructor() { }


  registerStudent(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/student`, data);
  }

  registerTeacher(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/teacher`, data);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, credentials);
  }


  getUserId(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || null;
    } catch (error) {
      console.error('Błąd dekodowania ID z tokena', error);
      return null;
    }
  }


  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));

      const role = decodedPayload.role || decodedPayload.authorities?.[0];

      return role ? role.replace('ROLE_', '') : null;
    } catch (error) {
      console.error('Błąd dekodowania roli z tokena', error);
      return null;
    }
  }

  isStudent(): boolean {
    return this.getUserRole() === 'STUDENT';
  }

  isTeacher(): boolean {
    return this.getUserRole() === 'TEACHER';
  }


  logout(): void {
    localStorage.removeItem('token');
  }
}