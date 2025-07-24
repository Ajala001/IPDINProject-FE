import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ConfirmationPageComponent } from './pages/confirmation-page/confirmation-page.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CourseListComponent } from './pages/course/course-list/course-list.component';
import { CreateCourseComponent } from './pages/course/create-course/create-course.component';
import { EditCourseComponent } from './pages/course/edit-course/edit-course.component';
import { DeleteCourseComponent } from './pages/course/delete-course/delete-course.component';
import { CourseDetailComponent } from './pages/course/course-detail/course-detail.component';
import { ApplicationListComponent } from './pages/application/application-list/application-list.component';
import { CreateApplicationComponent } from './pages/application/create-application/create-application.component';
import { DeleteApplicationComponent } from './pages/application/delete-application/delete-application.component';
import { ApplicationDetailComponent } from './pages/application/application-detail/application-detail.component';
import { ExaminationListComponent } from './pages/examination/examination-list/examination-list.component';
import { CreateExaminationComponent } from './pages/examination/create-examination/create-examination.component';
import { EditExaminationComponent } from './pages/examination/edit-examination/edit-examination.component';
import { DeleteExaminationComponent } from './pages/examination/delete-examination/delete-examination.component';
import { ExaminationDetailComponent } from './pages/examination/examination-detail/examination-detail.component';
import { PaymentListComponent } from './pages/payment/payment-list/payment-list.component';
import { DeletePaymentComponent } from './pages/payment/delete-payment/delete-payment.component';
import { PaymentDetailComponent } from './pages/payment/payment-detail/payment-detail.component';
import { UploadResultComponent } from './pages/batch-result/upload-result/upload-result.component';
import { EditResultComponent } from './pages/result/edit-result/edit-result.component';
import { DeleteResultComponent } from './pages/result/delete-result/delete-result.component';
import { ResultDetailComponent } from './pages/result/result-detail/result-detail.component';
import { TrainingListComponent } from './pages/training/training-list/training-list.component';
import { CreateTrainingComponent } from './pages/training/create-training/create-training.component';
import { EditTrainingComponent } from './pages/training/edit-training/edit-training.component';
import { DeleteTrainingComponent } from './pages/training/delete-training/delete-training.component';
import { QualificationListComponent } from './pages/qualification/qualification-list/qualification-list.component';
import { DeleteQualificationComponent } from './pages/qualification/delete-qualification/delete-qualification.component';
import { EditQualificationComponent } from './pages/qualification/edit-qualification/edit-qualification.component';
import { CreateQualificationComponent } from './pages/qualification/create-qualification/create-qualification.component';
import { QualificationDetailComponent } from './pages/qualification/qualification-detail/qualification-detail.component';
import { TrainingDetailComponent } from './pages/training/training-detail/training-detail.component';
import { VerifyPaymentComponent } from './pages/payment/verify-payment/verify-payment.component';
import { InitiatePaymentComponent } from './pages/payment/initiate-payment/initiate-payment.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { DeteleAccountComponent } from './pages/user/detele-account/detele-account.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { EditProfileComponent } from './pages/user/edit-profile/edit-profile.component';
import { RejectApplicationComponent } from './pages/application/rejectApplication/reject-application/reject-application.component';
import { UserApplicationListComponent } from './pages/application/user-application-list/user-application-list.component';
import { UserExaminationListComponent } from './pages/examination/user-examination-list/user-examination-list.component';
import { UserPaymentListComponent } from './pages/payment/user-payment-list/user-payment-list.component';
import { UserTrainingListComponent } from './pages/training/user-training-list/user-training-list.component';
import { ResultListComponent } from './pages/result/result-list/result-list.component';
import { BatchResultListComponent } from './pages/batch-result/batch-result-list/batch-result-list.component';
import { AddAdminComponent } from './pages/user/add-admin/add-admin.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ServicesComponent } from './pages/service/service-list/services.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { ServiceDetailComponent } from './pages/service/service-detail/service-detail.component';
import { authGuard } from './guards/auth.guard';

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
        path: 'layout',
        component: LayoutComponent
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
           
            { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
            { path: 'change-password', component: ChangePasswordComponent },

            // AccessDenied Routes - 403
            { path: 'access-denied', component: AccessDeniedComponent},
            
            // Course Routes
            { path: 'courses', component: CourseListComponent, canActivate: [authGuard] }, // List all courses
            { path: 'courses/create', component: CreateCourseComponent, canActivate: [authGuard] }, // Create a new course
            { path: 'courses/:id/edit', component: EditCourseComponent, canActivate: [authGuard] }, // Edit a course
            { path: 'courses/:id/delete', component: DeleteCourseComponent }, // Delete a course
            { path: 'courses/:id', component: CourseDetailComponent, canActivate: [authGuard] }, // View course details

            // AppApplication Routes
            { path: 'applications', component: ApplicationListComponent, canActivate: [authGuard] }, // List all applications
            { path: 'applications/:id/create', component: CreateApplicationComponent, canActivate: [authGuard] },
            { path: 'applications-user', component: UserApplicationListComponent, canActivate: [authGuard] }, // List user all applications
            { path: 'applications/:id/detail', component: ApplicationDetailComponent, canActivate: [authGuard] }, // View application details
            { path: 'applications/:id/delete', component: DeleteApplicationComponent, canActivate: [authGuard] }, // Delete an application
            { path: 'applications/reject/:id', component: RejectApplicationComponent, canActivate: [authGuard]},
           

            // Examination Routes
            { path: 'examinations', component: ExaminationListComponent, canActivate: [authGuard] }, // List all examinations
            { path: 'examinations-user', component: UserExaminationListComponent, canActivate: [authGuard] }, // List all examinations
            { path: 'examinations/create', component: CreateExaminationComponent, canActivate: [authGuard] }, // Create an examination
            { path: 'examinations/:id/edit', component: EditExaminationComponent, canActivate: [authGuard] }, // Edit an examination
            { path: 'examinations/:id/delete', component: DeleteExaminationComponent, canActivate: [authGuard] }, // Delete an examination
            { path: 'examinations/:id', component: ExaminationDetailComponent, canActivate: [authGuard] }, // View examination details

            // Payment Routes
            { path: 'payments', component: PaymentListComponent, canActivate: [authGuard] }, // List all payments
            { path: 'payments-user', component: UserPaymentListComponent, canActivate: [authGuard] }, // List all payments
            { path: 'payments/initiate/:id', component: InitiatePaymentComponent, canActivate: [authGuard] }, // Initiate a payment
            { path: 'payments/verify', component: VerifyPaymentComponent, canActivate: [authGuard] },
            { path: 'payments/:refNo', component: PaymentDetailComponent, canActivate: [authGuard] }, // View payment details
            { path: 'payments/:refNo/delete', component: DeletePaymentComponent, canActivate: [authGuard] }, // Delete a payment
            

            // Result Routes
            { path: 'results', component: ResultListComponent, canActivate: [authGuard] }, // List all results
            { path: 'results/:id/edit', component: EditResultComponent, canActivate: [authGuard] }, // Edit a result
            { path: 'results/:id/detail', component: ResultDetailComponent, canActivate: [authGuard] }, // View result details
            { path: 'results/:id/delete', component: DeleteResultComponent, canActivate: [authGuard] }, // Delete a result

            // Services Routes
             { path: 'services', component: ServicesComponent, canActivate: [authGuard] }, // List all results
             { path: 'services/:id/detail', component: ServiceDetailComponent, canActivate: [authGuard] },

            // Batch Result Routes
            { path: 'batchResults', component: BatchResultListComponent, canActivate: [authGuard] }, // List all results
            { path: 'batchResults/upload', component: UploadResultComponent, canActivate: [authGuard] }, // Create a result
            { path: 'batchResults/:id/edit', component: EditResultComponent, canActivate: [authGuard] }, // Edit a result
            { path: 'batchResults/:id/delete', component: DeleteResultComponent, canActivate: [authGuard] }, // Delete a result
            { path: 'batchResults/:id', component: ResultDetailComponent, canActivate: [authGuard] }, // View result details


            // Training Routes
            { path: 'trainings', component: TrainingListComponent,canActivate: [authGuard] }, // List all trainings
            { path: 'trainings-user', component: UserTrainingListComponent, canActivate: [authGuard] }, // List all trainings
            { path: 'trainings/create', component: CreateTrainingComponent, canActivate: [authGuard] }, // Create a training
            { path: 'trainings/:id/edit', component: EditTrainingComponent, canActivate: [authGuard] }, // Edit a training
            { path: 'trainings/:id/delete', component: DeleteTrainingComponent, canActivate: [authGuard] }, // Delete a training
            { path: 'trainings/:id', component: TrainingDetailComponent, canActivate: [authGuard] }, // View training details

            // AcademicQualification Routes
            { path: 'qualifications', component: QualificationListComponent, canActivate: [authGuard] }, // List all academic qualifications
            { path: 'qualifications/create/:email', component: CreateQualificationComponent, canActivate: [authGuard] }, // Create an academic qualification
            { path: 'qualifications/:id/edit', component: EditQualificationComponent, canActivate: [authGuard] }, // Edit an academic qualification
            { path: 'qualifications/:id/delete', component: DeleteQualificationComponent, canActivate: [authGuard] }, // Delete an academic qualification
            { path: 'qualifications/:id/detail', component: QualificationDetailComponent, canActivate: [authGuard] }, // View academic qualification details

            // User Routes
            { path: 'users/add-admin', component: AddAdminComponent, canActivate: [authGuard] },
            { path: 'users', component: UserListComponent, canActivate: [authGuard] },
            { path: 'users/create', component: CreateQualificationComponent, canActivate: [authGuard] }, 
            { path: 'users/:email/edit', component: EditProfileComponent, canActivate: [authGuard] }, 
            { path: 'users/:email/detail', component: UserProfileComponent, canActivate: [authGuard] },
            { path: 'users/:email/delete', component: DeteleAccountComponent, canActivate: [authGuard] }, 
            

             { path: '', redirectTo: 'dashboard', pathMatch: 'full' }     // default route for the LayoutComponent
        ]
    },
    { path: '**', redirectTo: 'home' }  // // Handle 404 Not Found
];

