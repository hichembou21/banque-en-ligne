import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule }   from '@angular/forms';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
