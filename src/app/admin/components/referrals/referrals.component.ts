import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Referral } from "../../models/referral.model";
import { Router } from "@angular/router";
import { ReferralService } from "../../services/referral.service";

@Component({
  selector: "app-referrals",
  templateUrl: "./referrals.component.html",
  styleUrl: "./referrals.component.css",
})
export class ReferralsComponent {

  referrals: Referral[] = [];
  searchQuery: string = "";
  statusFilter: string = '';
  filteredRewards: Referral[] = [];
    // Search and filter variables
  selectedTimePeriod: string = 'all';
  searchType: string = "nameOrMobile";
  sortOption: string = 'dateDesc';
  paginatedReferrals: any[] = [];
  filteredReferrals: any[] = [];
  selectedReferral: any = null;
  dateRange = {
    start: '',
    end: ''
  };
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  pageNumbers: number[] = [];
  paginationStart: number = 0;
  paginationEnd: number = 0;
  statusSummary: { status: string, count: number }[] = [];



  constructor(
    private router: Router,
    private referralService: ReferralService
  ) {
    this.getAllReferrals();
  }


  goBack() {
    this.router.navigate(["/admin/dashboard"]);
  }


  getAllReferrals() {
    this.referralService.getAllReferrals().subscribe((res) => {
      this.referrals = res;

      this.sortFilteredReferrals(this.referrals);
    });
  }


  loadReferrals(): void {
    this.referralService.getAllReferrals().subscribe(
      (data) => {
        this.referrals = data;
        this.sortOption = 'dateDesc';
        this.filterReferrals();
        this.updateStatusSummary();
      },
      (error) => {
        console.error('Error fetching referrals:', error);
      }
    );
  }
  
  initializeDateRange(): void {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);
    
    this.dateRange.end = today.toISOString().split('T')[0];
    this.dateRange.start = lastMonth.toISOString().split('T')[0];
  }
  
  filterReferrals(): void {
    // If no search query, just apply normal filtering
    if (this.searchQuery.trim() === '' || this.searchType === 'nameOrMobile') {
      // Start with all referrals
      let result = [...this.referrals];
      
      // Apply search filter if there's a query
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase().trim();
        result = result.filter(r => 
          r.name.toLowerCase().includes(query) || 
          r.mobile.includes(query) || 
          (r.email && r.email.toLowerCase().includes(query))
        );
      }
      
      // Apply time period filter
      result = this.applyTimeFilter(result);
      
      // Apply sorting
      this.sortFilteredReferrals(result);
      
      // Update pagination
      this.updatePagination();
    } 
    // Handle referredBy name search
    else if (this.searchType === 'referredByName') {
      this.searchByReferredByOnly(this.searchQuery.trim());
    }
    // Handle referredBy name with date range
    else if (this.searchType === 'referredByNameWithDate') {
      this.searchByReferredByWithDate(this.searchQuery.trim());
    }
  }
  
  applyTimeFilter(referrals: any[]): any[] {
    if (this.selectedTimePeriod === 'all') {
      return referrals;
    }
    
    const today = new Date();
    let startDate: Date;
    
    switch (this.selectedTimePeriod) {
      case '3days':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 3);
        break;
      case '1week':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        break;
      case '1month':
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 1);
        break;
      case '3months':
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 3);
        break;
      case 'custom':
        startDate = new Date(this.dateRange.start);
        const endDate = new Date(this.dateRange.end);
        endDate.setHours(23, 59, 59);
        return referrals.filter(r => {
          const date = new Date(r.createdAt);
          return date >= startDate && date <= endDate;
        });
      default:
        return referrals;
    }
    
    return referrals.filter(r => {
      const date = new Date(r.createdAt);
      return date >= startDate;
    });
  }
  
  filterByTimePeriod(): void {
    this.filterReferrals();
  }
  
  sortReferrals(): void {
    this.filterReferrals();
  }
  
  sortFilteredReferrals(referrals: any[]): void {
    this.filteredReferrals = [...referrals];
    
    switch (this.sortOption) {
      case 'dateDesc':
        this.filteredReferrals.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'dateAsc':
        this.filteredReferrals.sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case 'nameAsc':
        this.filteredReferrals.sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        break;
      case 'nameDesc':
        this.filteredReferrals.sort((a, b) => 
          b.name.localeCompare(a.name)
        );
        break;
      case 'status':
        this.filteredReferrals.sort((a, b) => 
          a.attendanceStatus.localeCompare(b.attendanceStatus)
        );
        break;
    }
    
    this.updatePagination();
  }
  
  updatePagination(): void {
    this.totalPages = Math.max(1, Math.ceil(this.filteredReferrals.length / this.itemsPerPage));
    
    // Ensure current page is valid
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    
    // Calculate start and end index for current page
    this.paginationStart = (this.currentPage - 1) * this.itemsPerPage;
    this.paginationEnd = Math.min(this.paginationStart + this.itemsPerPage, this.filteredReferrals.length);
    
    // Create page numbers array
    this.pageNumbers = [];
    // Show max 5 page numbers
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(this.totalPages, startPage + 4);
    
    if (endPage - startPage < 4 && this.totalPages > 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      this.pageNumbers.push(i);
    }
    
    // Update paginated referrals
    this.paginatedReferrals = this.filteredReferrals.slice(this.paginationStart, this.paginationEnd);
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
  
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }
  
  resetFilters(): void {
    this.searchQuery = '';
    this.selectedTimePeriod = 'all';
    this.sortOption = 'dateDesc';
    this.currentPage = 1;
    this.filterReferrals();
  }
  
  updateStatusSummary(): void {
    const statusCounts: {[key: string]: number} = {};
    
    // Count referrals by status
    this.referrals.forEach(referral => {
      const status = referral.attendanceStatus;
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    
    // Convert to array format
    this.statusSummary = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count
    }));
  }
  
  toggleReferralStatus(referral: any): void {
    this.referralService.updateReferralStatus(referral._id, referral.attendanceStatus)
      .subscribe(
        () => {
          this.updateStatusSummary();
        },
        (error) => {
          console.error('Error updating status:', error);
        }
      );
  }
  
  showDetails(referral: any): void {
    this.selectedReferral = {...referral};
  }
  
  
  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  getStatusClass(status: string): string {
    const baseClasses = 'block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm appearance-none transition';
    
    switch (status) {
      case 'Joined':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Registered':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Attended':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'Not-Attended':
      default:
        return `${baseClasses} bg-red-100 text-black-800`;
    }
  }

  searchByReferredByOnly(query: string): void {
    this.referralService.searchByName(query).subscribe(
      (data) => {
        this.filteredReferrals = data;
        this.sortFilteredReferrals(this.filteredReferrals);
      },
      (error) => {
        console.error('Error searching referrals by referredBy name:', error);
      }
    );
  }
  
  searchByReferredByWithDate(query: string): void {
    // Get date range values based on current filter
    let startDate = '';
    let endDate = '';
    
    if (this.selectedTimePeriod === 'custom') {
      startDate = this.dateRange.start;
      endDate = this.dateRange.end;
    } else {
      // Calculate dates based on selected time period
      const today = new Date();
      endDate = today.toISOString().split('T')[0];
      
      switch (this.selectedTimePeriod) {
        case '3days':
          const threeDaysAgo = new Date(today);
          threeDaysAgo.setDate(today.getDate() - 3);
          startDate = threeDaysAgo.toISOString().split('T')[0];
          break;
        case '1week':
          const oneWeekAgo = new Date(today);
          oneWeekAgo.setDate(today.getDate() - 7);
          startDate = oneWeekAgo.toISOString().split('T')[0];
          break;
        case '1month':
          const oneMonthAgo = new Date(today);
          oneMonthAgo.setMonth(today.getMonth() - 1);
          startDate = oneMonthAgo.toISOString().split('T')[0];
          break;
        case '3months':
          const threeMonthsAgo = new Date(today);
          threeMonthsAgo.setMonth(today.getMonth() - 3);
          startDate = threeMonthsAgo.toISOString().split('T')[0];
          break;
        case 'all':
        default:
          break;
      }
    }
    
    // API Call
    this.referralService.searchReferralsByReferredBy(query, startDate, endDate).subscribe(
      (data) => {
        this.filteredReferrals = data;
        this.sortFilteredReferrals(this.filteredReferrals);
      },
      (error) => {
        console.error('Error searching referrals by referredBy with date range:', error);
      }
    );
  }

  // Helper method for dynamic placeholder text
getSearchPlaceholder(): string {
  switch(this.searchType) {
    case 'nameOrMobile':
      return 'Search by name or mobile...';
    case 'referredByName':
      return 'Search by referrer name...';
    case 'referredByNameWithDate':
      return 'Search by referrer name within date range...';
    default:
      return 'Search...';
  }
}


// Helper method to display current date range
getSelectedDateRangeText(): string {
  if (this.selectedTimePeriod === 'custom') {
    return `${this.dateRange.start} to ${this.dateRange.end}`;
  } else {
    switch(this.selectedTimePeriod) {
      case 'all':
        return 'All time';
      case '3days':
        return 'Last 3 days';
      case '1week':
        return 'Last week';
      case '1month':
        return 'Last month';
      case '3months':
        return 'Last 3 months';
      default:
        return '';
    }
  }
}
  getStatusBgClass(status: string): string {
    switch (status) {
      case 'Joined':
        return 'bg-green-100 text-green-800';
      case 'Registered':
        return 'bg-blue-100 text-blue-800';
      case 'Attended':
        return 'bg-purple-100 text-purple-800';
      case 'Not-Attended':
      default:
        return 'bg-red-100 text-black-800';
    }
  }

  logout() {
    this.router.navigate(["/auth/login"]);
  }

}
