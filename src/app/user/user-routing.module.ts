import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReferralFormComponent } from './components/referral-form/referral-form.component';
import { ReferralsComponent } from './components/referrals/referrals.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'refer', component: ReferralFormComponent },  // Dynamic path for referral form
  { path: 'referrals/:userId', component: ReferralsComponent },
  {path: "leaderboard/:userId", component: LeaderboardComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
