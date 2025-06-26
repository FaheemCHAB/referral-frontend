import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../../auth/service/auth.service";
import { Clipboard, ClipboardModule } from "@angular/cdk/clipboard";
import { BehaviorSubject, Observable } from "rxjs";
import { DashboardService } from "../../services/dashboard.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css"
})
export class DashboardComponent implements OnInit {
  currentUser$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  generatedLink: string = "";
  copied: boolean = false;
  showShareOptions: boolean = false;
  private FRONTEND_URL = environment.FRONTEND_URL;

  // Dashboard statistics
  dashboardStats = {
    totalLeads: 0,
    attended: 0,
    notAttended: 0,
    joined: 0,
    registered: 0,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private clipboard: Clipboard,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    // Check if user data is available in the localStorage and set it
    const storedUser = this.authService.getStoredUser();
    if (storedUser) {
      this.currentUser$.next(storedUser); // Set data from localStorage
    } else {
      // Handle scenario if no data is found in localStorage (e.g., redirect to login)
      this.router.navigate(["/auth/login"]);
    }

    this.fetchDashboardStats();
  }

  fetchDashboardStats() {
    const userId = this.getUserId();
    if (!userId) {
      console.error("No user ID available");
      return;
    }

    // Fetch dashboard statistics
    this.dashboardService.getUserStatusCount(userId).subscribe({
      next: (response) => {
        console.log("Raw response:", response);

        // Directly assign the response to dashboardStats
        this.dashboardStats = response;

        console.log("Dashboard stats after assignment:", this.dashboardStats);
      },
      error: (error) => {
        console.error("Error fetching dashboard stats", error);
      },
    });
  }

  goBack() {
    this.router.navigate(["/auth/login"]);
  }

  getUserId() {
    let userId: string = "";
    this.currentUser$.subscribe((user) => {
      if (user) {
        userId = user._id;
      }
    });
    return userId;
  }

  generateLink() {
    const user = this.currentUser$.getValue(); // Get the current user value
    if (user) {
      this.generatedLink = `${environment.FRONTEND_URL}/user/refer?ref=${user._id}`;
    }
  }

  closePopup() {
    console.log("Popup closed");
    
    this.generatedLink = "";
    this.showShareOptions = false

  }

  openInBrowser(link: string) {
    window.open(link, '_blank');
  }

  copyToClipboard(link: string) {
    this.clipboard.copy(link);
    this.copied = true; // Show tooltip
    setTimeout(() => (this.copied = false), 2000); // Hide tooltip after 2 seconds
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/auth/login"]);
  }

    // Toggle share options visibility
    toggleShareOptions() {
      this.showShareOptions = !this.showShareOptions;
    }

    // Methods for each sharing platform
    shareViaWhatsApp() {
      const message = `📢 നിങ്ങളുടെ കരിയറിനെക്കുറിച്ച് ആശങ്കയുണ്ടോ ? 🤔
    ✅ ബാക്ക്പേപ്പർസ് ഉള്ളതുകൊണ്ട് കരിയർ ആരംഭിക്കാനോ നല്ല ജോലി കണ്ടെത്താനോ പ്രയാസമാണോ?
    ✅ കമ്പനികൾക്ക് ആവശ്യമായ സ്കില്ലുകൾ പഠിക്കാനോ, ഒരു മികച്ച ഐടി കരിയർ ആരംഭിക്കാനോ ആഗ്രഹിക്കുന്നുണ്ടോ?
    ✅ കരിയർ ഗ്യാപ് ഉള്ളവർക്കും ഐടി മേഖലയിൽ അവസരങ്ങൾ ഉണ്ടോ?
    ✅ ഒരു മികച്ച കമ്പനിയിലേയ്ക്ക് വേഗത്തിൽ എത്താൻ ആഗ്രഹമുണ്ടോ?
    
    📌 Aitrich Academy നിങ്ങളെ സഹായിക്കും! കൂടുതൽ അറിയാൻ സന്ദർശിക്കുക:
    👉 ${this.generatedLink}
    
    🚀 നിങ്ങളുടെ മകൻ/മകളുടെ ഭാവി ഉറപ്പാക്കി പുതിയൊരു തുടക്കം നൽകൂ!
    👉 ഈ സന്ദേശം നിങ്ങളുടെ സുഹൃത്തുകൾക്കും കുടുംബത്തിലും ഷെയർ ചെയ്യൂ! 🙌`;
    
      const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
      this.showShareOptions = false;
    }
    
    shareViaEmail() {
      const subject = 'Check out this referral link';
      const body = `I thought you might be interested in this: ${this.generatedLink}`;
      const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(url, '_blank');
      this.showShareOptions = false
    }
    
    shareViaTwitter() {
      const text = 'Join me using this referral link!';
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(this.generatedLink)}`;
      window.open(url, '_blank');
      this.showShareOptions = false
    }
    
    shareViaFacebook() {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.generatedLink)}`;
      window.open(url, '_blank');
      this.showShareOptions = false
    }
    
    shareViaLinkedIn() {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.generatedLink)}`;
      window.open(url, '_blank');
      this.showShareOptions = false
    }
    
    shareViaTelegram() {
      const text = 'Check out this referral link!';
      const url = `https://t.me/share/url?url=${encodeURIComponent(this.generatedLink)}&text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
      this.showShareOptions = false
    }
}
