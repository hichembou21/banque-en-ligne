import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ComptesComponent } from './comptes/comptes.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';

const routes:Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'compte', component: ComptesComponent },
  { path: 'account', component: AccountComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
