import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Referral } from "../../models/referral.model";
import { Router } from "@angular/router";
import { ReferralService } from "../../services/referral.service";

@Component({
  selector: "app-referrals",
  template: `
    <div class="min-h-screen bg-white p-6">
      <div class="p-4 flex items-center mb-6">
        <button
          (click)="goBack()"
          class="flex items-center space-x-2 px-4 py-2 hover:bg-blue-500 text-black rounded-lg shadow-lg transition-all absolute top-4 left-4"
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
      <button
        (click)="logout()"
        class="absolute top-4 right-4 bg-white hover:bg-blue-600 text-black font-semibold px-4 py-2 rounded-lg shadow-lg transition-all"
      >
        <i class="fas fa-lock mr-2"></i> Logout
      </button>
      <h1 class="text-3xl font-bold mb-6 text-center text-black">
        Referral Users
      </h1>
      <div class="flex justify-between items-center flex-wrap gap-4 mb-6">
        <!-- Search by Name -->
        <div class="relative flex items-center space-x-2">
          <!-- Input field -->
          <input
            [(ngModel)]="searchQuery"
            placeholder="Search by name..."
            class="px-4 py-2 pl-10 border rounded-lg shadow-md focus:ring focus:ring-blue-300"
            (input)="searchByName(searchQuery)"
          />

          <!-- Search icon inside the input -->
          <i class="fas fa-search absolute left-1 text-gray-500"></i>
        </div>

        <!-- Filter by Referred By and Date -->
        <div class="relative flex items-center gap-2">
          <div class="relative flex items-center">
            <input
              [(ngModel)]="referredBy"
              placeholder="Referred By..."
              class="px-4 py-2 border rounded-lg shadow-md focus:ring focus:ring-blue-300"
            />
            <!-- Search icon inside the input -->
            <i class="fas fa-search absolute right-3 text-gray-500"></i>
          </div>
          <input
            [(ngModel)]="startDate"
            type="date"
            class="px-4 py-2 border rounded-lg shadow-md focus:ring focus:ring-blue-300"
          />
          <input
            [(ngModel)]="endDate"
            type="date"
            class="px-4 py-2 border rounded-lg shadow-md focus:ring focus:ring-blue-300"
          />
          <button
            class="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
            (click)="filterAndSearchReferrals()"
          >
            Filter
          </button>
        </div>
      </div>

      <div *ngIf="isFilterApplied" class="flex items-center mb-4">
        <!-- Label with border and radius -->
        <span
          class="border border-gray-300 rounded-full py-2 px-4 text-gray-700 font-semibold mr-4"
        >
          Refeered By:
          {{ referredBy }}
          <button
            class="ms-4 text-black hover:text-black"
            (click)="clearReferredByFilter()"
          >
            <i class="fas fa-times"></i>
          </button>
        </span>
      </div>

      <!-- Referrals Table -->
      <div
        class="bg-gray-700 rounded-md shadow overflow-y-auto max-h-96 hide-scrollbar"
        *ngIf="referrals.length > 0; else noDataTemplate"
      >
        <table class="min-w-full">
          <thead class="bg-blue-600 sticky top-0 z-10">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-white uppercase"
              >
                ID
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-white uppercase"
              >
                Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-white uppercase"
              >
                Referred By
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-white uppercase"
              >
                Mobile
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-white uppercase"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-white uppercase"
              >
                View More
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white">
            @for (referral of referrals; track referral._id) {
            <tr>
              <td class="px-6 py-4  text-white">{{ referral._id }}</td>
              <td class="px-6 py-4  text-white">{{ referral.name }}</td>
              <td class="px-6 py-4  text-white">
                {{ referral.referredBy.name }}
              </td>
              <td class="px-6 py-4  text-white">{{ referral.mobile }}</td>
              <td class="px-6 py-4  text-slate-200">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    [checked]="referral.isActive"
                    (change)="toggleReferralStatus(referral)"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 
    rounded-full peer dark:bg-red-700 peer-checked:after:translate-x-full 
    peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
    after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
    after:transition-all dark:border-red-600 peer-checked:bg-green-500"
                  ></div>
                  <!-- <span
                    class="ml-3 text-sm font-medium text-red-900 dark:text-green-900"
                  >
                    {{ referral.isActive ? "Active" : "Inactive" }}
                  </span> -->
                </label>
              </td>
              <td class="px-6 py-4 cursor-pointer">
                <svg
                  (click)="showDetails(referral)"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 text-white"
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

      <ng-template #noDataTemplate>
        <div class="p-6 text-center bg-blue-400 rounded-lg">
          <h2 class="text-xl font-bold text-gray-800">No Data Available</h2>
          <p class="text-gray-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      </ng-template>

      <!-- Details Modal -->
      @if (selectedReferral) {
      <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">
            Referral Details
          </h2>
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
              <span class="text-gray-600">{{
                selectedReferral.qualification
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-semibold text-gray-700">Age:</span>
              <span class="text-gray-600">{{
                calculateAge(selectedReferral.dob)
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-semibold text-gray-700">Date:</span>
              <span class="text-gray-600">{{
                getFormattedDate(selectedReferral.createdAt)
              }}</span>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all shadow"
              (click)="selectedReferral = null"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      }
    </div>
  `,
})
export class ReferralsComponent {
  referrals: Referral[] = [];
  selectedReferral: Referral | null = null;
  searchQuery: string = "";
  startDate: string = "";
  endDate: string = "";
  referredBy: string = "";
  isFilterApplied: boolean = false;

  constructor(
    private router: Router,
    private referralService: ReferralService
  ) {
    this.getAllReferrals();
  }

  toggleReferralStatus(referral: Referral) {
    this.referralService
      .toggleReferralStatus(referral._id)
      .subscribe((updateReferral) => {
        console.log(updateReferral); // Update status locally
        this.getAllReferrals();
      });
  }

  goBack() {
    this.router.navigate(["/admin/dashboard"]);
  }

  showDetails(referral: Referral) {
    this.selectedReferral = referral;
  }

  getAllReferrals() {
    this.referralService.getAllReferrals().subscribe((res) => {
      this.referrals = res;
    });
  }

  logout() {
    this.router.navigate(["/auth/login"]);
  }

  getFormattedDate(date: Date | string): string {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return parsedDate.toISOString().split("T")[0];
  }

  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  searchByName(searchQuery: string) {
    if (!searchQuery.trim()) {
      this.getAllReferrals(); // If the search query is empty, fetch all referrals
      return;
    }

    this.referralService.searchByName(searchQuery.trim()).subscribe(
      (res) => {
        this.referrals = res; // Set the filtered referrals
      },
      (error) => {
        console.error("Error searching referrals:", error);
      }
    );
  }

  filterAndSearchReferrals() {
    // If no filter is applied, return early
    if (!this.referredBy.trim() && !this.startDate && !this.endDate) {
      this.getAllReferrals(); // If the search query is empty, fetch all referrals
      return;
    }

    // Call the service method to get filtered referrals
    this.referralService
      .searchReferralsByReferredBy(
        this.referredBy,
        this.startDate,
        this.endDate
      )
      .subscribe(
        (referrals) => {
          console.log(referrals);

          this.referrals = referrals; // Assign the filtered referrals to the component
          this.isFilterApplied = true;
        },
        (error) => {
          console.error("Error fetching filtered referrals:", error);
        }
      );
  }

  clearReferredByFilter() {
    this.isFilterApplied = false;
    this.referredBy = "";
    this.getAllReferrals(); // Fetch all referrals again
  }
}
