import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { PhoneValidationService } from "../../../shared/services/phone-validation.service";

declare const intlTelInput: any;

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrl: "./users.component.css",
})
export class UsersComponent implements AfterViewInit, OnInit {
  @ViewChild("mobilenumber") phoneInput!: ElementRef;
  @ViewChild("userForm") userForm!: NgForm;
  separateDialCode = false;
  iti: any;
  phoneValid = false;
  users: User[] = [];
  showCreateUserModal = false;
  showEditUserModal = false;
  selectedUser: User | null = null;
  errorMessages = {
    mobile: "",
    email: "",
    username: "",
    password: "",
  };
  generalErrorMessage = "";
  newUser: Partial<User & { password: string }> = {};
  showPassword = false;
  isFilterPopupVisible = false;
  searchQuery: string = "";
  startDate: string = "";
  endDate: string = "";
  loading: boolean = false;
  activeToasts: Array<{
    id: number;
    title: string;
    message: string;
    type: "success" | "error" | "info";
  }> = [];
  isCreatingUser: boolean = false;
  creationMessage: string = "";

  formData: User = {
    name: "",
    _id: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    isActive: true,
    createdAt: new Date(),
    statusCounts: {
      totalLeads: 0,
      attended: 0,
      notAttended: 0,
      joined: 0,
      registered: 0,
    },
  };
  // control: AbstractControl<string|null,string|null>|FormControl<any>|null;

  constructor(
    private userService: UserService,
    private router: Router,
    private phoneValidationService: PhoneValidationService
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  ngAfterViewInit() {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleUserStatus(user: User) {
    this.userService.toggleUserStatus(user._id).subscribe((updatedUser) => {
      console.log(updatedUser); // Update status locally
      this.getAllUsers();
    });
  }

  validateForm(): boolean {
    // Check if the form exists
    if (!this.userForm) {
      console.error("Form is not initialized");
      return false;
    }

    // Mark all fields as touched to trigger validation styling
    Object.keys(this.userForm.controls).forEach((key) => {
      const control = this.userForm.controls[key];
      if (control) {
        control.markAsTouched();
      }
    });

    // Password validation
    if (this.formData.password && this.formData.password.length < 6) {
      if (this.userForm.controls["password"]) {
        this.userForm.controls["password"].setErrors({
          minlength: true,
        });
      }
      return false;
    }

    // Phone validation specific check
    if (this.iti) {
      const isPhoneValid = this.iti.isValidNumber();
      if (!isPhoneValid) {
        if (this.userForm.controls["mobile"]) {
          this.userForm.controls["mobile"].setErrors({
            invalidPhone: true,
            errorMessage: "Invalid phone number format",
          });
        }
        return false;
      }

      // Ensure the phone number is stored in international format
      this.formData.mobile = this.iti.getNumber();
    }

    // Explicitly convert to boolean to ensure we return a boolean type
    return this.userForm.valid === true;
  }

  createUser() {
    // Use our enhanced validation function
    if (!this.validateForm()) {
      return;
    }
    
    // Clear previous errors
    this.errorMessages = {
      mobile: "",
      email: "",
      username: "",
      password: "",
    };
    this.generalErrorMessage = "";
    
    // Set loading state with friendly message
    this.isCreatingUser = true;
    this.creationMessage = "Creating account and sending welcome email to " + this.formData.email;
    
    console.log("Data being sent to API:", this.formData);
  
    // If form is valid, proceed with API call
    this.userService.createUser(this.formData).subscribe(
      (newUser: any) => {
        console.log("User created:", newUser);
        this.users.push(newUser);
        this.resetCreationState();
        this.showCreateUserModal = false;
        this.resetFormData();
      },
      (error) => {
        console.error("Error creating user:", error);
        
        // Handle specific field errors
        if (error.error && error.error.errors) {
          // Map backend errors to form fields
          const backendErrors = error.error.errors;
          
          if (backendErrors.email) this.errorMessages.email = backendErrors.email;
          if (backendErrors.mobile) this.errorMessages.mobile = backendErrors.mobile;
          if (backendErrors.username) this.errorMessages.username = backendErrors.username;
          if (backendErrors.password) this.errorMessages.password = backendErrors.password;
        }
        
        // Handle general error message
        if (error.error && error.error.message) {
          this.generalErrorMessage = error.error.message;
        } else {
          this.generalErrorMessage = "An error occurred. Please try again.";
        }
        
        // Reset loading state
        this.resetCreationState();
      }
    );
  }
  
  // Helper method to reset creation state
  resetCreationState() {
    this.isCreatingUser = false;
    this.creationMessage = '';
  }
  removeToast(id: number): void {
    this.activeToasts = this.activeToasts.filter((toast) => toast.id !== id);
  }

  showToast(
    title: string,
    message: string,
    type: "success" | "error" | "info" = "info"
  ) {
    const toast = {
      title,
      message,
      type,
      id: Date.now(),
    };

    // Add toast to an array of active toasts
    this.activeToasts = [...(this.activeToasts || []), toast];

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      this.removeToast(toast.id);
    }, 5000);
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
      _id: "",
      email: "",
      mobile: "",
      username: "",
      password: "",
      isActive: true,
      createdAt: new Date(),
      statusCounts: {
        totalLeads: 0,
        attended: 0,
        notAttended: 0,
        joined: 0,
        registered: 0,
      },
    };
    this.errorMessages = {
      mobile: "",
      email: "",
      username: "",
      password: "",
    };
    this.generalErrorMessage = "";

    // Reset form validation state if form exists
    if (this.userForm) {
      this.userForm.resetForm();
    }

    // Reset phone input if exists
    if (this.iti) {
      this.iti.destroy();
      this.iti = null;
    }
  }

  openCreateUserModal() {
    this.showCreateUserModal = true;
    this.resetFormData();

    // Initialize phone input after modal is rendered
    setTimeout(() => {
      this.initPhoneInput();
    }, 300);
  }

  editUser(user: User) {
    this.formData = { ...user }; // Populate the form with user details
    this.showEditUserModal = true; // Show the edit modal
    // Initialize phone input after modal is rendered
    setTimeout(() => {
      this.initPhoneInput();
    }, 300);
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

  clearReferredByFilter() {
    // this.isFilterApplied = false;
    this.searchQuery = "";
    this.getAllUsers();
  }

  openFilterPopup() {
    this.isFilterPopupVisible = true;
  }

  closeFilterPopup() {
    this.isFilterPopupVisible = false;
    this.startDate = "";
    this.endDate = "";
  }

  showDetails(user: User) {
    this.selectedUser = user;
  }

  applyFilter() {
    this.filterUsersByDateRange(this.startDate, this.endDate);
    this.closeFilterPopup();
  }

  // Initialize phone input with intl-tel-input
  initPhoneInput() {
    if (!this.phoneInput || !this.phoneInput.nativeElement) {
      console.error(
        "Phone input element not found - this is normal if the modal is not open"
      );
      return;
    }

    console.log("Phone input element found, initializing...");

    // Initialize intl-tel-input
    this.iti = intlTelInput(this.phoneInput.nativeElement, {
      preferredCountries: ["us", "gb", "in"],
      initialCountry: "in", // India as default
      separateDialCode: this.separateDialCode,
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
    });

    // Set initial value if editing
    if (this.selectedUser && this.selectedUser.mobile) {
      this.phoneInput.nativeElement.value = this.selectedUser.mobile;
      this.iti.setNumber(this.selectedUser.mobile);
    }

    // Listen for changes
    this.phoneInput.nativeElement.addEventListener("countrychange", () => {
      this.updatePhoneValue();
    });

    this.phoneInput.nativeElement.addEventListener("input", () => {
      this.updatePhoneValue();
    });

    // Add key press event listener to prevent input beyond max length
    this.phoneInput.nativeElement.addEventListener(
      "keypress",
      (event: KeyboardEvent) => {
        // Get the country code
        const countryCode = this.iti.getSelectedCountryData().iso2;

        // Get length rules for this country
        const lengthRules =
          this.phoneValidationService.getPhoneLengthForCountry(countryCode);

        // Get current input without non-digit characters
        const digitsOnly = this.phoneInput.nativeElement.value.replace(
          /\D/g,
          ""
        );

        // If already at max length and key is a digit, prevent input
        if (digitsOnly.length >= lengthRules.max && /\d/.test(event.key)) {
          event.preventDefault();
        }
      }
    );
  }

  updatePhoneValue() {
    if (this.iti) {
      // Get the current country's ISO code
      const countryData = this.iti.getSelectedCountryData();
      const countryCode = countryData.iso2;

      // Get the current input value and international number
      let inputValue = this.phoneInput.nativeElement.value;
      const internationalNumber = this.iti.getNumber();

      // Update the form data with the full international number
      this.formData.mobile = internationalNumber;

      // Validate using your PhoneService
      const validationResult =
        this.phoneValidationService.validatePhoneForCountry(
          inputValue,
          countryCode,
          true // Enforce max length
        );

      // If validation returned a formatted number, update the input value
      if (validationResult.formattedNumber) {
        this.phoneInput.nativeElement.value = validationResult.formattedNumber;
      }

      // Get the national number (without country code)
      const nationalNumber = this.iti.getNumber(
        intlTelInput.numberFormat.NATIONAL
      );
      const digitsOnly = nationalNumber.replace(/\D/g, "");

      // Get length rules for this country
      const lengthRules =
        this.phoneValidationService.getPhoneLengthForCountry(countryCode);

      // Update validation state
      if (this.userForm && this.userForm.controls["mobile"]) {
        // Check if the number has been entered (not empty) but is too short
        if (digitsOnly.length > 0 && digitsOnly.length < lengthRules.min) {
          this.userForm.controls["mobile"].setErrors({
            invalidPhone: true,
            errorMessage: `Phone number must be at least ${lengthRules.min} digits for ${countryData.name}`,
          });
          this.phoneValid = false;
        }
        // Check if input is empty
        else if (!digitsOnly.length) {
          this.userForm.controls["mobile"].setErrors({ required: true });
          this.phoneValid = false;
        }
        // Check if the phone is valid according to intl-tel-input's validation
        else if (!this.iti.isValidNumber()) {
          this.userForm.controls["mobile"].setErrors({
            invalidPhone: true,
            errorMessage: "Invalid phone number format",
          });
          this.phoneValid = false;
        }
        // If all checks pass, clear errors
        else {
          this.userForm.controls["mobile"].setErrors(null);
          this.phoneValid = true;
        }
      }
    }
  }

  cancel(form: NgForm) {
    if (this.iti) {
      this.iti.destroy();
      this.iti = null;
    }

    // Reset the form
    form.resetForm();
    this.showCreateUserModal = false;
    this.showEditUserModal = false;
  }
}
