import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/service/auth.service';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  template: `

<div class="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 flex items-center justify-center">
  <div class="max-w-6xl w-full">
    <button (click)="logout()" class="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all">
    <i class="fas fa-lock mr-2"></i>
      Logout
    </button>

    <!-- Welcome Header -->
    <h2 class="text-4xl font-extrabold text-white mb-10 text-center">
      Welcome, {{ (currentUser$ | async)?.name }}!
    </h2>

    <!-- Get Link Button -->
    <div class="mt-6 flex justify-center">
      <button (click)="generateLink()" class="w-full max-w-xs md:max-w-md bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 hover:from-blue-500 hover:via-purple-600 hover:to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
        Get Link
      </button>
    </div>

    <!-- Modal -->
    <div *ngIf="generatedLink" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div class="bg-white p-6 rounded-lg w-full max-w-sm relative">
        <button (click)="closePopup()" class="absolute top-2 right-2 text-gray-500 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="text-center">
          <p class="text-lg text-gray-800 mb-4">Your referral link:</p>
          <div class="relative flex items-center justify-center space-x-2">
            <input type="text" readonly [value]="generatedLink" class="bg-gray-100 px-4 py-2 rounded-lg text-gray-800 w-full" />
            <button (click)="copyToClipboard(generatedLink)" class="p-2 rounded-lg hover:bg-gray-200">
            <span
              *ngIf="copied"
              class="absolute top-[-30px] bg-white text-black text-xs px-2 py-1 rounded-lg"
              style="transition: opacity 0.3s ease-in-out;"
            >
              Copied!
            </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
              </svg>
            </button>
            <!-- Tooltip -->
          </div>
        </div>
      </div>
    </div>

    <!-- Cards Grid -->
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-center items-center mt-8">
      <!-- Form Card -->
      <a [routerLink]="'/user/form'" class="block bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer w-full max-w-xs md:max-w-md">
        <div class="flex flex-col items-center">
          <div class="text-blue-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-blue-500 mx-auto">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 0 0 2.25 2.25h.75m0-3H12m-.75 3h3.75m-3.75 0V18" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800">View Form</h3>
        </div>
      </a>

      <!-- Referrals Card -->
      <a [routerLink]="['/user/referrals', getUserId()]"
       class="block bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer w-full max-w-xs md:max-w-md">
        <div class="flex flex-col items-center">
          <div class="text-purple-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-purple-500 mx-auto">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>

          </div>
          <h3 class="text-xl font-semibold text-gray-800">Referrals</h3>
        </div>
      </a>
    </div>
  </div>
</div>
  `
})
export class DashboardComponent implements OnInit {
  currentUser$: BehaviorSubject<any> = new BehaviorSubject<any>(null); 
  generatedLink: string = '';
  copied: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private clipboard: Clipboard,
  ) { 
    
  }

  ngOnInit(): void {
    // Check if user data is available in the localStorage and set it
    const storedUser = this.authService.getStoredUser();
    if (storedUser) {
      this.currentUser$.next(storedUser); // Set data from localStorage
    } else {
      // Handle scenario if no data is found in localStorage (e.g., redirect to login)
      this.router.navigate(['/auth/login']);
    }
  }

  goBack() {
    this.router.navigate(['/auth/login']);
  }

  getUserId() {
    let userId: string = '';
    this.currentUser$.subscribe(user => {
      if (user) {
        userId = user._id;
      }
    });
    return userId;
  }

  generateLink() { 
    // this.currentUser$.subscribe(user => {
    //   if (user) {
    //     this.generatedLink = `http://localhost:4200/refer?ref=${user._id}`;
    //   }
    // });
    const user = this.currentUser$.getValue(); // Get the current user value
    if (user) {
      this.generatedLink = `http://localhost:4200/refer?ref=${user._id}`;
    }
  }

  closePopup() {
    this.generatedLink = '';
  }

  copyToClipboard(link: string) { 
    this.clipboard.copy(link);
    this.copied = true; // Show tooltip
    setTimeout(() => this.copied = false, 2000); // Hide tooltip after 2 seconds
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}