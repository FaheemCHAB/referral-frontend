import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from "ngx-intl-tel-input";

@Component({
  selector: "app-users",
  template: `
    <div class="min-h-screen bg-blue-900 p-6">
      <div class="p-4 flex items-center mb-6">
        <button
          (click)="goBack()"
          class="flex items-center space-x-2 px-4 py-2 hover:bg-blue-500 text-white rounded-lg shadow-lg transition-all absolute top-4 left-4"
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
      <div class="flex justify-center items-center mb-6">
        <h1 class="text-3xl font-bold text-white text-center">Users</h1>
      </div>
      <div class="flex justify-end mb-6 items-center">
        <!-- <input
      type="text"
    
      placeholder="Search by username"
      class="px-4 py-2 rounded-lg shadow-lg w-1/3"
    /> -->
        <button
          class="px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-500 focus:ring-4 focus:ring-blue-300"
          (click)="showCreateUserModal = true"
        >
          Create User
        </button>
      </div>

      <!-- Users Table -->
      <div class="bg-blue-800 rounded-lg shadow overflow-hidden">
        <div class="overflow-auto max-h-[400px] hide-scrollbar">
          <!-- Add this wrapper div -->
          <table class="min-w-full">
            <thead class="bg-blue-800">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-slate-200 uppercase"
                >
                  Name
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-slate-200 uppercase"
                >
                  Email
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-slate-200 uppercase"
                >
                  Mobile
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-slate-200 uppercase"
                >
                  Username
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-slate-200 uppercase"
                >
                  Password
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-slate-200 uppercase"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              @for (user of users; track user._id) {
              <tr>
                <td class="px-6 py-4 text-slate-200">{{ user.name }}</td>
                <td class="px-6 py-4 text-slate-200">{{ user.email }}</td>
                <td class="px-6 py-4 text-slate-200">{{ user.mobile }}</td>
                <td class="px-6 py-4 text-slate-200">{{ user.username }}</td>
                <td class="px-6 py-4 text-slate-200">{{ user.password }}</td>
                <td class="px-6 py-4 text-slate-200">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    [checked]="user.isActive"
                    (change)="toggleUserStatus(user)"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 
    rounded-full peer dark:bg-red-700 peer-checked:after:translate-x-full 
    peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
    after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
    after:transition-all dark:border-red-600 peer-checked:bg-green-500"
                  ></div>
                  <!-- <span
                    class="ml-3 text-sm font-medium text-red-900 dark:text-gray-300"
                  >
                    {{ user.isActive ? "Active" : "Inactive" }}
                  </span> -->
                </label>
                </td>
              </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Create User Modal -->
      @if (showCreateUserModal) {
      <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div class="bg-white p-6 rounded-lg w-96">
          <h2 class="text-2xl font-bold mb-4">Create User</h2>
          <form (ngSubmit)="createUser()">
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                [(ngModel)]="formData.name"
                name="name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                #name="ngModel"
              />
              <small class="text-red-500" *ngIf="name.invalid && name.touched">
                Name is required.
              </small>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                [(ngModel)]="formData.email"
                name="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                email
                #email="ngModel"
              />
              <small
                class="text-red-500"
                *ngIf="email.invalid && email.touched"
              >
                Valid email is required.
              </small>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Mobile</label>
              <ngx-intl-tel-input
                [cssClass]="
                  'p-6 bg-white rounded-lg shadow-md max-w-md mx-auto'
                "
                [preferredCountries]="[
                  CountryISO.UnitedStates,
                  CountryISO.UnitedKingdom
                ]"
             
                [enablePlaceholder]="true"
                [searchCountryFlag]="true"
                [searchCountryField]="[
                  SearchCountryField.Iso2,
                  SearchCountryField.Name
                ]"
                [selectFirstCountry]="false"
                [selectedCountryISO]="CountryISO.India"
                [separateDialCode]="true"
                [maxLength]="12"
                [numberFormat]="PhoneNumberFormat.National"
                [phoneValidation]="true"
                [(ngModel)]="formData.mobile"
                #mobile="ngModel"
                name="mobile"
              >
              </ngx-intl-tel-input>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                [(ngModel)]="formData.username"
                name="username"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                #username="ngModel"
              />
              <small
                class="text-red-500"
                *ngIf="username.invalid && username.touched"
              >
                Username is required.
              </small>
            </div>
            <div class="mb-6 relative">
              <label class="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                [type]="showPassword ? 'text' : 'password'"
                [(ngModel)]="formData.password"
                name="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                minlength="6"
                required
                #password="ngModel"
              />
              <span
                class="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer translate-y-4"
                (click)="togglePasswordVisibility()"
              >
                <svg
                  *ngIf="!showPassword"
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
              </span>
              <small
                class="text-red-500"
                *ngIf="password.invalid && password.touched"
              >
                Password must be at least 6 characters.
              </small>
            </div>
            <div class="flex justify-end gap-4">
              <button
                type="button"
                class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                (click)="showCreateUserModal = false"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      }
    </div>
  `,
})
export class UsersComponent {
  users: User[] = [];
  showCreateUserModal = false;
  newUser: Partial<User & { password: string }> = {};
  showPassword = false;
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  formData = {
    name: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
  };

  constructor(private userService: UserService, private router: Router) {
    this.getAllUsers();
  }

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleUserStatus(user: User) {
    this.userService.toggleUserStatus(user._id).subscribe((updatedUser) => {
      console.log(updatedUser); // Update status locally
      this.getAllUsers();
    });
  }

  createUser() {
    this.userService.createUser(this.formData).subscribe((newUser: any) => {
      console.log(newUser);
      this.users.push(newUser); // Add the new user to the end of the array
      this.showCreateUserModal = false; // Close the modal
      this.resetFormData(); // Reset the form for future use
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
  }

  goBack() {
    this.router.navigate(["/admin/dashboard"]);
  }

  resetFormData() {
    this.formData = {
      name: "",
      email: "",
      mobile: "",
      username: "",
      password: "",
    };
  }
}
