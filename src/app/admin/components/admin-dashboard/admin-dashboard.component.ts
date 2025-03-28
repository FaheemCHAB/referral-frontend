import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ChartConfiguration } from 'chart.js';
import { Router } from '@angular/router';
import { ReferralService } from '../../services/referral.service';
import { Referral } from '../../models/referral.model';

interface Card {
  title: string;
  cols: number;
  rows: number;
  type: string;
}
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);
  attendanceCounts: { [key: string]: number } = {};


  constructor(private router: Router, private referralService: ReferralService) {}

  ngOnInit() {
    this.loadTotalReferrals();
    this.loadReferralStatusCounts();
    this.getRecentReferrals();
  }

  // Metrics data
  totalReferrals: number = 0;
  unattended: number = 0;
  attended: number = 0;
  joined: number = 0;
  totalRegistrations: number = 0;
  referralProgress = 75;
  referralTrend = 12.5;
  referrals: Referral[] = []
  

  get attendedPercentage(): number {
    const total = this.attended + this.unattended;
    return total > 0 ? Math.round((this.attended / total) * 100) : 0;
  }



  logout() {
    this.router.navigate(["/auth/login"]);
  }

  loadTotalReferrals() {
    this.referralService.getTotalReferrals().subscribe(
      (count) => { 
        this.totalReferrals = count;
      },
      (error) => {
        console.error("Error fetching referral count:", error);
      }
    );
  }

  loadReferralStatusCounts() {
    this.referralService.getReferralStatusCounts().subscribe(
      (counts) => {
        console.log("Status Counts:", counts);
        this.attendanceCounts = counts;
        
       
        this.attended = counts['Attended'] || 0;
        this.totalRegistrations = counts['Registered'] || 0;
        this.joined = counts['Joined'] || 0;
        
        // Calculate unattended
        const attendedSum = (counts['Attended'] || 0) + 
                            (counts['Registered'] || 0) + 
                            (counts['Joined'] || 0);
        this.unattended = this.totalReferrals - attendedSum;
        
        // Or directly use the Not-Attended count if available
        this.unattended = counts['Not-Attended'] || 0;
      },
      (error) => {
        console.error("Error fetching referral status counts:", error);
      }
    );
  }
  
  loadTotalRegistrations() {
    // Assuming you have a service method for this
    this.referralService.getTotalRegistrations().subscribe(
      (count) => {
        this.totalRegistrations = count;
      },
      (error) => {
        console.error("Error fetching registration count:", error);
      }
    );
  }

  getRecentReferrals() {
    this.referralService.getRecentReferrals().subscribe(
      (referrals) => {
        console.log("Recent Referrals:", referrals);
        this.referrals = referrals;
      },
      (error) => {
        console.error("Error fetching recent referrals:", error);
      }
    )
  }
    
}
