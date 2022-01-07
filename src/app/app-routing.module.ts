import { Component, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { KrijoKurseComponent } from './krijo-kurse/krijo-kurse.component';
import { KursetEMijaComponent } from './kurset-emija/kurset-emija.component';
import { ZgjidhKurseComponent } from './zgjidh-kurse/zgjidh-kurse.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginhomeComponent } from './loginhome/loginhome.component';
import { AuthGuard } from './guards/auth.guard';
import { StudentGuardGuard } from './guards/student-guard.guard';
import { TeacherGuardGuard } from './guards/teacher-guard.guard';

const routes: Routes = [
  { path: 'login', component:LoginComponent},
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard] },
  { path: 'krijo-kurse', component: KrijoKurseComponent, canActivate :[TeacherGuardGuard] },
  { path: 'kurset-emija', component: KursetEMijaComponent , canActivate: [StudentGuardGuard]},
  { path: 'zgjidh-kurset', component: ZgjidhKurseComponent , canActivate: [StudentGuardGuard]},
  { path: 'loginhome', component:LoginhomeComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(router:Router){
   
  }
 }
