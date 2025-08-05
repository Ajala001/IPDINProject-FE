import { authGuard } from '../../core/guards/auth.guard';

export const roleRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./role-list/role-list.component').then(m => m.RoleListComponent),
            },
            {
                path: ':id/delete',
                loadComponent: () =>
                    import('./delete-role/delete-role.component').then(m => m.DeleteRoleComponent),
            },
            {
                path: ':id/edit',
                loadComponent: () =>
                    import('./edit-role/edit-role.component').then(m => m.EditRoleComponent),
            },
            {
                path: 'create',
                loadComponent: () =>
                    import('./create-role/create-role.component').then(m => m.CreateRoleComponent),
            }
        ]
    }
];
