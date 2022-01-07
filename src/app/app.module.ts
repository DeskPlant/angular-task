import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KrijoKurseComponent } from './krijo-kurse/krijo-kurse.component';
import { ZgjidhKurseComponent } from './zgjidh-kurse/zgjidh-kurse.component';
import { KursetEMijaComponent } from './kurset-emija/kurset-emija.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginhomeComponent } from './loginhome/loginhome.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    KrijoKurseComponent,
    ZgjidhKurseComponent,
    KursetEMijaComponent,
    HomeComponent,
    LoginComponent,
    LoginhomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
