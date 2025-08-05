import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const resultRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./result-list/result-list.component').then(m => m.ResultListComponent),
            },
            {
                path: ':id/delete',
                loadComponent: () =>
                    import('./delete-result/delete-result.component').then(m => m.DeleteResultComponent),
            },
            {
                path: ':id/edit',
                loadComponent: () =>
                    import('./edit-result/edit-result.component').then(m => m.EditResultComponent),
            },
            {
                path: ':id/detail',
                loadComponent: () =>
                    import('./result-detail/result-detail.component').then(m => m.ResultDetailComponent),
            }
        ]
    }
];
