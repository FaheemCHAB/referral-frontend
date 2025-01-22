import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
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
      <div class="flex justify-center items-center mb-6">
        <h1 class="text-3xl font-bold text-black text-center">Users</h1>
      </div>

      <div class="flex justify-between items-center gap-6 mb-6">
        <!-- Left Section: Search and Date Filters -->
        <div class="flex items-center gap-6">
          <!-- Search Input -->
          <div class="relative">
          <input
            type="text"
            placeholder="      Search users..."
            class="px-4 py-2 rounded-lg shadow-lg min-w-[300px] border focus:ring-2 focus:ring-blue-300"
            [(ngModel)]="searchQuery"
            (input)="searchUsers(searchQuery)"
          />
          <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>

          </div>

          <!-- Date Filters and Filter Button -->
          <div class="flex gap-4 items-center">
            <div class="flex items-center gap-2">
              <label for="startDate" class="font-medium">Start Date:</label>
              <input
                id="startDate"
                type="date"
                class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
                [(ngModel)]="startDate"
              />
            </div>

            <div class="flex items-center gap-2">
              <label for="endDate" class="font-medium">End Date:</label>
              <input
                id="endDate"
                type="date"
                class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
                [(ngModel)]="endDate"
              />
            </div>

            <button
              class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              (click)="filterUsersByDateRange(startDate, endDate)"
            >
              Filter
            </button>
          </div>
        </div>

        <!-- Right Section: Create User Button -->
        <button
          class="px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-500 focus:ring-4 focus:ring-blue-300"
          (click)="showCreateUserModal = true"
        >
          Create User
        </button>
      </div>

      <!-- Users Table -->
      <div class="bg-gray-700 rounded-lg shadow overflow-hidden">
        <div class="overflow-auto max-h-[400px] hide-scrollbar">
          <!-- Add this wrapper div -->
          <table class="min-w-full">
            <thead class="bg-blue-600 sticky top-0 z-10">
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
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-slate-200 uppercase"
                >
                  Edit
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
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
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
                  </label>
                </td>

                <td class="px-6 py-4">
                  <svg
                    (click)="editUser(user)"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-white cursor-pointer hover:text-blue-400 transition duration-200"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487c.426-.425 1.115-.425 1.54 0l1.11 1.11c.425.425.425 1.114 0 1.539l-9.193 9.193-2.774.693a.75.75 0 0 1-.92-.92l.693-2.774 9.193-9.193ZM19.5 11.25v6a2.25 2.25 0 0 1-2.25 2.25h-12a2.25 2.25 0 0 1-2.25-2.25v-12A2.25 2.25 0 0 1 5.25 3h6"
                    />
                  </svg>
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
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg w-96">
          <h2 class="text-2xl font-bold mb-4">Create User</h2>
          <form (ngSubmit)="createUser()" #userForm="ngForm" novalidate>
            <!-- Name -->
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                [(ngModel)]="formData.name"
                name="name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                minlength="3"
                maxlength="50"
                pattern="^[a-zA-Z]+( [a-zA-Z]+)*$"
                #name="ngModel"
              />
              <div class="text-red-500 min-h-[1rem]">
                <small
                  *ngIf="name.invalid && (name.touched || userForm.submitted)"
                >
                  Name is required and must be 3-50 alphabetic characters.
                </small>
              </div>
            </div>

            <!-- Email -->
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
              <div class="text-red-500 min-h-[1rem]">
                <small
                  *ngIf="email.invalid && (email.touched || userForm.submitted)"
                >
                  A valid email address is required.
                </small>
                <p *ngIf="errorMessages?.email" class="text-red-500 text-sm">
                  {{ errorMessages.email }}
                </p>
              </div>
            </div>

            <!-- Mobile -->
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Mobile</label>
              <ngx-intl-tel-input
                [cssClass]="
                  'w-full px-4 py-2 border border-gray-300 rounded-lg'
                "
                 [preferredCountries]="preferredCountries"
                [enablePlaceholder]="true"
                [searchCountryFlag]="true"
                [selectedCountryISO]="CountryISO.India"
                [searchCountryField]="[
                  SearchCountryField.Iso2,
                  SearchCountryField.Name
                ]"
                [separateDialCode]="true"
                [phoneValidation]="true"
                [maxLength]="12"
                [(ngModel)]="formData.mobile"
                name="mobile"
                required
                #mobile="ngModel"
              ></ngx-intl-tel-input>
              <div class="text-red-500 min-h-[1rem]">
                <small
                  *ngIf="
                    mobile.invalid && (mobile.touched || userForm.submitted)
                  "
                >
                  A valid mobile number is required.
                </small>
                <p *ngIf="errorMessages?.mobile" class="text-red-500 text-sm">
                  {{ errorMessages.mobile }}
                </p>
              </div>
            </div>

            <!-- Username -->
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                [(ngModel)]="formData.username"
                name="username"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                minlength="3"
                maxlength="50"
                pattern="^[_@!*-]?[A-Za-z0-9_@!*-]{2,49}$"
                #username="ngModel"
              />
              <div class="text-red-500 min-h-[1rem]">
                <small
                  *ngIf="
                    username.invalid && (username.touched || userForm.submitted)
                  "
                >
                  Username must be 3-50 characters and can start with _ or
                  &commat; and can contain letters, numbers, underscores, or
                  &commat;.
                </small>
                <p *ngIf="errorMessages?.username" class="text-red-500 text-sm">
                  {{ errorMessages.username }}
                </p>
              </div>
            </div>

            <!-- Password -->
            <div class="mb-6 relative">
              <label class="block text-gray-700 mb-2">Password</label>
              <input
                [type]="showPassword ? 'text' : 'password'"
                [(ngModel)]="formData.password"
                name="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              <div class="text-red-500 min-h-[1rem]">
                <small
                  *ngIf="
                    password.invalid && (password.touched || userForm.submitted)
                  "
                >
                  Password must be at least 6 characters.
                </small>
                <p *ngIf="errorMessages?.password" class="text-red-500 text-sm">
                  {{ errorMessages.password }}
                </p>
              </div>
            </div>

            <!-- Submit and Cancel Buttons -->
            <div class="flex justify-end gap-4">
              <button
                type="button"
                class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                (click)="cancel(userForm)"
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
      <!-- Edit User Modal -->
      @if (showEditUserModal) {
      <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div class="bg-white p-6 rounded-lg w-96">
          <h2 class="text-2xl font-bold mb-4">Edit User</h2>
          <form (ngSubmit)="updateUser()" #userForm="ngForm">
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                [(ngModel)]="formData.name"
                name="name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                pattern="^[a-zA-Z]+( [a-zA-Z]+)*$"
                #name="ngModel"
              />
              <small
                class="text-red-500"
                *ngIf="name.invalid && (name.touched || userForm.submitted)"
              >
                Name is required and must be 3-50 alphabetic characters.
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
                #email="ngModel"
                email
              />
              <small
                class="text-red-500"
                *ngIf="email.invalid && (email.touched || userForm.submitted)"
              >
                A valid email address is required.
              </small>
              <p *ngIf="errorMessages?.email" class="text-red-500 text-sm">
                {{ errorMessages.email }}
              </p>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Mobile</label>
              <ngx-intl-tel-input
                [preferredCountries]="preferredCountries"
                [cssClass]="
                  'p-6 bg-white rounded-lg shadow-md max-w-md mx-auto'
                "
                [(ngModel)]="formData.mobile"
                name="mobile"
                #mobile="ngModel"
                required
              ></ngx-intl-tel-input>
              <small
                class="text-red-500"
                *ngIf="mobile.invalid && (mobile.touched || userForm.submitted)"
              >
                A valid mobile number is required.
              </small>
              <p *ngIf="errorMessages?.mobile" class="text-red-500 text-sm">
                {{ errorMessages.mobile }}
              </p>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                [(ngModel)]="formData.username"
                name="username"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                minlength="3"
                maxlength="50"
                pattern="^[_@]?[A-Za-z0-9_@]{2,49}$"
                #username="ngModel"
              />
              <small
                class="text-red-500"
                *ngIf="
                  username.invalid && (username.touched || userForm.submitted)
                "
              >
                Username must be 3-50 characters and can start with _ or
                &commat; and can contain letters, numbers, underscores, or
                &commat;.
              </small>
              <p *ngIf="errorMessages?.username" class="text-red-500 text-sm">
                {{ errorMessages.username }}
              </p>
            </div>
            <div class="mb-4 relative">
              <label class="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                [type]="showPassword ? 'text' : 'password'"
                [(ngModel)]="formData.password"
                name="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                *ngIf="
                  password.invalid && (password.touched || userForm.submitted)
                "
              >
                Password must be at least 6 characters.
              </small>
            </div>
            <div class="flex justify-end gap-4">
              <button
                type="button"
                class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                (click)="cancel(userForm)"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save Changes
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
  showEditUserModal = false;
  errorMessages = {
    mobile: "",
    email: "",
    username: "",
    password: "",
  };
  generalErrorMessage = "";
  newUser: Partial<User & { password: string }> = {};
  showPassword = false;
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.India];
  searchQuery: string = "";
  startDate: string = "";
  endDate: string = "";
  @ViewChild("userForm") userForm!: NgForm;

  formData = {
    name: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
  };
// control: AbstractControl<string|null,string|null>|FormControl<any>|null;

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
    // Check form validity first
    if (this.userForm.invalid) {
      Object.keys(this.userForm.controls).forEach((key) => {
        const control = this.userForm.controls[key];
        if (control) {
          control.markAsTouched();
        }
      });
      return;
    }

    // If form is valid, proceed with API call
    this.userService.createUser(this.formData).subscribe(
      (newUser: any) => {
        console.log("User created:", newUser);
        this.users.push(newUser);
        this.showCreateUserModal = false;
        this.resetFormData();
        this.errorMessages = {
          email: "",
          mobile: "",
          username: "",
          password: "",
        }; // Clear previous errors
      },
      (error) => {
        console.error("Error creating user:", error);
        if (error.error?.errors) {
          // Set field-specific errors
          this.errorMessages = error.error.errors;

          // If there's a password-specific error, handle it properly
          if (error.error.errors.password) {
            this.errorMessages.password = error.error.errors.password;
          }
        } else {
          // For general errors
          this.generalErrorMessage =
            error.error?.message || "An error occurred. Please try again.";
        }
      }
    );
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
  }

  goBack() {
    this.router.navigate(["/admin/dashboard"]);
  }

  logout() {
    this.router.navigate(["/auth/login"]);
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

  editUser(user: User) {
    this.formData = { ...user }; // Populate the form with user details
    this.showEditUserModal = true; // Show the edit modal
  }

  updateUser() {
    this.userService.updateUser(this.formData).subscribe((updatedUser) => {
      const index = this.users.findIndex((u) => u._id === updatedUser._id);
      if (index !== -1) {
        this.users[index] = updatedUser; // Update the user in the local array
      }
      this.showEditUserModal = false; // Close the modal
      this.getAllUsers();
      this.resetFormData(); // Reset the form
    });
  }

  cancel(form: NgForm) {
    // Reset the form
    form.resetForm(); // Resets the form values and states
    this.showCreateUserModal = false; // Close the modal
    this.showEditUserModal = false;
  }

  searchUsers(searchTerm: string) {
    if (!searchTerm.trim()) {
      // If search is empty, fetch all users
      this.getAllUsers();
      return;
    }

    this.userService.searchUsers(searchTerm).subscribe(
      (res) => {
        this.users = res;
      },
      (error) => {
        console.error("Error searching users:", error);
      }
    );
  }

  filterUsersByDateRange(startDate: string, endDate: string) {
    this.userService
      .getUsersByDateRange(startDate, endDate)
      .subscribe((res) => {
        this.users = res;
      });
  }
}
