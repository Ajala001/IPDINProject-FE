import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'team',
    loadComponent: () => import('./features/team/team.component').then(m => m.TeamComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about-us/about-us.component').then(m => m.AboutUsComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'test',
    loadComponent: () => import('./features/test/test.component').then(m => m.TestComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.route').then(m => m.authRoutes)
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [() => import('./core/guards/auth.guard').then(m => m.authGuard)],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.route').then(m => m.dashboardRoutes)
      },
      {
        path: 'courses',
        loadChildren: () => import('./features/course/course.route').then(m => m.courseRoutes)
      },
      {
        path: 'applications',
        loadChildren: () => import('./features/application/application.route').then(m => m.applicationRoutes)
      },
      {
        path: 'examinations',
        loadChildren: () => import('./features/examination/examination.route').then(m => m.examinationRoutes)
      },
      {
        path: 'payments',
        loadChildren: () => import('./features/payment/payment.route').then(m => m.paymentRoutes)
      },
      {
        path: 'results',
        loadChildren: () => import('./features/result/result.route').then(m => m.resultRoutes)
      },
      {
        path: 'batch-results',
        loadChildren: () => import('./features/batch-result/batch-result.route').then(m => m.batchResultsRoutes)
      },
      {
        path: 'trainings',
        loadChildren: () => import('./features/training/training.route').then(m => m.trainingRoutes)
      },
      {
        path: 'qualifications',
        loadChildren: () => import('./features/qualification/qualification.route').then(m => m.qualificationRoutes)
      },
      {
        path: 'users',
        loadChildren: () => import('./features/user/user.route').then(m => m.userRoutes)
      },
      {
        path: 'services',
        loadChildren: () => import('./features/service/service.route').then(m => m.serviceRoutes)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];



