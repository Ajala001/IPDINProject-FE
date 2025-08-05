import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const trainingRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./training-list/training-list.component').then(m => m.TrainingListComponent),
      },
      {
        path: 'user',
        loadComponent: () =>
          import('./user-training-list/user-training-list.component').then(m => m.UserTrainingListComponent),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./create-training/create-training.component').then(m => m.CreateTrainingComponent),
      },
      {
        path: ':id/delete',
        loadComponent: () =>
          import('./delete-training/delete-training.component').then(m => m.DeleteTrainingComponent),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./edit-training/edit-training.component').then(m => m.EditTrainingComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./training-detail/training-detail.component').then(m => m.TrainingDetailComponent),
      }
    ]
  }
];
