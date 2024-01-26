import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { InitiativesComponent } from './initiatives/initiatives.component';
import { GetInvolvedComponent } from './get-involved/get-involved.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { GalleyComponent } from './galley/galley.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { FinancialDisclosureComponent } from './financial-disclosure/financial-disclosure.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { SponsorshipFormComponent } from './sponsorship-form/sponsorship-form.component';
import { SponsorshipDashboardComponent } from './sponsorship-dashboard/sponsorship-dashboard.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'initiatives',
    component: InitiativesComponent,
  },
  {
    path: 'involved',
    component: GetInvolvedComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'gallery',
    component: GalleyComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'terms',
    component: TermsConditionsComponent,
  },
  {
    path: 'FinancialDisclosure',
    component: FinancialDisclosureComponent,
  },
  {
    path: 'registration-form',
    component: RegistrationFormComponent,
  },
  {
    path: 'Sponsorship-form',
    component: SponsorshipFormComponent,
  },
  {
    path: 'sponsorship-dashboard',
    component: SponsorshipDashboardComponent,
  },
  { path: 'initiatives/:id', component: InitiativesComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    InitiativesComponent,
    GetInvolvedComponent,
    ContactUsComponent,
    AboutUsComponent,
    GalleyComponent,
    RegisterComponent,
    DashboardComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    FinancialDisclosureComponent,
    RegistrationFormComponent,
    SponsorshipFormComponent,
    SponsorshipDashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaginationModule.forRoot()
  ]
})
export class HomeModule {}
