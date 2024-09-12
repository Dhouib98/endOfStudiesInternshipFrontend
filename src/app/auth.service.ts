import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/backend/login/';
  private userDetails: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      map(response => {
        console.log('Login response:', response);
        if (response && response.user) {
          this.userDetails = response.user;
          
          // Assuming that the response contains a role, like 'vendeur' or 'responsable'
          const role = response.user.role; // Ensure this matches the backend data structure
          
          // Save user details and role in local storage or a service
          localStorage.setItem('user', JSON.stringify(this.userDetails));
          localStorage.setItem('role', role);  // Store the role in local storage
          
          this.router.navigate(['/home']); // Navigate to home
          return true;
        } else {
          console.error('Login failed: Response did not contain user data');
          return false;
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(false);
      })
    );
  }

  getRole(): string {
    // Fetch the role from localStorage or handle it however you store it
    return localStorage.getItem('role') || '';  // Return an empty string if no role found
  }
}
