import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/public/home/home').then((m) => m.Home),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/client/client-register/client-register.component/client-register.component').then(
        (m) => m.ClientRegisterComponent,
      ),
  },

  // Routes Client
  {
    path: 'client',
    canActivate: [authGuard, roleGuard(['CLIENT'])],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/client/dashboard/dashboard.component/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'tickets',
        loadComponent: () =>
          import('./components/client/ticket-list/ticket-list').then((m) => m.TicketList),
      },
    ],
  },

  // Routes Manager
  {
    path: 'manager',
    canActivate: [authGuard, roleGuard(['MANAGER'])],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/manager/dashboard/dashboard.component/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'event-form',
        loadComponent: () =>
          import('./components/manager/event-form/event-form').then((m) => m.EventFormComponent),
      },
      {
        path: 'event-list',
        loadComponent: () =>
          import('./components/manager/event-list/event-list').then((m) => m.EventListComponent),
      },
    ],
  },
  // Routes Admin
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard(['ADMIN'])],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/admin/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'manager-form',
        loadComponent: () =>
          import('./components/admin/manager-form/manager-form').then((m) => m.ManagerForm),
      },
      {
        path: 'event-list',
        loadComponent: () =>
          import('./components/admin/event-list/event-list').then((m) => m.EventList),
      },
    ],
  },

  // Route publique
  {
    path: 'concerts',
    loadComponent: () =>
      import('./components/public/concert-list/concert-list').then((m) => m.ConcertList),
  },
];
