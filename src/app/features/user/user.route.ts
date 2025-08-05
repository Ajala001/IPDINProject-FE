import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const userRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./user-list/user-list.component').then(m => m.UserListComponent),
      },
      {
        path: 'add-admin',
        loadComponent: () =>
          import('./add-admin/add-admin.component').then(m => m.AddAdminComponent),
      },
      {
        path: ':email/delete',
        loadComponent: () =>
          import('./detele-account/detele-account.component').then(m => m.DeteleAccountComponent),
      },
      {
        path: ':email/edit',
        loadComponent: () =>
          import('./edit-profile/edit-profile.component').then(m => m.EditProfileComponent),
      },
      {
        path: ':email/detail',
        loadComponent: () =>
          import('./user-profile/user-profile.component').then(m => m.UserProfileComponent),
      }
    ]
  }
];