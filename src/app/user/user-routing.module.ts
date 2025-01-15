import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReferralFormComponent } from './components/referral-form/referral-form.component';
import { ReferralsComponent } from './components/referrals/referrals.component';
import { FormElementsComponent } from './components/form-elements/form-elements.component';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'refer', component: ReferralFormComponent },  // Dynamic path for referral form
  { path: 'referrals/:userId', component: ReferralsComponent },
  { path: 'form', component: FormElementsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
