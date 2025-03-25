import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReferralService } from "../../services/referral.service";
import { Referral } from "../../models/user";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../auth/service/auth.service";

@Component({
  selector: "app-referrals",
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-7xl mx-auto">
        <!-- Header and Action Buttons -->
        <div class="flex justify-between items-center mb-8">
          <button
            (click)="goBack()"
            class="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white rounded-lg shadow-md transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back</span>
          </button>

          <!-- <button
            (click)="logout()"
            class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-all"
          >
            Logout
          </button> -->
        </div>

        <!-- Referrals Container -->
        <div class="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div class="p-6 bg-gray-50 border-b border-gray-200">
            <h2
              class="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            >
              My Referrals
            </h2>

            <!-- Filtering and Search -->
            <div
              class="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
            >
              <div class="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search referrals..."
                  [(ngModel)]="searchQuery"
                  (input)="filterReferrals()"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <select
                [(ngModel)]="statusFilter"
                (ngModelChange)="filterReferrals()"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="All">All Status</option>
                <option value="Attended">Attended</option>
                <option value="Not-Attended">Not-Attended</option>
                <option value="Joined">Joined</option>
                <option value="Registered">Registered</option>
              </select>
            </div>
          </div>

          <!-- Referrals Table -->
          <div *ngIf="filteredReferrals.length" class="overflow-x-auto">
            <table class="w-full">
              <thead
                class="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              >
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Mobile
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    View
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  *ngFor="let referral of filteredReferrals"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ referral.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ referral.mobile }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      [ngClass]="{
                        'bg-green-100 text-green-800':
                          referral.attendanceStatus === 'Attended',
                        'bg-red-100 text-red-800':
                          referral.attendanceStatus === 'Not-Attended',
                        'bg-blue-100 text-blue-800':
                          referral.attendanceStatus === 'Registered',
                        'bg-yellow-100 text-yellow-800':
                          referral.attendanceStatus === 'Joined'
                      }"
                      class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                    >
                      {{ referral.attendanceStatus }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      (click)="showDetails(referral)"
                      class="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Referral Details Modal -->
        <div
          *ngIf="selectedReferral"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div
            class="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative"
          >
            <button
              (click)="selectedReferral = null"
              class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2
              class="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Referral Details
            </h2>

            <div class="space-y-4">
              <div class="flex justify-between border-b pb-2">
                <span class="font-semibold text-gray-700">Email</span>
                <span class="text-gray-900">{{ selectedReferral.email }}</span>
              </div>
              <div class="flex justify-between border-b pb-2">
                <span class="font-semibold text-gray-700">Place</span>
                <span class="text-gray-900">{{ selectedReferral.place }}</span>
              </div>
              <div class="flex justify-between border-b pb-2">
                <span class="font-semibold text-gray-700">Qualification</span>
                <span class="text-gray-900">{{
                  selectedReferral.qualification
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-semibold text-gray-700">Pass Out Year</span>
                <span class="text-gray-900">{{ selectedReferral.passOutYear | date:'yyyy' }}</span>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ReferralsComponent implements OnInit {
  referrals: Referral[] = [];
  selectedReferral: Referral | null = null;
  searchQuery: string = "";
  filteredReferrals: Referral[] = [];
  statusFilter: string = "All";
  isLoading: boolean = true;
  
  constructor(
    private referralService: ReferralService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  
  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get("userId")!;
    this.getReferralsByUserId(userId);
  }
  
  getReferralsByUserId(userId: string) {
    this.isLoading = true;
    this.referralService.getReferralsByUserId(userId).subscribe(
      (data) => {
        this.referrals = data;
        this.filteredReferrals = [...this.referrals]; // Create a copy of all referrals
        this.statusFilter = "All";
        this.isLoading = false;
        this.filterReferrals(); // Apply initial filtering
      },
      (error) => {
        console.error("Error fetching referrals", error);
        this.isLoading = false;
      }
    );
  }
  
  filterReferrals() {
    if (!this.referrals.length) return;
  
    this.filteredReferrals = this.referrals.filter((referral) => {
      const matchesSearch =
        !this.searchQuery ||
        referral.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        referral.mobile.includes(this.searchQuery) ||
        referral.email.toLowerCase().includes(this.searchQuery.toLowerCase());
  
      const matchesStatus =
        !this.statusFilter || 
        this.statusFilter === 'All' || 
        referral.attendanceStatus === this.statusFilter;
  
      return matchesSearch && matchesStatus;
    });
  }
  
  // Other existing methods remain the same
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
    this.authService.logout();
    this.router.navigate(["/auth/login"]);
  }
  
  searchByName(searchQuery: string) {
    this.referralService.seachReferralByUserId(searchQuery).subscribe(
      (res) => {
        this.referrals = res;
        this.filteredReferrals = [...this.referrals];
        this.filterReferrals();
      },
      (error) => {
        console.error("Error searching referrals:", error);
      }
    );
  }
}
