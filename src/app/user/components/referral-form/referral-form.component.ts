import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReferralService } from "../../services/referral.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from "ngx-intl-tel-input";
import { AuthService } from "../../../auth/service/auth.service";

@Component({
  selector: "app-referral-form",
  template: `
    <!-- Wavy Background -->
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
        *ngIf="!isSubmitted"
        class="relative z-10 max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg"
      >
        <form
          (ngSubmit)="onSubmit()"
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
                  [(ngModel)]="referral.name"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Full Name"
                  #name="ngModel"
                  minlength="3"
                  maxlength="50"
                  pattern="^[a-zA-Z]+( [a-zA-Z]+)*$"
                />
                <div class="text-red-500 min-h-[1rem]">
                  <small
                    *ngIf="
                      name.invalid && (name.touched || referralForm.submitted)
                    "
                  >
                    Name is required and must be 3-50 alphabetic characters.
                  </small>
                </div>
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
                  [(ngModel)]="referral.email"
                  required
                  email
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Email Address"
                  email
                  #email="ngModel"
                />
                <div class="text-red-500 min-h-[1rem]">
                  <small
                    *ngIf="
                      email.invalid && (email.touched || referralForm.submitted)
                    "
                  >
                    A valid email address is required.
                  </small>
                </div>
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
                  [(ngModel)]="referral.mobile"
                  #mobile="ngModel"
                  name="mobile"
                  required
                >
                </ngx-intl-tel-input>
                <div class="text-red-500 min-h-[1rem]">
                  <small
                    *ngIf="
                      mobile.invalid &&
                      (mobile.touched || referralForm.submitted)
                    "
                  >
                    A valid mobile number is required.
                  </small>
                </div>
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
                  [(ngModel)]="referral.place"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Place"
                  minlength="3"
                  maxlength="50"
                  pattern="^[a-zA-Z]+( [a-zA-Z]+)*$"
                  #place="ngModel"
                />
                <div class="text-red-500 min-h-[1rem]">
                  <small
                    *ngIf="
                      place.invalid && (place.touched || referralForm.submitted)
                    "
                  >
                    Place is required and must be 3-50 alphabetic characters.
                  </small>
                </div>
              </div>
              <div class="space-y-2">
                <label for="age" class="block text-sm font-medium text-gray-700"
                  >Date of Birth</label
                >
                <input
                  type="date"
                  id="DOB"
                  name="DOB"
                  [(ngModel)]="referral.dob"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="DOB"
                  required
                  #DOB="ngModel"
                />
                <!-- <p
                  *ngIf="DOB.invalid && DOB.touched"
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
                  [(ngModel)]="referral.qualification"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Qualification"
                  minlength="3"
                  maxlength="50"
                  pattern="^[a-zA-Z]+( [a-zA-Z]+)*$"
                  #qualification="ngModel"
                />
                <div class="text-red-500 min-h-[1rem]">
                  <small
                    *ngIf="
                      qualification.invalid &&
                      (qualification.touched || referralForm.submitted)
                    "
                  >
                    Qualification is required and must be 3-50 alphabetic
                    characters.
                  </small>
                </div>
              </div>
            </div>
          </div>
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
          <div
            *ngIf="submitted"
            class="mt-4 p-4 bg-green-100 text-green-700 rounded-md"
          >
            Form submitted successfully!
          </div>
        </form>
      </div>
    </div>
    <div
      *ngIf="isSubmitted"
      class="fixed inset-0 flex items-center justify-center z-20"
    >
      <ng-container *ngTemplateOutlet="successMessage"></ng-container>
    </div>
    <ng-template #successMessage>
      <div class="text-center py-10">
        <h2 class="text-3xl font-bold text-indigo-500 mb-4">Thank You!</h2>
        <p class="text-lg mt-4 mb-4">
          Your form has been successfully submitted, We’ll reach out to you very
          soon!
        </p>
        <p class="mt-4 mb-4">
          <a
            href="https://aitrichacademy.com/"
            target="_blank"
            class="text-indigo-500 font-serif"
            >We’ll reach out to you very soon!</a
          >
        </p>
        <p class="text-gray-600 text-center mb-4">Follow Us</p>
        <div
          class="flex justify-center items-center space-x-6 mb-4 text-center"
        >
          <!-- Facebook Link -->
          <a
            href="https://www.facebook.com/AitrichAcademy?mibextid=ZbWKwL"
            target="_blank"
            class="text-blue-600 hover:text-blue-800 text-2xl"
          >
            <i class="fab fa-facebook-f"></i>
          </a>
          <!-- Instagram Link -->
          <a
            href="https://www.instagram.com/aitrich.academy/"
            target="_blank"
            class="text-pink-400 hover:text-pink-600 text-2xl"
          >
            <i class="fab fa-instagram"></i>
          </a>
          <!-- YouTube Link -->
          <a
            href="https://www.youtube.com/@aitrichacademy"
            target="_blank"
            class="text-pink-400 hover:text-pink-600 text-2xl"
          >
            <i class="fab fa-youtube"></i>
          </a>
          <!-- Website Link -->
          <a
            href="https://aitrichacademy.com/"
            target="_blank"
            class="text-gray-700 hover:text-gray-900 text-2xl"
          >
            <i class="fas fa-globe"></i>
          </a>
        </div>
      </div>
    </ng-template>
  `,
})
export class ReferralFormComponent {
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  referral = {
    name: "",
    email: "",
    mobile: "",
    place: "",
    dob: null,
    qualification: "",
    status: "Pending",
    referredBy: "",
  };

  successMessage: string | null = null;
  showModal = false;
  age: number | null = null;
  ageError: string | null = null;
  isSubmitted = false;

  constructor(
    private referralService: ReferralService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.referral.referredBy = params["ref"] || "";
    });
  }

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  goBack() {
    window.history.back();
  }

  onSubmit() {
    this.referralService.createReferral(this.referral).subscribe(
      (res) => {
        console.log(res);
        this.successMessage = "Form Submitted";
        this.showModal = true;
        this.isSubmitted = true;
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }

  closeModal() {
    this.showModal = false;
    this.successMessage = null;
  }

  onAgeInput() {
    if (this.age !== null && this.age.toString().length > 2) {
      this.age = Number(this.age.toString().slice(0, 2)); // Limit to 2 digits
    }
  }

  submitted = false;

  // onSubmit() {
  //   console.log(this.referral);
  //   this.submitted = true;
  // }

  resetForm(form: any) {
    form.resetForm();
    this.submitted = false;
  }
}
