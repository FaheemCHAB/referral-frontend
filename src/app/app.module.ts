import { provideHttpClient } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin/admin-routing.module";
import { UserRoutingModule } from "./user/user-routing.module";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { LandingPageComponent } from "./landing-page.component";
import { AuthRoutingModule } from "./auth/auth-routing.module";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";

@NgModule({
    declarations: [
    AppComponent,
    LandingPageComponent
    ],
    imports: [
        BrowserModule,
        NgxIntlTelInputModule,
        AppRoutingModule,
        CommonModule,
        AdminRoutingModule,
        UserRoutingModule,
        AuthRoutingModule,
    ],
    providers: [
     provideHttpClient(),
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }