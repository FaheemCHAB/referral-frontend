import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-form-elements',
  template: `
       <div class="p-4 flex justify-between items-center">
    <button 
      (click)="goBack()" 
      class="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-blue-700 text-black rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      <span>Back</span>
    </button>
  </div>
     <div class="relative min-h-screen bg-white overflow-hidden">
      <!-- Logo -->
      <img
        src="../../../../assets/images/aitrich.png"
        class="absolute top-1 left-4 w-80 h-50"
        alt="Aitrich Logo"
      />
      <div class="absolute inset-0">
        <svg
          class="absolute bottom-0 "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#1E3A8A"
            fill-opacity="1"
            d="M0,96L60,112C120,128,240,160,360,165.3C480,171,600,149,720,128C840,107,960,85,1080,90.7C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      <!-- Form Section -->
      <div
        
        class="relative z-10 max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg"
      >
        <form
          #referralForm="ngForm"
          class="max-w-2xl mx-auto p-6"
        >
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-5 text-center">
              Tell Us About Yourself
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                  >Name</label
                >
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Full Name"
                  minlength="3"
                  maxlength="50"
                  pattern="^[a-zA-Zs]+$"
                  readonly
                />
                <!-- <p
                  *ngIf="name.invalid && name.touched"
                  class="text-red-500 text-sm"
                >
                  Name is required and must be 3-50 alphabetic characters.
                </p> -->
              </div>
              <div class="space-y-2">
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  email
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Email Address"
                  readonly
             
                />
                <!-- <div
                  *ngIf="email.touched && email.invalid"
                  class="text-red-500 text-sm"
                >
                  Valid email is required
                </div> -->
              </div>
              <div class="space-y-2">
                <label
                  for="mobile"
                  class="block text-sm font-medium text-gray-700"
                  >Mobile</label
                >
                <ngx-intl-tel-input
                  [cssClass]="
                    'w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
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
                  [phoneValidation]="true"
                  name="mobile"
                  [ariaReadOnly]="true"
                  required
                >
                </ngx-intl-tel-input>
        
              </div>
              <div class="space-y-2">
                <label
                  for="place"
                  class="block text-sm font-medium text-gray-700"
                  >Place</label
                >
                <input
                  type="text"
                  id="place"
                  name="place"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Place"
                  minlength="3"
                  maxlength="50"
                  pattern="^[a-zA-Zs]+$"
               readonly
                />
                <!-- <p
                  *ngIf="place.invalid && place.touched"
                  class="text-red-500 text-sm"
                >
                  Place name is required and must be 3-50 alphabetic characters.
                </p> -->
              </div>
              <div class="space-y-2">
                <label for="age" class="block text-sm font-medium text-gray-700"
                  >Age</label
                >
                <input
                  type="number"
                  id="age"
                  name="age"
                
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Age"
                  required
                  min="1"
                  max="99"
                  readonly
                />
                <!-- <p
                  *ngIf="age.invalid && age.touched"
                  class="text-red-500 text-sm"
                >
                  Age must be between 1 and 99.
                </p> -->
              </div>
              <div class="space-y-2">
                <label
                  for="qualification"
                  class="block text-sm font-medium text-gray-700"
                  >Qualification</label
                >
                <input
                  type="text"
                  id="qualification"
                  name="qualification"
              
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Qualification"
                  minlength="3"
                  maxlength="50"
                  pattern="^[a-zA-Zs]+$"
                  readonly
                />
                <!-- <p
                  *ngIf="qualification.invalid && qualification.touched"
                  class="text-red-500 text-sm"
                >
                  Qualification is required and must be 3-50 alphabetic.
                </p> -->
              </div>
            </div>
          </div>
          <!-- <div class="mb-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">
              Our Social Media Handles
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <a
                [href]="socialLinks.youtube"
                target="_blank"
                class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
              >
                <img
                  src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0"
                  alt="YouTube"
                  class="w-8 h-8 object-cover rounded"
                />
                <span class="text-sm font-medium">Follow us on YouTube</span>
              </a>
               Other social links remain unchanged   -->
          <!-- </div> -->
          <!-- </div>   -->
          <div>
            <div
              class="flex justify-center items-center space-x-4 mb-4 text-center"
            >
              <a
                href="https://www.facebook.com/AitrichAcademy?mibextid=ZbWKwL"
                target="_blank"
                class="text-blue-600 hover:text-blue-800 text-2xl"
              >
                <i class="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/aitrich.academy/"
                target="_blank"
                class="text-pink-400 hover:text-pink-600 text-2xl"
              >
                <i class="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com/@aitrichacademy"
                target="_blank"
                class="text-pink-400 hover:text-pink-600 text-2xl"
              >
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div class="flex justify-end space-x-4">
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
          <!-- <div
            *ngIf="submitted"
            class="mt-4 p-4 bg-green-100 text-green-700 rounded-md"
          > -->
            <!-- Form submitted successfully! -->
          <!-- </div> -->
        </form>
      </div>
    </div>
    <ng-template #successMessage>
      <div class="text-center py-10">
        <h2 class="text-3xl font-bold text-indigo-500">Thank You!</h2>
        <p class="text-lg mt-4">Your form has been successfully submitted.</p>
        <p class="mt-4">
          <a href="/" class="text-indigo-500 font-serif"
            >We’ll reach out to you very soon!</a
          >
        </p>
        <p class="text-gray-600 text-center mb-1">Follow Us</p>
        <div
          class="flex justify-center items-center space-x-4 mb-4 text-center"
        >
          <a
            href="https://www.facebook.com/AitrichAcademy?mibextid=ZbWKwL"
            target="_blank"
            class="text-blue-600 hover:text-blue-800"
          >
            <i class="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com/aitrich.academy/"
            target="_blank"
            class="text-pink-400 hover:text-pink-600"
          >
            <i class="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.youtube.com/@aitrichacademy"
            target="_blank"
            class="text-pink-400 hover:text-pink-600"
          >
            <i class="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </ng-template>
  `,
  styles: ``
})
export class FormElementsComponent {

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  constructor(
    private router: Router  
  ){}
  goBack() {
    this.router.navigate(['/user/dashboard']);
  }

}
