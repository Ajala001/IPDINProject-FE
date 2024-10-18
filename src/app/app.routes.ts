import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
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
import { EditApplicationComponent } from './pages/application/edit-application/edit-application.component';
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
import { UploadResultComponent } from './pages/result/upload-result/upload-result.component';
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
            
            // Course Routes
            { path: 'courses', component: CourseListComponent }, // List all courses
            { path: 'courses/create', component: CreateCourseComponent }, // Create a new course
            { path: 'courses/:id/edit', component: EditCourseComponent }, // Edit a course
            { path: 'courses/:id/delete', component: DeleteCourseComponent }, // Delete a course
            { path: 'courses/:id', component: CourseDetailComponent }, // View course details

            // AppApplication Routes
            { path: 'applications', component: ApplicationListComponent }, // List all applications
            { path: 'applications/create', component: CreateApplicationComponent }, // Create an application
            { path: 'applications/:id', component: ApplicationDetailComponent }, // View application details
            { path: 'applications/:id/edit', component: EditApplicationComponent }, // Edit an application
            { path: 'applications/:id/delete', component: DeleteApplicationComponent }, // Delete an application
           

            // Examination Routes
            { path: 'examinations', component: ExaminationListComponent }, // List all examinations
            { path: 'examinations/create', component: CreateExaminationComponent }, // Create an examination
            { path: 'examinations/:id/edit', component: EditExaminationComponent }, // Edit an examination
            { path: 'examinations/:id/delete', component: DeleteExaminationComponent }, // Delete an examination
            { path: 'examinations/:id', component: ExaminationDetailComponent }, // View examination details

            // Payment Routes
            { path: 'payments', component: PaymentListComponent }, // List all payments
            { path: 'payments/initiate/:id', component: InitiatePaymentComponent }, // Initiate a payment
            { path: 'payments/verify', component: VerifyPaymentComponent },
            { path: 'payments/:refNo', component: PaymentDetailComponent }, // View payment details
            { path: 'payments/:refNo/delete', component: DeletePaymentComponent }, // Delete a payment
            

            // Result Routes
            // { path: 'results', component: ResultListComponent }, // List all results
            { path: 'results/upload', component: UploadResultComponent }, // Create a result
            { path: 'results/:id/edit', component: EditResultComponent }, // Edit a result
            { path: 'results/:id/delete', component: DeleteResultComponent }, // Delete a result
            { path: 'results/:id', component: ResultDetailComponent }, // View result details

            // Training Routes
            { path: 'trainings', component: TrainingListComponent }, // List all trainings
            { path: 'trainings/create', component: CreateTrainingComponent }, // Create a training
            { path: 'trainings/:id/edit', component: EditTrainingComponent }, // Edit a training
            { path: 'trainings/:id/delete', component: DeleteTrainingComponent }, // Delete a training
            { path: 'trainings/:id', component: TrainingDetailComponent }, // View training details

            // RegistrationType Routes
            // { path: 'registration-types', component: RegistrationTypeListComponent }, // List all registration types
            // { path: 'registration-types/create', component: CreateRegistrationTypeComponent }, // Create a registration type
            // { path: 'registration-types/:id/edit', component: EditRegistrationTypeComponent }, // Edit a registration type
            // { path: 'registration-types/:id/delete', component: DeleteRegistrationTypeComponent }, // Delete a registration type
            // { path: 'registration-types/:id', component: RegistrationTypeDetailComponent }, // View registration type details

            // AcademicQualification Routes
            { path: 'qualifications', component: QualificationListComponent }, // List all academic qualifications
            { path: 'qualifications/create', component: CreateQualificationComponent }, // Create an academic qualification
            { path: 'qualifications/:id/edit', component: EditQualificationComponent }, // Edit an academic qualification
            { path: 'qualifications/:id/delete', component: DeleteQualificationComponent }, // Delete an academic qualification
            { path: 'qualifications/:id/detail', component: QualificationDetailComponent }, // View academic qualification details

            // User Routes
            { path: 'users', component: UserListComponent },
            { path: 'users/create', component: CreateQualificationComponent }, 
            { path: 'users/:email/edit', component: EditProfileComponent }, 
            { path: 'users/:email/delete', component: DeteleAccountComponent }, 
            { path: 'users/:email/detail', component: UserProfileComponent },

            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }     // default route for the LayoutComponent
        ]
    },
    { path: '**', redirectTo: 'home' }  // // Handle 404 Not Found
];

