import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormElementsComponent } from './components/form-elements/form-elements.component';
import { LoginComponent } from './components/login/login.component';
import { ReferralFormComponent } from './components/referral-form/referral-form.component';
import { ReferralsComponent } from './components/referrals/referrals.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SafeUrlPipe } from "./safe-url.pipe";


@NgModule({
  declarations: [
    DashboardComponent,
    FormElementsComponent,
    LoginComponent,
    ReferralFormComponent,
    ReferralsComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    FormsModule,
    NgxIntlTelInputModule,
]
})
export class UserModule { }
