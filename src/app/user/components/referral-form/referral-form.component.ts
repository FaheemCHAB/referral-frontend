import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  ChangeDetectorRef,
  NgZone,
  ViewChildren,
  QueryList,
  HostListener,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { ReferralService } from "../../services/referral.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../auth/service/auth.service";
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from "@angular/platform-browser";
import { PhoneValidationService } from "../../../shared/services/phone-validation.service";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import {
  InstagramVideosService,
  Video,
} from "../../services/instagram-videos.service";
import { interval, Subscription } from "rxjs";

declare const intlTelInput: any;

declare global {
  interface Window {
    instgrm?: any;
  }
}
interface BootcampCard {
  mainHeading: string;
  secondary: string;
  technology: string;
  content: string;
  logo: string;
  bgColor: string;
}

@Component({
  selector: "app-referral-form",
  templateUrl: "./referral-form.component.html",
  styleUrl: "./referral-form.component.css",
  animations: [
    trigger("cardHighlight", [
      state(
        "active",
        style({
          transform: "scale(1.05)",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        })
      ),
      state(
        "inactive",
        style({
          transform: "scale(1)",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        })
      ),
      transition("inactive => active", animate("300ms ease-out")),
      transition("active => inactive", animate("200ms ease-in")),
    ]),
    trigger("cardAnimation", [
      transition(":enter", [
        style({
          transform: "translateX(100%) rotate(5deg) scale(1.2)",
          opacity: 0,
        }),
        animate(
          "500ms cubic-bezier(0.4, 0, 0.2, 1)",
          style({ transform: "translateX(0) rotate(0) scale(1)", opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class ReferralFormComponent {
  @ViewChild("phoneInput") phoneInput!: ElementRef;
  @ViewChild("referralForm") referralForm!: NgForm;
  @ViewChild('registrationForm') registrationForm!: ElementRef;
  separateDialCode = true;
  iti: any;
  currentIndex = 0;
  phoneValid = false;
  private autoRotationInterval: any;
  currentHoverIndex: number | null = null;
  referral = {
    name: "",
    email: "",
    mobile: "",
    place: "",
    passOutYear: null,
    qualification: "",
    status: "Pending",
    referredBy: "",
    areaOfInterest: "",
    otherInterest: "",
    careerStage: {
      nonIT: false,
      backlog: false,
      careerBreak: false,
      fresher: false,
      unskilled: false,
      careerSwitch: false,
    },
    remarks: "",
  };

  private apiUrl =
    "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=YOUR_ACCESS_TOKEN";

  successMessage: string | null = null;
  showModal = false;
  age: number | null = null;
  ageError: string | null = null;
  isSubmitted = false;
  videos: { id: string; title: string }[] = [
    {
      id: "S3Y0blyrD3I",
      title: "TECH VIEW WITH AITRICH CTO | SHAMEER KUNJUMOHAMED",
    },
    {
      id: "0AQ_bibeTPM",
      title:
        "ഞാൻ നേരിട്ട വെല്ലുവിളി നിറഞ്ഞ ഒരു പ്രൊജക്റ്റ് | A challenging project I faced",
    },
    {
      id: "gJyNXkdg1CQ",
      title:
        "Senior Software Engineer ആകണോ? എങ്കിൽ ഈ skill സെറ്റുകൾ അറിയാതെ പോകരുത്|TECH VIEW",
    },
    {
      id: "ifhD9dgbD_g",
      title: "All India TATA Company ഉപയോഗിക്കുന്ന AITRICH ന്റെ പ്രോഡക്റ്റ്",
    },
    {
      id: "sG-KWBvaVUA",
      title:
        "Non IT യിൽ നിന്ന് IT യിലേക്ക് വരുന്നവർ എന്താണ് ശ്രെദ്ധിക്കേണ്ടത്?",
    },
    {
      id: "Tf7Blm0boEk",
      title:
        "Career Gap ഉള്ള ആളുകൾക്ക് IT ലേക്ക് എങ്ങനെ തിരിച്ചുവരാം?|career gap issue",
    },
    {
      id: "kihrtQx4bp0",
      title:
        "പുതിയതായി IT യിലേക്ക് വരുന്നവർ ചതിക്കുഴികളിൽ വീഴാതെ എങ്ങനെ രക്ഷപ്പെടാം",
    },
    {
      id: "okZqOJnNths",
      title:
        "ഒരു fresher ക്ക്‌ എത്ര വർഷം കൊണ്ട് Senior ആവാം?| How fast a fresher can turn into a senior",
    },
    {
      id: "E2NEZKJOMtQ",
      title: "Aitrich Academy ഒരു Software Company മാത്രമാണോ?",
    },
    {
      id: "ZhuUcCZYts0",
      title: "എന്ത് കൊണ്ടാണ് Aitrich ഒരു Academy തുടങ്ങാനുള്ള കാരണം",
    },
    {
      id: "TvWLdSjC2F0",
      title: "Aitrich products division ന്റെ core functional Domain ഏതാണ്??",
    },
    {
      id: "wcB6WgoA-Tc",
      title:
        "ഒരു complex project develop ചെയ്യുമ്പോൾ junior developer face ചെയ്യുന്ന challenges എന്തൊക്കെ ആണ്?",
    },
    {
      id: "j6sTClvKD0A",
      title:
        "ഒരു Fresher എങ്ങനെ ചുരുങ്ങിയ കാലയളവിൽ Experienced Software Engineer ആവും",
    },
  ];

  students = [
    { image: "../../../../assets/images/placement-1.jpg" },
    { image: "../../../../assets/images/placement-2.jpg" },
    { image: "../../../../assets/images/placement-3.jpg" },
    { image: "../../../../assets/images/placement-4.jpg" },
    { image: "../../../../assets/images/placement-5.jpg" },
    { image: "../../../../assets/images/placement-6.jpg" },
    { image: "../../../../assets/images/placement-7.jpg" },
    { image: "../../../../assets/images/placement-8.jpg" },
    { image: "../../../../assets/images/placement-9.jpg" },
    { image: "../../../../assets/images/placement-10.jpg" },
  ];

  bootcampCards: any = [
    {
      technology: "Full-Stack .NET Core",
      stackType: "",
      content: "An integrated, full-stack Developer Training Bootcamp designed to transform both beginners and experienced software developers into expert software engineers skilled and experienced in cutting-edge Microsoft Web Technologies, tools and frameworks.",
      logo: "assets/images/dot.jpg",
      bgColor: "linear-gradient(135deg, #512bd4 0%, #2b0b6e 100%)",
      level: ""
    },
    {
      technology: "Cloud Native MEAN Stack",
      stackType: "",
      content: "A cloud-focused, integrated full-stack Developer Training Bootcamp designed to transform both beginners and experienced software developers into expert Tier-1 Software Engineers specialized in the MEAN Stack (Full-Stack JavaScript) and AWS (Amazon Web Services) Cloud, DevOps tools and frameworks.",
      logo: "assets/images/mean1.png",
      bgColor: "linear-gradient(135deg, #68b12e 0%, #3a6119 100%)",
      level: ""
    },
    {
      technology: "Mobile App Development using Flutter",
      stackType: "",
      content: "Flutter mobile developer course is designed to teach students how to build mobile applications using Flutter, a popular open-source mobile app development framework created by Google",
      logo: "assets/images/flut.png",
      bgColor: "linear-gradient(135deg, #027DFD 0%, #004a94 100%)",
    },
    {
      technology: "Java Web Development with Spring Boot",
      stackType: "",
      duration: "",
      content: "The Java Web Developer Training Program is designed for individuals who want to build a career in web development using Java. With a combination of in-person classes and hands-on projects, you will gain the knowledge and skills necessary to build robust and scalable web applications using Java",
      logo: "assets/images/java2.jpg",
      bgColor: "linear-gradient(135deg, #027DFD 0%, #004a94 100%)",
    },
    {
      technology: "Fontend Development Using Angular",
      stackType: "",
      duration: "",
      content: "Angular Developer course is designed to teach students how to build dynamic, single-page web applications using the Angular framework. Students will learn the fundamentals of Angular and will gain practical experience building and deploying Angular applications.",
      logo: "assets/images/ang.png",
      bgColor: "linear-gradient(135deg, #027DFD 0%, #004a94 100%)",
    },
    {
      technology: "Web Developer Program: .NET Core",
      stackType: "",
      duration: "",
      content: ".NET is a software framework developed by Microsoft that includes a large library of pre-built code and a virtual machine that provides a platform for running and executing applications written in various programming languages.",
      logo: "assets/images/dot.jpg",
      bgColor: "linear-gradient(135deg, #027DFD 0%, #004a94 100%)",
    },
  ];
  scriptLoaded = false;
  currentIndexes = 0;
  selectedVideoId: string = this.videos[0].id; // Default video
  showRemarksField = false;
  safeUrl!: SafeResourceUrl;
  @ViewChild("scrollContainer") scrollContainer!: ElementRef;
  originalVideos: Video[] = [];
  duplicatedVideos: Video[] = [];
  animationPaused = false;
  constructor(
    private referralService: ReferralService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private phoneValidationService: PhoneValidationService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private videoService: InstagramVideosService
  ) {
    this.updateSafeUrl();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.referral.referredBy = params["ref"] || "";
    });
    this.startAutoRotation();

    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    this.loadVideos();
  }

  ngAfterViewInit() {
    // Initialize the international telephone input after view is ready
    setTimeout(() => {
      this.initPhoneInput();
    }, 0);
  }

  // Carousel navigation methods
  ngOnDestroy(): void {
    this.stopAutoRotation();
  }

  selectCard(index: number) {
    this.currentIndex = index;
    
    // Scroll to the registration form
    this.registrationForm.nativeElement.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }

  hoverCard(index: number): void {
    this.currentIndex = index;
    this.stopAutoRotation();
  }

  startAutoRotation(): void {
    this.autoRotationInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.bootcampCards.length;
    }, 5000); // Rotate every 5 seconds
  }

  stopAutoRotation(): void {
    if (this.autoRotationInterval) {
      clearInterval(this.autoRotationInterval);
    }
  }

  resetAutoRotation(): void {
    this.stopAutoRotation();
    this.startAutoRotation();
  }

  get youtubeEmbedUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.selectedVideoId}`
    );
  }

  updateSafeUrl() {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.selectedVideoId}?enablejsapi=1`
    );
  }

  selectVideo(videoId: string) {
    this.selectedVideoId = videoId;
    this.updateSafeUrl();
    this.cdr.detectChanges(); // Force Angular to detect the change
  }

  // changePreferredCountries() {
  //   this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  // }

  goBack() {
    window.history.back();
  }

  onSubmit() {
    if (this.referralForm.invalid) {
      return; // Prevent submission if the form is invalid
    }

    this.referralService.createReferral(this.referral).subscribe(
      (res) => {
        console.log(res);
        this.successMessage = "Form Submitted";
        this.showModal = true;
        this.isSubmitted = true;

        // Reset form state
        this.referralForm.resetForm();

        // Reset model data
        this.referral = {
          name: "",
          email: "",
          mobile: "",
          place: "",
          passOutYear: null,
          qualification: "",
          status: "Pending",
          referredBy: "",
          areaOfInterest: "",
          otherInterest: "",
          careerStage: {
            nonIT: false,
            backlog: false,
            careerBreak: false,
            fresher: false,
            unskilled: false,
            careerSwitch: false,
          },
          remarks: "",
        };
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }

  closeModal() {
    this.isSubmitted = false;
    setTimeout(() => {
      this.initPhoneInput();
    }, 0);
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
      separateDialCode: false,
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
    });

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
      (event: { key: string; preventDefault: () => void }) => {
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

      // Get the international number (with country code)
      const internationalNumber = this.iti.getNumber();

      // Update the form data with the full international number
      this.referral.mobile = internationalNumber;

      // Get the national number (without country code) and clean it
      const nationalNumber = this.iti.getNumber(
        intlTelInput.numberFormat.NATIONAL
      );
      const digitsOnly = nationalNumber.replace(/\D/g, "");

      // Get length rules for this country
      const lengthRules =
        this.phoneValidationService.getPhoneLengthForCountry(countryCode);

      // Update validation state
      if (this.referralForm && this.referralForm.controls["mobile"]) {
        // Check if input is empty
        if (!digitsOnly.length) {
          this.referralForm.controls["mobile"].setErrors({ required: true });
        }
        // Check if the number has been entered but is too short
        else if (digitsOnly.length < lengthRules.min) {
          this.referralForm.controls["mobile"].setErrors({
            invalidPhone: true,
            errorMessage: `Phone number must be at least ${lengthRules.min} digits for ${countryData.name}`,
          });
        }
        // Check if the number is too long
        else if (digitsOnly.length > lengthRules.max) {
          this.referralForm.controls["mobile"].setErrors({
            invalidPhone: true,
            errorMessage: `Phone number must be no more than ${lengthRules.max} digits for ${countryData.name}`,
          });
        }
        // Check if the phone is valid according to intl-tel-input's validation
        else if (!this.iti.isValidNumber()) {
          this.referralForm.controls["mobile"].setErrors({
            invalidPhone: true,
            errorMessage: "Invalid phone number format",
          });
        }
        // If all checks pass, clear errors
        else {
          this.referralForm.controls["mobile"].setErrors(null);
        }
      }
    }
  }

  loadVideos(): void {
    this.videoService.getVideos().subscribe(
      (videos) => {
        this.originalVideos = videos;
        this.duplicatedVideos = [...videos, ...videos]; // Duplicate for seamless loop
      },
      (error) => console.error("Error loading videos:", error)
    );
  }

  pauseAutoSlide(): void {
    this.animationPaused = true;
  }

  resumeAutoSlide(): void {
    this.animationPaused = false;
  }

  onHover(index: number) {
    this.currentHoverIndex = index;
  }

  onLeave() {
    this.currentHoverIndex = null;
  }



  @HostListener("mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    if (this.currentHoverIndex !== null) {
      const cards = document.querySelectorAll(".hover-effect");
      cards.forEach((card, index) => {
        const speed = (index - this.currentHoverIndex!) * 2;
        const x = (event.clientX * speed) / 1000;
        const y = (event.clientY * speed) / 1000;
        (card as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    }
  }
}
