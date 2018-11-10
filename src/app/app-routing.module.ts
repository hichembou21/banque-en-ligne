import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ComptesComponent } from './comptes/comptes.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { NewClientComponent } from './new-client/new-client.component';
import { NewEmployeComponent } from './new-employe/new-employe.component';
import { NewCompteComponent } from './new-compte/new-compte.component';

const routes:Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'compte', component: ComptesComponent },
  { path: 'add-client', component: NewClientComponent },
  { path: 'add-employe', component: NewEmployeComponent },
  { path: 'add-compte', component: NewCompteComponent },
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
