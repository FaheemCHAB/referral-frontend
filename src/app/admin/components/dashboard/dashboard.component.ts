import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="min-h-screen bg-blue-800 flex items-center justify-center p-6">
    <div class="p-4 flex items-center mb-6">
      <button (click)="goBack()" class="flex items-center space-x-2 px-4 py-2 hover:bg-blue-500 text-white rounded-lg shadow-lg transition-all absolute top-4 left-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back</span>
      </button>
    </div>
      <div class="text-center max-w-3xl w-full">
        <h1 class="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            class="card cursor-pointer bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
            routerLink="/admin/users"
          >
          <img src="../../../../assets/images/ref.png" alt="" srcset="">
       

            <h2 class="text-xl font-semibold text-gray-800 mb-2">View Users</h2>
          </div>
          <div
            class="card cursor-pointer bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
            routerLink="/admin/referrals"
          >
            <img src="../../../../assets/images/ref.png" alt="" srcset="">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">View Referrals</h2>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {

  constructor(private router: Router){}
  goBack() {
    this.router.navigate(['/auth/login']);
  }
}