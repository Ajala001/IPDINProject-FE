import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const courseRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./course-list/course-list.component').then(m => m.CourseListComponent),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./create-course/create-course.component').then(m => m.CreateCourseComponent),
      },
      {
        path: ':id/delete',
        loadComponent: () =>
          import('./delete-course/delete-course.component').then(m => m.DeleteCourseComponent),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./edit-course/edit-course.component').then(m => m.EditCourseComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./course-detail/course-detail.component').then(m => m.CourseDetailComponent),
      }
    ]
  }
];








