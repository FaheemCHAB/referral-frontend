import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RewardService } from '../../services/reward.service';
import { Reward } from '../../models/reward';
import { Leaderboard } from '../../models/leaderBoard';
import { Bonus } from '../../models/bonus';

interface Participant {
  name: string;
  totalBonusPoints: number;
  userId: string;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {

  totalPoints: number = 0;
  rewards: Bonus[] = [];
  leaderboard: Participant[] = [];
  topPerformers: Participant[] = [];
  totalParticipants: number = 0;
  currentUserId: string = '';
  referralRewards: Reward[] = [];
  selectedTab: string = 'bonus';
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private rewardService: RewardService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get("userId")!;
    this.getBonusesByUserId(userId);
    this.getUserRewardsByUserId(userId);
    this.getAllUserBonus();
  }

  goBack() {
    // Navigate back to the previous page
    this.router.navigate(['user/dashboard']); // Adjust the route as needed
  }

  getUserRewardsByUserId(userId: string) {
    this.rewardService.getRewardsByUserId(userId).subscribe(
      (data) => {
        this.referralRewards = data;
        console.log(this.rewards);
      },
      (error) => {
        console.error("Error fetching referrals", error);
      }
    );
  }

  getBonusesByUserId(userId: string) {
    this.rewardService.getBonusesByUserId(userId).subscribe(
      (data) => {
        this.rewards = data;
        console.log(this.rewards);
      },
      (error) => {
        console.error("Error fetching referrals", error);
      }
    );
  }

  getAllUserBonus() {
    this.rewardService.getAllUserBonus().subscribe(
      (data: Bonus[]) => {
        console.log('All user rewards:', data);
        this.processLeaderboardData(data);
      },
      (error) => {
        console.error("Error fetching rewards", error);
      }
    );
  }

  processLeaderboardData(bonuses: Bonus[]): void {
    // Map raw bonus data to simplified participant objects
    this.leaderboard = bonuses.map(bonus => ({
      name: bonus.user.name,
      totalBonusPoints: bonus.bonusPoints,
      userId: bonus.user._id
    }));

    // Sort leaderboard by totalBonusPoints (highest first)
    this.leaderboard.sort((a, b) => b.totalBonusPoints - a.totalBonusPoints);
    
    // Store top 3 performers separately
    this.topPerformers = this.leaderboard.slice(0, 3);
    
    // Set total participants
    this.totalParticipants = this.leaderboard.length;
  }

  isRecentActivity(date: Date): boolean {
    const activityDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - activityDate.getTime());
    const diffHours = diffTime / (1000 * 60 * 60);
    return diffHours < 24;
  }

  getStatusClass(status: string): string {
    switch(status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Helper method to get ranking badge color
  getRankBadgeClass(index: number): string {
    switch(index) {
      case 0:
        return 'bg-yellow-400 text-yellow-800';
      case 1:
        return 'bg-gray-300 text-gray-800';
      case 2:
        return 'bg-yellow-600 text-yellow-50';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  }

    // Calculate total referral points
    getTotalReferralPoints(): number {
      return this.referralRewards.reduce((total, reward) => total + (reward.bonusPoints || 0), 0);
    }

  logout() {
    this.router.navigate(["/auth/login"]);
  }
}
