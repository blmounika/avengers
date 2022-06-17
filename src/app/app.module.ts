import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationComponent } from './components/login/user-registration/user-registration.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/home/header/header.component';
import { SavedFlatsComponent } from './components/home/saved-flats/saved-flats.component';
import { ProjectComponent } from './components/home/project/project.component';
import { CustomiseComponent } from './components/home/project/customise/customise.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserRegistrationComponent,
    HomeComponent,
    HeaderComponent,
    SavedFlatsComponent,
    ProjectComponent,
    CustomiseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
