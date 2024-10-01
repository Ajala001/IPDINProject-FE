import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ConfirmationPageComponent } from './pages/confirmation-page/confirmation-page.component';
import { UserComponent } from './pages/user/user.component';
import { ApplicationComponent } from './pages/application/application.component';
import { CourseComponent } from './pages/course/course.component';
import { ExaminationComponent } from './pages/examination/examination.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { QualificationComponent } from './pages/qualification/qualification.component';
import { ResultComponent } from './pages/result/result.component';
import { RoleComponent } from './pages/role/role.component';
import { TrainingComponent } from './pages/training/training.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutUsComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'forget-password',
        component: ForgetPasswordComponent
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    },
    {
        path: 'confirmation-page',
        component: ConfirmationPageComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'application', component: ApplicationComponent },
            { path: 'course', component: CourseComponent },
            { path: 'examination', component: ExaminationComponent },
            { path: 'payment', component: PaymentComponent },
            { path: 'qualification', component: QualificationComponent },
            { path: 'result', component: ResultComponent },
            { path: 'role', component: RoleComponent },
            { path: 'training', component: TrainingComponent },
            { path: 'user', component: UserComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }     // default route for the LayoutComponent
        ]
    },
    { path: '**', redirectTo: 'home' }  // // Handle 404 Not Found
];

