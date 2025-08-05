import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const examinationRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./examination-list/examination-list.component').then(m => m.ExaminationListComponent),
      },
      {
        path: 'user',
        loadComponent: () =>
          import('./user-examination-list/user-examination-list.component').then(m => m.UserExaminationListComponent),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./create-examination/create-examination.component').then(m => m.CreateExaminationComponent),
      },
      {
        path: ':id/delete',
        loadComponent: () =>
          import('./delete-examination/delete-examination.component').then(m => m.DeleteExaminationComponent),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./edit-examination/edit-examination.component').then(m => m.EditExaminationComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./examination-detail/examination-detail.component').then(m => m.ExaminationDetailComponent),
      }
    ]
  }
];
