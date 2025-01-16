import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReferralService } from "../../services/referral.service";
import { Referral } from "../../models/user";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-referrals",
  template: `
<div class="h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
  <div class="p-4 flex justify-between items-center">
    <button 
      (click)="goBack()" 
      class="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      <span>Back</span>
    </button>
  </div>

  <button (click)="logout()" class="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all">
      Logout
    </button>

  <div *ngIf="referrals.length > 0; else noReferrals" class="max-w-6xl mx-auto p-6">
  <div class="bg-white rounded-xl shadow-lg p-8">
    <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">My Referrals</h2>
    <div class="overflow-y-auto max-h-96 hide-scrollbar">
      <table class="min-w-full divide-y divide-gray-200 table-auto">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-semibold tracking-wide">ID</th>
            <th class="px-4 py-2 text-left text-sm font-semibold tracking-wide">Name</th>
            <th class="px-4 py-2 text-left text-sm font-semibold tracking-wide">Mobile</th>
            <th class="px-4 py-2 text-left text-sm font-semibold tracking-wide">Status</th>
            <th class="px-4 py-2 text-left text-sm font-semibold tracking-wide">Action</th>

          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr *ngFor="let referral of referrals" class="hover:bg-gray-100 transition-colors">
            <td class="px-4 py-2 text-sm text-gray-800">{{ referral._id }}</td>
            <td class="px-4 py-2 text-sm text-gray-800">{{ referral.name }}</td>
            <td class="px-4 py-2 text-sm text-gray-800">{{ referral.mobile }}</td>
            <td 
              class="px-4 py-2 text-sm font-medium"
              [ngClass]="referral.isActive ? 'text-green-600' : 'text-red-600'">
              {{ referral.isActive ? 'Active' : 'Inactive' }}
            </td> 
            <td class="px-6 py-4 cursor-pointer">
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
</div>

<ng-template #noReferrals>
  <div class="max-w-6xl mx-auto p-6">
    <div class="bg-white rounded-xl shadow-lg p-8 text-center">
      <h2 class="text-3xl font-bold text-gray-800">No Referrals Found</h2>
      <p class="text-gray-600 mt-4">You currently have no referrals. Once you refer someone, they will appear here.</p>
    </div>
  </div>
</ng-template>
</div>
  `,
})
export class ReferralsComponent {
  referrals: Referral[] = [];
  selectedReferral: Referral | null = null;

  constructor(
    private referralService: ReferralService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userId')!;
    this.getReferralsByUserId(userId);
  }

  toggleStatus(id: string) {
    this.referralService.toggleStatus(id);
  }

  showDetails(referral: Referral) {
    this.selectedReferral = referral;
  }
  goHome() {
    this.router.navigate(["/dashboard"]);
  }

  goBack() {
    window.history.back();
  }

  logout() {
    this.router.navigate(['/login']);
  }

  getReferralsByUserId(userId: string) {
    this.referralService.getReferralsByUserId(userId).subscribe(
      (data) => {
        this.referrals = data;
        console.log(this.referrals);
        
      },
      (error) => {
        console.error('Error fetching referrals', error);
      }
    );
  }
}
