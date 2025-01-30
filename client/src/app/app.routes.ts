import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactComponent } from './components/contact/contact.component';


export const routes: Routes = [
  {
    path: '',
    title: 'Homepage',
    component: HomeComponent, // Default route '/'
  },
  {
    path: 'reservation',
    title: 'reservation form',
    component: ReservationFormComponent,
  },
  {
    path: 'login',
    title: 'admin login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    title: 'admin dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'contact',
    title: 'contact',
    component: ContactComponent,
  },
//   {
//     path: 'dashboard',
//     title: 'dashboard form',
//     component: DashboardComponent,
//     canActivate: [authGuard],
//     children: [
//       { path: '', title: 'main dashboard', component: MainDashboardComponent },
//       {
//         path: 'create',
//         title: 'new product',
//         component: CreateProductComponent,
//       },
//       {p
//         path: 'update/:id',
//         title: 'update product',
//         component: UpdateProductComponent,
//       },
//     ],
//   },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full', // Redirect unknown paths to the homepage
  },
];
