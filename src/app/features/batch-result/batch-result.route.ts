import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const batchResultsRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./batch-result-list/batch-result-list.component').then(m => m.BatchResultListComponent),
            },
            {
                path: 'upload',
                loadComponent: () =>
                    import('./upload-result/upload-result.component').then(m => m.UploadResultComponent),
            },
            {
                path: ':id/delete',
                loadComponent: () =>
                    import('./delet-batch-result/delet-batch-result.component').then(m => m.DeletBatchResultComponent),
            },
            {
                path: ':id',
                loadComponent: () =>
                    import('./batch-result-detail/batch-result-detail.component').then(m => m.BatchResultDetailComponent),
            }
        ]
    }
];
