import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const serviceRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./service-list/services.component').then(m => m.ServicesComponent),
            },
            {
                path: ':id/detail',
                loadComponent: () =>
                    import('.//service-detail/service-detail.component').then(m => m.ServiceDetailComponent),
            }
        ]
    }
];