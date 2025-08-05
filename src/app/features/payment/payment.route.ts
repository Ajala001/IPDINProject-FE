import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const paymentRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./payment-list/payment-list.component').then(m => m.PaymentListComponent),
            },
            {
                path: 'user',
                loadComponent: () =>
                    import('./user-payment-list/user-payment-list.component').then(m => m.UserPaymentListComponent),
            },
            {
                path: 'initiate/:id',
                loadComponent: () =>
                    import('./initiate-payment/initiate-payment.component').then(m => m.InitiatePaymentComponent),
            },
            {
                path: ':refNo/delete',
                loadComponent: () =>
                    import('./delete-payment/delete-payment.component').then(m => m.DeletePaymentComponent),
            },
            {
                path: ':refNo',
                loadComponent: () =>
                    import('./payment-detail/payment-detail.component').then(m => m.PaymentDetailComponent),
            },
            {
                path: 'verify',
                loadComponent: () =>
                    import('./verify-payment/verify-payment.component').then(m => m.VerifyPaymentComponent),
            }
            
        ]
    }
];
