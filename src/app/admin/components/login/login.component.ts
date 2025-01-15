import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  // selector: 'app-login',
  template: `
 <!-- <div class="min-h-screen flex items-center justify-center bg-blue-900">
  <div class="bg-blue-100 p-8 rounded-lg shadow-md w-96">
    <h2 class="text-2xl font-bold mb-6 text-center">RNrich Admin Login</h2>
    <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
      <div class="mb-4">
        <input
          type="text"
          [(ngModel)]="username"
          name="username"
          class="w-full px-4 py-2 border rounded-lg"
          placeholder="Username"
          required
        />
      </div>
      <div class="mb-6 relative">
        <input
          [type]="showPassword ? 'text' : 'password'"
          [(ngModel)]="password"
          name="password"
          class="w-full px-4 py-2 border rounded-lg"
          placeholder="Password"
          required
        />
        <span
          class="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
          (click)="togglePasswordVisibility()"
        >
          <svg
            *ngIf="!showPassword"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
          <svg
            *ngIf="showPassword"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </span>
      </div>
      <button type="submit" class="w-full py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-500 focus:ring-4 focus:ring-blue-300">Login</button>
    </form>
  </div>
</div> -->


  `
})
export class LoginComponent {
  username = '';
  password = '';
  showPassword = false; 

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  // onSubmit() {
  //   if (this.authService.login(this.username, this.password)) {
  //     this.router.navigate(['/admin/dashboard']);
  //   }
  // }
}