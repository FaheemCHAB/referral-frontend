import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  template: `
<div class="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
  <!-- Subtle background pattern -->
  <div class="absolute inset-0 bg-dot-pattern opacity-30"></div>

  <!-- Back Button - Positioned Absolute to work across screen sizes -->
  <button
    (click)="goBack()"
    class="absolute top-4 left-4 z-20 flex items-center space-x-2 px-3 py-2 bg-white/80 backdrop-blur-sm text-gray-700 rounded-lg shadow-md transition-all hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    <svg
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
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
    <span class="text-sm">Back</span>
  </button>

  <div class="max-w-md w-full relative z-10">
    <div class="bg-white rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
      <!-- Logo and Heading (Adjusted to make room for back button) -->
      <div class="text-center">
        <div class="flex justify-center mb-4">
          <div class="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-7 h-7 sm:w-8 sm:h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p class="text-sm sm:text-base text-gray-500">Secure access to your account</p>
      </div>

      <!-- Rest of the login form remains the same as in previous version -->
      <form #loginForm="ngForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <!-- Username Input -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <input 
              type="text" 
              id="username" 
              name="username" 
              [(ngModel)]="username"
              #usernameInput="ngModel"
              required
              minlength="3"
              class="w-full pl-10 pr-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
              [ngClass]="{'border-red-500 bg-red-50': usernameInput.invalid && (usernameInput.dirty || usernameInput.touched), 'border-gray-300': !usernameInput.invalid || !(usernameInput.dirty || usernameInput.touched)}"
              placeholder="Enter your username">
          </div>
          <div *ngIf="usernameInput.invalid && (usernameInput.dirty || usernameInput.touched)" class="mt-1 text-xs text-red-600">
            <div *ngIf="usernameInput.errors?.['required']">Username is required</div>
            <div *ngIf="usernameInput.errors?.['minlength']">Username must be at least 3 characters</div>
          </div>
        </div>

        <!-- Password Input Remains the Same -->
        <div>
          <div class="flex items-center justify-between mb-1">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          </div>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <input 
              [type]="showPassword ? 'text' : 'password'"
              id="password" 
              name="password"
              [(ngModel)]="password"
              #passwordInput="ngModel"
              required
              minlength="6" 
              class="w-full pl-10 pr-10 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
              [ngClass]="{'border-red-500 bg-red-50': passwordInput.invalid && (passwordInput.dirty || passwordInput.touched), 'border-gray-300': !passwordInput.invalid || !(passwordInput.dirty || passwordInput.touched)}"
              placeholder="Enter your password">
            <!-- Password visibility toggle remains the same -->
            <button 
              type="button"
              (click)="togglePasswordVisibility()"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg *ngIf="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
              <svg *ngIf="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>
          </div>
          <div *ngIf="passwordInput.invalid && (passwordInput.dirty || passwordInput.touched)" class="mt-1 text-xs text-red-600">
            <div *ngIf="passwordInput.errors?.['required']">Password is required</div>
            <div *ngIf="passwordInput.errors?.['minlength']">Password must be at least 6 characters</div>
          </div>
        </div>

        <!-- Error Message Remains the Same -->
        <div *ngIf="errorMessage" class="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md text-sm">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <p class="font-medium">{{ errorMessage }}</p>
          </div>
        </div>

        <!-- Login Button Remains the Same -->
        <button 
          type="submit"
          [disabled]="loginForm.invalid" 
          class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-all duration-300 shadow-md hover:opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed">
          <div class="flex items-center justify-center">
            <span>Login</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </button>
      </form>

      <!-- Additional Links Remain the Same -->
      <div class="text-center text-sm space-y-3">
        <div>
          <span class="text-gray-600">Don't have an account?</span>
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 hover:underline ml-1">Contact admin</a>
        </div>
        
        <div class="text-xs text-gray-500">
          <a href="#" class="hover:text-indigo-600 hover:underline mr-3">Privacy Policy</a>
          <a href="#" class="hover:text-indigo-600 hover:underline">Terms of Service</a>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
    .bg-dot-pattern {
      background-image: 
        linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px);
      background-size: 20px 20px;
    }
  `]
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

  onSubmit() {
    console.log(this.username);
    if (this.username === 'admin' && this.password === 'admin123') {
      console.log('Admin credentials detected. Navigating to admin dashboard...');
      
      this.router.navigate(['/admin/dashboard']);
      return;
    }
      this.authService.authenticateUser(this.username, this.password).subscribe({
      
        next: () => this.router.navigate(['/user/dashboard']),

        error: (err) => {
          this.errorMessage = err.error?.message || 'An unexpected error occurred.';
        },
      });
  }

  goBack() {
    // Navigate to the previous page or a default route
    this.router.navigate(['/']); // Modify this to your app's landing or previous page
  }
}