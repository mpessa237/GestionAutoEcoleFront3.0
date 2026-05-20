import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { LayoutComponent } from './components/layout-component/layout-component';
import { StudentRegisterComponent } from './components/student-register-component/student-register-component';
import { Dashboard } from './components/dashboard/dashboard';
import { PublicLayout } from './components/public-layout/public-layout';
import { AboutComponent } from './components/about-component/about-component';
import { HomeComponent } from './components/home-component/home-component';
import { ContactComponent } from './components/contact-component/contact-component';
import { AllStudentComponent } from './components/all-student-component/all-student-component';
import { NewPaymentComponent } from './components/new-payment-component/new-payment-component';
import { PaymentHistoryComponent } from './components/payment-history-component/payment-history-component';
import { StudentDetails } from './components/student-details/student-details';
import { AddVehiculeComponent } from './components/add-vehicule-component/add-vehicule-component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'login', component: LoginComponent },
    ]
  },

  {
    path: 'admin',
    component: LayoutComponent,
    // canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'register-student', component: StudentRegisterComponent },
      {path: 'all-students',component:AllStudentComponent},
      { path: 'new-payment/:regId', component: NewPaymentComponent },
      { path: 'student-details/:userId', component: StudentDetails },
      { path: 'payment-history/:regId', component: PaymentHistoryComponent },
      { path: 'vehicles/new',component:AddVehiculeComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Redirige /admin vers /admin/dashboard
    ]
  },

  { path: '**', redirectTo: '' }
];
