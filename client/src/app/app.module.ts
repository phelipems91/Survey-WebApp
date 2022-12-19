import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BasePageComponent } from './partials/base-page/base-page.component';
//import { LoginComponent } from './pages/login/login.component';
// import { LoginService } from './pages/login/login.service';
import { ListSurveyComponent } from './pages/survey/list-survey/list-survey.component';
import { CreateSurveyComponent } from './pages/survey/create-survey/create-survey.component';
import { UpdateSurveyComponent } from './pages/survey/update-survey/update-survey.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RespondSurveyComponent } from './pages/survey/respond-survey/respond-survey.component';
import { FormsModule } from '@angular/forms';
import { SurveyResultsComponent } from './pages/survey/survey-results/survey-results.component';
import { AuthComponent } from './admin/auth/auth.component';
import { RegisterComponent } from './admin/register/register.component';
import { LoginComponent } from './admin/login/login.component';
import { AvailableSurveysComponent } from './pages/survey/available-surveys/available-surveys.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    AboutComponent,
    BasePageComponent,
    LoginComponent,
    ListSurveyComponent,
    CreateSurveyComponent,
    UpdateSurveyComponent,
    RespondSurveyComponent,
    SurveyResultsComponent,
    AuthComponent,
    RegisterComponent,
    AvailableSurveysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  // providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
