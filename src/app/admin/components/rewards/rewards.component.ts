import { Component } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { Reward, RewardHistory } from "../../models/rewards.model";
import { HttpClient } from "@angular/common/http";
import { RewardsService } from "../../services/rewards.service";
import { Router } from "@angular/router";
import { BonusService } from "../../services/bonus.service";
import { Bonus, BonusHistory } from "../../models/bonus.model";

@Component({
  selector: "app-rewards",
  templateUrl: "./rewards.component.html",
  styleUrl: "./rewards.component.css",
})
export class RewardsComponent {
  editBonus(_t153: Reward) {
    throw new Error("Method not implemented.");
  }
  users: User[] = [];
  showAddForm: boolean = false;
  isModalOpen: boolean = false;
  selectedUser: User | null = null;
  referralAmount: number | null = null;
  remarks: string | null = null;
  bonusPoints: number | null = null;
  paymentStatus: string | null = null;
  rewardHistory: RewardHistory[] = [];

  // Table data
  rewards: Reward[] = [];
  filteredRewards: Reward[] = [];
  searchTerm: string = "";
  statusFilter: string = "";

  // Edit mode
  editMode: boolean = false;
  currentRewardId: string | null = null;

  // User History Modal
  isUserHistoryModalOpen: boolean = false;
  selectedUserHistory: User | null = null;
  userRewards: Reward[] = [];

  // User's previous rewards for calculation
  previousTotalAmount: number = 0;
  previousTotalBonusPoints: number = 0;
  loadingStatus: string | null = null;
  isReferralModalOpen: boolean = false;
  isBonusModalOpen: boolean = false;
  activeTab: "referrals" | "bonuses" = "referrals";
  bonusSearchTerm: string = "";
  bonusStatusFilter: string = "";
  filteredBonuses: Bonus[] = [];
  selectedBonusUser: User | null = null;
  bonusPaymentStatus: string | null = null;
  bonus: Bonus[] = [];
  bonusHistory: BonusHistory[] = [];
  historyTabActive: "rewards" | "bonuses" = "rewards";
  loadingBonusStatus: string | null = null;
  isBonusHistoryModalOpen: boolean = false;
  selectedBonusHistory: Bonus | null = null;
  bonusRewards: Bonus[] = [];
  startDate: string | null = null;
endDate: string | null = null;
historyStatusFilter: string = "";
filteredBonusHistory: any[] = [];
selectedUserBonus: User | null = null;
filteredRewardHistory: RewardHistory[] = [];
bonusInputError = false;
loadingEntry: string | null = null;
// conversionRate: number = 0.5;

  constructor(
    private userService: UserService,
    private rewardService: RewardsService,
    private bonusService: BonusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadRewards();
    this.loadBonuses();
  }

  toggleAddRewardForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  getStatusColor(status: string): { [key: string]: boolean } {
    return {
      "text-yellow-500": status === "pending",
      "text-green-500": status === "completed",
      "text-red-500": status === "failed",
    };
  }
  openModal(): void {
    this.isModalOpen = true;
    // Prevent body scrolling when modal is open
    document.body.classList.add("overflow-hidden");
  }

  closeModal(): void {
    this.isModalOpen = false;
    // Restore body scrolling
    document.body.classList.remove("overflow-hidden");
    this.resetForm();
  }

  saveRewardAndClose(): void {
    this.saveReward();
    this.closeModal();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error("Error fetching users:", error);
      }
    );
  }

  loadRewards(): void {
    this.rewardService.getRewards().subscribe(
      (data) => {
        this.rewards = data;
        this.applyFilters();
      },
      (error) => {
        console.error("Error fetching rewards:", error);
      }
    );
  }

  loadBonuses(): void {
    console.log("Loading bonuses...");
    this.bonusService.getAllBonuses().subscribe(
      (data) => {
        console.log("Bonuses loaded:", data);
        this.bonus = data;
        this.applyBonusFilters();
      },
      (error) => {
        console.error("Error fetching bonuses:", error);
      }
    );
  }

  applyFilters(): void {
    this.filteredRewards = this.rewards.filter((reward) => {
      // Apply search filter
      const searchMatch =
        !this.searchTerm ||
        reward.user.name
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        reward.user.email
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase());

      // Apply status filter
      const statusMatch =
        !this.statusFilter || reward.status === this.statusFilter;

      return searchMatch && statusMatch;
    });
  }

  // Called when user selects a user in the add reward form
  onUserSelect(): void {
    if (this.selectedUser) {
      // Load previous rewards for this user to calculate totals
      this.rewardService.getRewardsByUserId(this.selectedUser._id).subscribe(
        (data) => {
          // Calculate previous total amounts
          this.previousTotalAmount = data.reduce(
            (total, reward) => total + reward.amount,
            0
          );
          this.previousTotalBonusPoints = data.reduce(
            (total, reward) => total + reward.bonusPoints,
            0
          );

          // Show the previous totals to the user (you can add UI elements for this)
          console.log("Previous total amount:", this.previousTotalAmount);
          console.log(
            "Previous total bonus points:",
            this.previousTotalBonusPoints
          );
        },
        (error) => {
          console.error("Error fetching user rewards:", error);
          this.previousTotalAmount = 0;
          this.previousTotalBonusPoints = 0;
        }
      );
    } else {
      this.previousTotalAmount = 0;
      this.previousTotalBonusPoints = 0;
    }
  }

  saveReward(): void {
    if (
      !this.selectedUser ||
      this.referralAmount == null ||
      !this.paymentStatus
    ) {
      return;
    }

    // Ensure values are converted to numbers
    const referralAmount = Number(this.referralAmount);

    const rewardData = {
      userId: this.selectedUser._id,
      amount: referralAmount,
      status: this.paymentStatus,
      remarks: this.remarks || "", // Use empty string if remarks is null
    };

    const saveMethod =
      this.editMode && this.currentRewardId
        ? this.rewardService.updateReward(this.currentRewardId, rewardData)
        : this.rewardService.addReward(rewardData);

    saveMethod.subscribe(
      () => {
        this.resetForm();
        this.loadRewards();
        this.closeReferralModal();

        // Load user history if modal is open
        if (this.isUserHistoryModalOpen && this.selectedUserHistory) {
          this.loadUserRewardHistory(this.selectedUserHistory._id);
        }
      },
      (error) => {
        console.error("Error saving reward:", error);
      }
    );
  }

  resetForm(): void {
    this.selectedUser = null;
    this.referralAmount = null;
    this.bonusPoints = null;
    this.remarks = null;
    this.paymentStatus = null;
    this.editMode = false;
    this.currentRewardId = null;
  }

  // User History Modal Methods
  openUserHistoryModal(userData: User): void {
    this.selectedUserHistory = userData;
    this.isUserHistoryModalOpen = true;
    this.loadUserRewardHistory(userData._id);
    document.body.classList.add("overflow-hidden");
  }

  openUserBonusHistoryModal(userData: User): void {
    this.selectedBonusUser = userData;
    this.isBonusHistoryModalOpen = true;
    this.loadBonusHistoryByUserId(userData._id);
    document.body.classList.add("overflow-hidden");
  }

  closeUserHistoryModal(): void {
    this.isUserHistoryModalOpen = false;
    document.body.classList.remove("overflow-hidden");
    this.selectedUserHistory = null;
    this.rewardHistory = [];
    this.filteredRewardHistory = [];
    this.startDate = null;
    this.endDate = null;
    this.historyStatusFilter = "";
  }


  closeUserBonusHistoryModal(): void {
    this.isBonusHistoryModalOpen = false;
    document.body.classList.remove("overflow-hidden");
    this.selectedBonusHistory = null;
    this.bonusRewards = [];
  }

  loadUserRewardHistory(userId: string): void {    
    this.rewardService.getRewardsByUserId(userId).subscribe({
      next: (rewards) => {
        if (rewards && rewards.length > 0) {
          // The first reward object contains the history array
          const reward = rewards[0];
  
          // Map the history array, ensuring date conversion
          this.rewardHistory = (reward.history || []).map((h) => ({
            ...h,
            date: new Date(h.date),
          }));
  
          // Initialize the filtered history with all rewards
          this.filteredRewardHistory = [...this.rewardHistory];
          
          console.log("Mapped Reward History:", this.rewardHistory);
        } else {
          this.rewardHistory = []; // Clear history if no rewards found
          this.filteredRewardHistory = [];
        }
      },
      error: (error) => {
        console.error("Error loading reward history:", error);
        this.rewardHistory = []; // Clear history on error
        this.filteredRewardHistory = [];
      },
    });
  }

  // Start editing a bonus entry
  startEditing(entry: any): void {
    entry.editing = true;
    entry.editBonusPoints = entry.bonusPoints;
    entry.editRemarks = entry.remarks || ''; 
    entry.editAmount = entry.amount;
    
    console.log('Starting edit - editBonusPoints:', entry.editBonusPoints);
    console.log('Starting edit - editRemarks:', entry.editRemarks);
    console.log('Starting edit - editAmount:', entry.editAmount);
    
    console.log('Starting edit - original remarks:', entry.remarks);
    console.log('Starting edit - editRemarks:', entry.editRemarks);
  }

// Cancel editing and revert changes
cancelEditing(entry: any): void {
  entry.editing = false;
}

// Calculate the amount based on bonus points
// updateEditAmount(entry: any): void {
//   // Calculate amount based on bonus points (adjust formula as needed)
//   entry.editAmount = entry.editBonusPoints * this.conversionRate;
// }

// Save the edits to the database

  saveEditing(entry: BonusHistory): void {
    this.loadingEntry = entry._id;

    // Capture the most recent values directly from the DOM
    const bonusPointsInput = document.querySelector(`input[data-bonus-points-id="${entry._id}"]`) as HTMLInputElement;
    const remarksInput = document.querySelector(`input[data-remarks-id="${entry._id}"]`) as HTMLInputElement;

    // Use DOM values if available, otherwise fallback to model values
    const editedBonusPoints = bonusPointsInput ? parseInt(bonusPointsInput.value, 10) : entry.bonusPoints;
    const editedRemarks = remarksInput ? remarksInput.value : entry.remarks;

    const updatedData = {
      data: {
        bonusPoints: editedBonusPoints,
        remarks: editedRemarks || ''
      }
    };

    console.log('Saving - payload:', updatedData);
    console.log('Saving - editedBonusPoints:', editedBonusPoints);
    console.log('Saving - editedRemarks:', editedRemarks);

    this.bonusService.updateBonusByUserId(entry._id, updatedData).subscribe(
      (response: BonusHistory) => {
        // Update the local entry with values from the response
        entry.bonusPoints = response.bonusPoints;
        entry.amount = response.amount;
        entry.remarks = response.remarks;
        // entry.editing = false;

        // Update totals in the parent Bonus object
        if (this.selectedBonusHistory) {
          this.selectedBonusHistory.bonusPoints = this.calculateTotalBonusPoints();
          this.selectedBonusHistory.amount = this.calculateTotalAmount();
        }

        this.loadingEntry = null;
      },
      (error) => {
        console.error('Error updating bonus entry:', error);
        this.loadingEntry = null;
      }
    );
  }



// Helper method to calculate total amount
calculateTotalAmount(): number {
  return this.filteredBonusHistory.reduce(
    (total, entry) => total + entry.amount,
    0
  );
}

  loadBonusHistoryByUserId(userId: string): void {
    console.log(this.selectedBonusUser?.name,"username ");
    
    this.bonusService.getBonusesByUserId(userId).subscribe({
      next: (bonuses) => {
        if (bonuses && bonuses.length > 0) {
          // Store the first bonus object as the selected bonus history
          this.selectedBonusHistory = bonuses[0];
          
          // Map the history array, ensuring all properties are properly set
          this.bonusHistory = (bonuses[0].history || []).map((h) => ({
            ...h,
            _id: h._id || '',
            date: new Date(h.date), // Ensure date is a Date object
            amount: h.amount || 0,
            bonusPoints: h.bonusPoints || 0,
            remarks: h.remarks || '',
            status: h.status || 'pending'
          }));
          
          // Initialize filtered history
          this.filteredBonusHistory = [...this.bonusHistory];
          
          console.log("Bonus History:", this.bonusHistory);
        } else {
          this.bonusHistory = []; // Clear history if no bonuses found
          this.filteredBonusHistory = [];
          this.selectedBonusHistory = null;
        }
      },
      error: (error) => {
        console.error("Error loading bonus history:", error);
        this.bonusHistory = []; // Clear history on error
        this.filteredBonusHistory = [];
        this.selectedBonusHistory = null;
      },
    });
  }

  calculateTotalRewards(): number {
    return this.userRewards.reduce((total, reward) => total + reward.amount, 0);
  }

  calculateTotalBonusPoints(): number {
    return this.userRewards.reduce(
      (total, reward) => total + reward.bonusPoints,
      0
    );
  }

  addNewRewardForUser(user: User | null): void {
    if (!user) return;

    // Set the selected user for the add reward form
    this.selectedUser = user;

    // Prefill with the last reward amount as a starting point
    if (this.userRewards.length > 0) {
      // Sort rewards by date (newest first)
      const sortedRewards = [...this.userRewards].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Get the most recent reward
      const lastReward = sortedRewards[0];

      // Pre-fill the form with the last amount
      this.referralAmount = lastReward.amount;
      this.bonusPoints = lastReward.bonusPoints;
    }

    // Close history modal and open add reward modal
    this.closeUserHistoryModal();
    this.openModal();
  }

  updateStatus(rewardId: string, event: Event) {
    // Type cast the event target to HTMLSelectElement to access the value
    const selectElement = event.target as HTMLSelectElement;
    const status = selectElement.value as "pending" | "processing" | "paid";

    this.loadingStatus = rewardId;

    this.rewardService.updateRewardStatus(rewardId, status).subscribe(
      (response) => {
        this.rewardHistory = this.rewardHistory.map((reward) => {
          if (reward._id === rewardId) {
            return { ...reward, status: status };
          }
          return reward;
        });

        // this.notification.success('Status updated successfully');
        this.loadingStatus = null;
      },
      (error) => {
        console.error("Error updating status:", error);
        // this.notification.error('Failed to update status');
        this.loadingStatus = null;
      }
    );
  }

  updateStatusBonus(bonusId: string, event: Event) {
    // Type cast the event target to HTMLSelectElement to access the value
    const selectElement = event.target as HTMLSelectElement;
    const status = selectElement.value as "pending" | "processing" | "paid";  

    this.loadingStatus = bonusId;

    this.bonusService.updateBonusStatus(bonusId, status).subscribe( 
      (response) => {
        this.bonusHistory = this.bonusHistory.map((reward) => {
          if (reward._id === bonusId) {
            return { ...reward, status: status };
          }
          return reward;
        });

        // this.notification.success('Status updated successfully');
        this.loadingStatus = null;
      },
      (error) => {
        console.error("Error updating status:", error);
        // this.notification.error('Failed to update status');
        this.loadingStatus = null;  

      }
    );
  }
  

  openReferralModal(): void {
    this.isReferralModalOpen = true;
    document.body.classList.add("overflow-hidden");
  }

  // Bonus methods
  openBonusModal(): void {
    this.isBonusModalOpen = true;
    document.body.classList.add("overflow-hidden");
  }

  editReferral(reward: Reward): void {
    this.editMode = true;
    this.currentRewardId = reward._id;
    this.selectedUser = reward.user;
    this.referralAmount = reward.amount;
    this.paymentStatus = reward.status;
    this.openReferralModal();
  }

  closeReferralModal(): void {
    this.isReferralModalOpen = false;
    document.body.classList.remove("overflow-hidden");
    this.resetForm();
  }

  saveReferralAndClose(): void {
    this.saveReward();
    this.closeReferralModal();
  }

  // Bonus methods

  applyBonusFilters(): void {
    if (!this.bonus || !Array.isArray(this.bonus)) {
      console.error("Bonuses array is not properly defined:", this.bonus);
      this.filteredBonuses = [];
      return;
    }
    
    // Simple version without complex filtering for now
    this.filteredBonuses = [...this.bonus];
    
    // Once we confirm data is displayed, we can add the filtering logic back
    if (this.bonusSearchTerm) {
      this.filteredBonuses = this.filteredBonuses.filter(bonus => 
        bonus && bonus.user && 
        ((bonus.user.name && bonus.user.name.toLowerCase().includes(this.bonusSearchTerm.toLowerCase())) || 
         (bonus.user.email && bonus.user.email.toLowerCase().includes(this.bonusSearchTerm.toLowerCase())))
      );
    }
    
    console.log("Filtered bonuses count:", this.filteredBonuses.length);
  }

  closeBonusModal(): void {
    this.isBonusModalOpen = false;
    document.body.classList.remove("overflow-hidden");
    this.resetBonusForm();
  }
  resetBonusForm() {
    this.selectedBonusUser = null;
    this.bonusPoints = null;
    this.bonusPaymentStatus = null;
    this.editMode = false;
    this.currentRewardId = null;
  }

  onBonusUserSelect() {
    if (this.selectedUserBonus) {
      // Load previous rewards for this user to calculate totals
      this.bonusService
        .getBonusesByUserId(this.selectedUserBonus._id)
        .subscribe(
          (data) => {
            // Calculate previous total bonus points
            this.previousTotalBonusPoints = data.reduce(
              (total, reward) => total + reward.bonusPoints,
              0
            );

            // Show the previous totals to the user
            console.log(
              "Previous total bonus points:",
              this.previousTotalBonusPoints
            );
          },
          (error) => {
            console.error("Error fetching user rewards:", error);
            this.previousTotalBonusPoints = 0;
          }
        );
    } else {
      this.previousTotalBonusPoints = 0;
    }
  }

  applyHistoryFilters(): void {
    if (!this.rewardHistory) {
      this.filteredRewardHistory = [];
      return;
    }
    
    this.filteredRewardHistory = this.rewardHistory.filter(entry => {
      // Convert the entry date to a comparable format
      const entryDate = new Date(entry.date);
      
      // Apply date range filter
      const matchesStartDate = !this.startDate || entryDate >= new Date(this.startDate);
      const matchesEndDate = !this.endDate || entryDate <= new Date(this.endDate + 'T23:59:59');
      
      // Apply status filter
      const matchesStatus = !this.historyStatusFilter || entry.status === this.historyStatusFilter;
      
      return matchesStartDate && matchesEndDate && matchesStatus;
    });
  
  }
  
  // Add method to clear all filters
  clearHistoryFilters(): void {
    this.startDate = null;
    this.endDate = null;
    this.historyStatusFilter = "";
    this.filteredRewardHistory = [...this.rewardHistory];
  }
  

  saveBonusAndClose(): void {
    this.saveBonus();
    this.closeBonusModal();
  }

  saveBonus(): void {
    if (
      !this.selectedBonusUser ||
      this.bonusPoints === null ||
      !this.bonusPaymentStatus ||
      this.bonusInputError
    ) {
      return;
    }
  
    // No need to re-parse since bonusPoints is already a number
    const bonusPoints = this.bonusPoints;
    
    if (!Number.isInteger(bonusPoints) || bonusPoints <= 0) {
      this.bonusInputError = true;
      return;
    }
  
    const bonusData = {
      userId: this.selectedBonusUser._id,
      amount: 0, // No amount for bonus
      bonusPoints: bonusPoints,
      status: this.bonusPaymentStatus,
      remarks: this.remarks,
    };

    this.bonusService.createBonus(bonusData).subscribe(
      (response) => {
        // this.notification.success('Bonus saved successfully');
        this.loadBonuses();
        this.closeBonusModal();
        if (this.isBonusHistoryModalOpen && this.selectedBonusUser) {
          this.loadBonusHistoryByUserId(this.selectedBonusUser._id);
        }
      },
      (error) => {
        console.error("Error saving bonus:", error);
        // this.notification.error('Failed to save bonus');
      }
    );

    const saveMethod = this.editMode && this.currentRewardId
      ? this.rewardService.updateReward(this.currentRewardId, bonusData)
      : this.rewardService.addReward(bonusData);

    saveMethod.subscribe(
      () => {
        this.resetBonusForm();
        this.loadBonuses();

        // Load user history if modal is open

      },
      (error) => {
        console.error("Error saving bonus:", error);
      }
    );
  }

  validateBonusInput(event: any): void {
    const input = event.target.value;
    
    // Check if input is a decimal or zero
    if (input.includes('.') || input === '0' || parseInt(input) <= 0) {
      this.bonusInputError = true;
      // Optionally remove the decimal part and set to null if invalid
      this.bonusPoints = parseInt(input) > 0 ? Math.floor(parseInt(input)) : null;
    } else {
      this.bonusInputError = false;
      this.bonusPoints = parseInt(input);
    }
  }

  logout() {
    this.router.navigate(["/auth/login"]);
  }
}
