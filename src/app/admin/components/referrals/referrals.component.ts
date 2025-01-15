import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Referral } from '../../models/referral.model';
import { Router } from '@angular/router';
import { ReferralService } from '../../services/referral.service';

@Component({
  selector: 'app-referrals',
  template: `
    <div class="min-h-screen bg-blue-900 p-6">
    <div class="p-4 flex items-center mb-6">
      <button (click)="goBack()" class="flex items-center space-x-2 px-4 py-2 hover:bg-blue-500 text-white rounded-lg shadow-lg transition-all absolute top-4 left-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back</span>
      </button>
    </div>
      <h1 class="text-3xl font-bold mb-6 text-center text-blue-400">Referral Users</h1>

      <!-- Referrals Table -->
      <div class="bg-gray-300 rounded-md shadow overflow-hidden">
        <table class="min-w-full">
          <thead class="bg-gray-300">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-black uppercase">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-black uppercase">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-black uppercase">Referred By</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-black uppercase">Mobile</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-black uppercase">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-black uppercase">View More</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-black">
            @for (referral of referrals; track referral._id) {
              <tr>
                <td class="px-6 py-4  text-black">{{ referral._id }}</td>
                <td class="px-6 py-4  text-black">{{ referral.name }}</td>
                <td class="px-6 py-4  text-black">{{ referral.referredBy.name }}</td>
                <td class="px-6 py-4  text-black">{{ referral.mobile }}</td>
                <!-- <td class="px-6 py-4  text-slate-200">
                  <button 
                    (click)="toggleReferralStatus(referral)"
                    [class]="referral.status ? 'toggle toggle-active' : 'toggle toggle-inactive'">
                    <span 
                      [class]="referral.status ? 'translate-x-6' : 'translate-x-1'"
                      class="inline-block h-4 w-4 transform rounded-full bg-white transition">
                    </span>
                  </button>
                </td> -->
                <td class="px-6 py-4">
                <svg
                (click)="showDetails(referral)"
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
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Details Modal -->
      @if (selectedReferral) {
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
      <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">Referral Details</h2>
      <div class="mb-6 space-y-4">
        <div class="flex justify-between items-center">
          <span class="font-semibold text-gray-700">Email:</span>
          <span class="text-gray-600">{{ selectedReferral.email }}</span>
        </div>  
        <div class="flex justify-between items-center">
          <span class="font-semibold text-gray-700">Place:</span>
          <span class="text-gray-600">{{ selectedReferral.place }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-semibold text-gray-700">Qualification:</span>
          <span class="text-gray-600">{{ selectedReferral.qualification }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-semibold text-gray-700">Age:</span>
          <span class="text-gray-600">{{ selectedReferral.age }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-semibold text-gray-700">Date:</span>
          <span class="text-gray-600">{{ getFormattedDate(selectedReferral.createdAt) }}</span>
        </div>
      </div>
      <div class="flex justify-end">
        <button 
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all shadow"
          (click)="selectedReferral = null">
          Close
        </button>
      </div>
    </div>
  </div>
}
    </div>
  `
})
export class ReferralsComponent {
  referrals: Referral[] = [];
  selectedReferral: Referral | null = null;

  constructor(private router: Router, private referralService: ReferralService) {
    this.getAllReferrals();
  }

  // toggleReferralStatus(referral: Referral) {
  //   referral.status = !referral.status;
  //   // Add API call to update referral status
  // }

  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }

  showDetails(referral: Referral) {
    this.selectedReferral = referral;
  }

  getAllReferrals() {
    this.referralService.getAllReferrals().subscribe((res) => {
      this.referrals = res;
    })
  }

  getFormattedDate(date: Date | string): string {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return parsedDate.toISOString().split('T')[0];
  }
}