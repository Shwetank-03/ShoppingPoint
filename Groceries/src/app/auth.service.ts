import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated(): boolean {
    // Implement your authentication logic here
    // For example, check if the user is logged in or has a valid token
    return true; // Replace this with your actual authentication check
  }
}
