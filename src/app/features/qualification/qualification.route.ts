import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const qualificationRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./qualification-list/qualification-list.component').then(m => m.QualificationListComponent),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./create-qualification/create-qualification.component').then(m => m.CreateQualificationComponent),
      },
      {
        path: ':id/delete',
        loadComponent: () =>
          import('./delete-qualification/delete-qualification.component').then(m => m.DeleteQualificationComponent),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./edit-qualification/edit-qualification.component').then(m => m.EditQualificationComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./qualification-detail/qualification-detail.component').then(m => m.QualificationDetailComponent),
      }
    ]
  }
];
