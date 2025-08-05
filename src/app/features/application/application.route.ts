// features/application/application.routes.ts
import { Routes } from '@angular/router';

export const applicationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./application-list/application-list.component').then(
            m => m.ApplicationListComponent
          ),
      },
      {
        path: ':id/detail',
        loadComponent: () =>
          import('./application-detail/application-detail.component').then(
            m => m.ApplicationDetailComponent
          ),
      },
      {
        path: ':id/create',
        loadComponent: () =>
          import('./create-application/create-application.component').then(
            m => m.CreateApplicationComponent
          ),
      },
      {
        path: 'user',
        loadComponent: () =>
          import('./user-application-list/user-application-list.component').then(
            m => m.UserApplicationListComponent
          ),
      },
      {
        path: ':id/delete',
        loadComponent: () =>
          import('./delete-application/delete-application.component').then(
            m => m.DeleteApplicationComponent
          ),
      },
      {
        path: 'reject/:id',
        loadComponent: () =>
          import('./reject-application/reject-application.component').then(
            m => m.RejectApplicationComponent
          ),
      },
    ],
  },
];
