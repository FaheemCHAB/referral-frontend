import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  // selector: 'app-login',
  template: `
  <!-- <div class="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
<div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
  <div class="w-full max-w-sm bg-white bg-opacity-30 p-6 rounded-lg shadow-lg backdrop-blur-sm">
    <h2 class="text-3xl  text-center text-blue-800 mb-6">Login</h2>
    <form (ngSubmit)="onSubmit()" class="space-y-6">
      <div class="relative">
        <input
          id="username"
          type="text"
          [(ngModel)]="username"
          name="username"
          placeholder="Username"
          required
          class="w-full px-10 py-3 font-medium text-gray-800 placeholder-gray-500 bg-white bg-opacity-80 rounded-lg border border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <span class="absolute inset-y-0 left-3 flex items-center text-gray-500">
          <i class="fas fa-user"></i>
        </span>
      </div>
      <div class="relative">
      <span class="absolute inset-y-0 left-3 flex items-center text-gray-500">
          <i class="fas fa-lock"></i>
        </span>
        <input
          id="password"
          type="password"
           [type]="showPassword ? 'text' : 'password'"
          [(ngModel)]="password"
          name="password"
          placeholder="Password"
          required
          class="w-full px-10 py-3 font-medium text-gray-800 placeholder-gray-500 bg-white bg-opacity-80 rounded-lg border border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <span class="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer">
    <svg
      *ngIf="!showPassword"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
      (click)="togglePasswordVisibility()"
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
      class="size-6"
      (click)="togglePasswordVisibility()"
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
      <p *ngIf="errorMessage" class="text-red-800">{{ errorMessage }}</p>
      <button
        type="submit"
        class="w-full py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-500 focus:ring-4 focus:ring-blue-300"
      >
        Login
      </button>
    </form>
    <div class="mt-4 text-center">
      <a href="#" class="text-sm text-blue-800 hover:underline">Forgot Password?</a>
    </div>
  </div>
</div>
  </div> -->
  `,
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  showPassword = false; 

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // onSubmit() {
  //   this.authService.authenticateUser(this.username, this.password).subscribe({
  //     next: (user) => {
  //       if (user) {
  //         this.router.navigate(['/user/dashboard']);
  //       } else {
  //         this.errorMessage = 'Invalid login credentials';
  //       }
  //     },
  //     error: (err) => {
  //       if (err.status === 403) {
  //         if (err.error?.message === 'Account deactivated') {
  //           this.errorMessage = 'Your account has been deactivated. Please contact support.';
  //         } else {
  //           this.errorMessage = 'Invalid username or password.';
  //         }
  //       } else {
  //         this.errorMessage = err.error?.message || 'An error occurred during login.';
  //       }
  //     },
  //   });
  // }
}
