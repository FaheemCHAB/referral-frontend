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
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-referral-form",
  templateUrl: "./referral-form.component.html",
  styleUrl: "./referral-form.component.css",
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

  private apiUrl = 'https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=YOUR_ACCESS_TOKEN';


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
  
  instagramPosts = [
    "https://www.instagram.com/p/DFsK3nEyRXN/embed",
    "https://www.instagram.com/p/DDORo8MSpjr/embed",
    "https://www.instagram.com/p/C-4n9KkBg6Q/embed",
    "https://www.instagram.com/p/C5YKvy4y90-/embed",
    "https://www.instagram.com/p/C4iNZErSqeU/embed",
    "https://www.instagram.com/p/C7eHe7TShG5/embed"
  ]

  selectedVideoId: string = this.videos[0].id; // Default video
  constructor(
    private referralService: ReferralService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.referral.referredBy = params["ref"] || "";
    });
  }

  get youtubeEmbedUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.selectedVideoId}`
    );
  }

  selectVideo(videoId: string) {
    this.selectedVideoId = videoId;
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
