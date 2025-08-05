import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const dashboardRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./dashboard.component').then(m => m.DashboardComponent),
            },
            // {
            //     path: ':id/detail',
            //     loadComponent: () =>
            //         import('.//service-detail/service-detail.component').then(m => m.ServiceDetailComponent),
            // }
        ]
    }
];