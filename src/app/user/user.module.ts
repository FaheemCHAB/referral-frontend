import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ReferralFormComponent } from './components/referral-form/referral-form.component';
import { ReferralsComponent } from './components/referrals/referrals.component';
import { SafeUrlPipe } from "../shared/pipes/safe-url.pipe";
import { FooterComponent } from '../shared/components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { StatsCountComponent } from "./components/stats-count/stats-count.component";


@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    ReferralFormComponent,
    ReferralsComponent,
    SafeUrlPipe,
    FooterComponent,
    LeaderboardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    FormsModule,
    StatsCountComponent
],
exports: [
  FooterComponent
],
})
export class UserModule { }
