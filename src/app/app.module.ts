import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { ComptesComponent } from './comptes/comptes.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './/app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { OperationsComponent } from './operations/operations.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { NewClientComponent } from './new-client/new-client.component';
import { NewEmployeComponent } from './new-employe/new-employe.component';
import { NewCompteComponent } from './new-compte/new-compte.component';

@NgModule({
  declarations: [
    AppComponent,
    ComptesComponent,
    HeaderComponent,
    NotFoundComponent,
    IndexComponent,
    FooterComponent,
    OperationsComponent,
    AccountComponent,
    LoginComponent,
    AboutComponent,
    NewClientComponent,
    NewEmployeComponent,
    NewCompteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
