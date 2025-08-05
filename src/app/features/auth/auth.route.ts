import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./sign-in/sign-in.component').then(m => m.SignInComponent),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./sign-up/sign-up.component').then(m => m.SignUpComponent),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import('./change-password/change-password.component').then(m => m.ChangePasswordComponent),
      },
      {
        path: 'confirmation-page',
        loadComponent: () =>
          import('./confirmation-page/confirmation-page.component').then(m => m.ConfirmationPageComponent),
      },
    ]
  }
];
