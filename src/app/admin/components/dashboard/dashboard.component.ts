import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-dashboard",
  template: `
    <div class="min-h-screen bg-white flex items-center justify-center p-6">
            <!-- Logo -->
            <a href="https://aitrichacademy.com/" target="_blank" rel="noopener noreferrer">
      <img
        src="../../../../assets/images/aitrich.png"
        class="absolute top-1 left-4 w-80 h-50"
        alt="Aitrich Logo"
      />
       </a>
      <button
        (click)="logout()"
        class="absolute top-4 right-4 bg-white hover:bg-blue-600 text-black font-semibold px-4 py-2 rounded-lg shadow-lg transition-all"
      >
        <i class="fas fa-lock mr-2 text-blue-900"></i> Logout
      </button>
      <div class="text-center max-w-3xl w-full">
        <h1 class="text-4xl font-bold text-blue-900 mb-8 top-7">Admin Dashboard</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div
            class="card cursor-pointer bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
            routerLink="/admin/users"
          >
            <div class="flex justify-center mb-4">
              <img src="../../../../assets/images/users.png" alt="Users" class="w-60 h-50" />
            </div>

            <h2 class="text-xl font-semibold text-blue-900 mb-2">View Users</h2>
          </div>
          <div
            class="card cursor-pointer bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
            routerLink="/admin/referrals"
          >
            <div class="flex justify-center mb-4">
              <img
                src="../../../../assets/images/referrals.png"
                alt="Referrals"
                class="w-60 h-50"
              />
            </div>
            <h2 class="text-xl font-semibold text-blue-900 mb-2 mt-4">
              View Referrals
            </h2>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  constructor(private router: Router) {}

  logout() {
    this.router.navigate(["/auth/login"]);
  }
}
