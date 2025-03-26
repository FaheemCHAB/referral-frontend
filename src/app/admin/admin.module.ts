import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReferralsComponent } from './components/referrals/referrals.component';
import { UsersComponent } from './components/users/users.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { RewardsComponent } from './components/rewards/rewards.component';


@NgModule({
  declarations: [
    ReferralsComponent,
    UsersComponent,
    AdminDashboardComponent,
    RewardsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule,
  ]
})
export class AdminModule { }
