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
import { ToastrModule } from "ngx-toastr";


@NgModule({
    declarations: [
    AppComponent,
    LandingPageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        AdminRoutingModule,
        UserRoutingModule,
        AuthRoutingModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            progressBar: true
          })
    ],
    providers: [
     provideHttpClient(),

    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }