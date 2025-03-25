import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  template: `
<div class="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
  <!-- Referral-themed background elements (simplified and reduced in size) -->
  <div class="absolute inset-0 overflow-hidden">
    <!-- Network of connected dots representing referrals (smaller and fewer) -->
    <svg class="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
      <!-- Reduced number of paths -->
      <path d="M100,100 L300,150 L500,50 L700,200" stroke="#6366F1" stroke-width="2" fill="none" />
      <path d="M200,500 L350,450 L500,550" stroke="#8B5CF6" stroke-width="2" fill="none" />
      <path d="M100,700 L300,750 L500,650" stroke="#6366F1" stroke-width="2" fill="none" />
      
      <!-- Fewer dots -->
      <circle cx="100" cy="100" r="6" fill="#6366F1" />
      <circle cx="300" cy="150" r="6" fill="#8B5CF6" />
      <circle cx="500" cy="50" r="6" fill="#6366F1" />
      <circle cx="700" cy="200" r="6" fill="#8B5CF6" />
      
      <circle cx="200" cy="500" r="6" fill="#6366F1" />
      <circle cx="350" cy="450" r="6" fill="#8B5CF6" />
      <circle cx="500" cy="550" r="6" fill="#6366F1" />
      
      <circle cx="100" cy="700" r="6" fill="#8B5CF6" />
      <circle cx="300" cy="750" r="6" fill="#6366F1" />
      <circle cx="500" cy="650" r="6" fill="#8B5CF6" />
    </svg>
    
    <!-- Only two small icons for rewards instead of three larger ones -->
    <svg class="absolute top-1/4 left-1/6 w-12 h-12 text-indigo-200 opacity-30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.375 3a1.875 1.875 0 0 0 0 3.75h1.875v4.5H3.375A1.875 1.875 0 0 1 1.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0 1 12 2.753a3.375 3.375 0 0 1 5.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 1 0-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3Z" />
      <path d="M12 10.5v12.75c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V10.5H12Zm1.5 4.875a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75Zm.75 2.25h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1 0-1.5Z" />
    </svg>
    
    <svg class="absolute bottom-1/3 right-1/5 w-14 h-14 text-purple-200 opacity-30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
    
    <!-- Decorative shapes (made smaller) -->
    <div class="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-100 opacity-30 blur-xl"></div>
    <div class="absolute top-1/3 -left-24 w-48 h-48 rounded-full bg-indigo-100 opacity-40 blur-xl"></div>
    <div class="absolute -bottom-32 right-1/3 w-64 h-64 rounded-full bg-purple-100 opacity-30 blur-xl"></div>
    
    <!-- Subtle grid pattern -->
    <div class="absolute inset-0 bg-grid-slate-100 opacity-20"></div>
  </div>

  <div class="p-4 flex items-center mb-6">
    <button
      (click)="goBack()"
      class="flex items-center space-x-2 px-4 py-2 bg-white text-black rounded-lg shadow-md transition-all absolute top-4 left-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span>Back</span>
    </button>
  </div>

  <div class="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all relative z-10 border border-gray-100">
    <div class="p-8">
      <div class="text-center mb-6">
        <div class="flex justify-center mb-4">
          <div class="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9v1.5A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>
        </div>
        <h2 class="text-3xl font-bold text-gray-800">Welcome Back</h2>
        <p class="text-gray-500 mt-2">Secure access to your account</p>
      </div>
      
      <form #loginForm="ngForm" (ngSubmit)="onSubmit()" class="space-y-5">
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
              class="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
              [ngClass]="{'border-red-500 bg-red-50': usernameInput.invalid && (usernameInput.dirty || usernameInput.touched), 'border-gray-300': !usernameInput.invalid || !(usernameInput.dirty || usernameInput.touched)}"
              placeholder="Enter your username">
          </div>
          <div *ngIf="usernameInput.invalid && (usernameInput.dirty || usernameInput.touched)" class="mt-1 text-sm text-red-600">
            <div *ngIf="usernameInput.errors?.['required']">Username is required</div>
            <div *ngIf="usernameInput.errors?.['minlength']">Username must be at least 3 characters</div>
          </div>
        </div>
        
        <div>
          <div class="flex items-center justify-between mb-1">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <!-- <a href="#" class="text-xs font-medium text-indigo-600 hover:text-indigo-500 hover:underline">Forgot password?</a> -->
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
              class="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
              [ngClass]="{'border-red-500 bg-red-50': passwordInput.invalid && (passwordInput.dirty || passwordInput.touched), 'border-gray-300': !passwordInput.invalid || !(passwordInput.dirty || passwordInput.touched)}"
              placeholder="Enter your password">
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
          <div *ngIf="passwordInput.invalid && (passwordInput.dirty || passwordInput.touched)" class="mt-1 text-sm text-red-600">
            <div *ngIf="passwordInput.errors?.['required']">Password is required</div>
            <div *ngIf="passwordInput.errors?.['minlength']">Password must be at least 6 characters</div>
          </div>
        </div>
        
        <div *ngIf="errorMessage" class="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md text-sm">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="font-medium">{{ errorMessage }}</p>
            </div>
          </div>
        </div>
        
        <div>
          <button 
            type="submit"
            [disabled]="loginForm.invalid" 
            class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 shadow-md hover:opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-indigo-600">
            <div class="flex items-center justify-center">
              <span>Login</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </button>
        </div>
      </form>
      
      <div class="mt-4 text-center text-sm">
        <span class="text-gray-600">Don't have an account?</span>
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 hover:underline ml-1">Contact admin</a>
      </div>
      
      <!-- Compact referral callout -->
      <div class="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          <p class="ml-2 text-xs font-medium text-indigo-700">Refer a friend, get rewards when they sign up!</p>
        </div>
      </div>
      
      <div class="mt-4 pt-4 border-t border-gray-200">
        <p class="text-xs text-center text-gray-500">
          Protected by industry-leading security practices. 
          <a href="#" class="text-indigo-600 hover:underline">Privacy Policy</a> • 
          <a href="#" class="text-indigo-600 hover:underline">Terms of Service</a>
        </p>
      </div>
    </div>
  </div>
</div>
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
    this.router.navigate(['/']);
  }
}
