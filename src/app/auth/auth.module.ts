import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { UserRoutingModule } from '../user/user-routing.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AdminRoutingModule } from '../admin/admin-routing.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule,
    AuthRoutingModule,
    // AdminRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
