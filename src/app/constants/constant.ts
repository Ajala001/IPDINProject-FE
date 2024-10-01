export const apiEndpoints =
{
    //Authentication
    signUp: '/auth/signUp',
    signIn: '/auth/signIn',
    signOut: '/auth/signOut',
    forgetPassword: '/auth/forgetPassword',
    resetPassword: '/auth/resetPassword',

    //Application
    addApplication: '/applications',
    getApplications: '/applications',
    getApplicationById: (id: string) => `/applications/${id}`,
    updateApplication: (id: string) => `/applications/${id}`,
    deleteApplication: (id: string) => `/applications/${id}`,
    downloadApplicationSlip: (id: string) => `/applications/download-applicationSlip/${id}`,

    //Course
    addCourse: '/courses',
    getCourses: '/courses',
    searchCourses: (params: { [key: string]: any }) => {
        // Construct query string from params
        const queryString = Object.entries(params)
          .filter(([key, value]) => value) // Exclude empty values
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&');
        return `/courses/search?${queryString}`;
    },
    getCourseById: (id: string) => `/courses/${id}`,
    updateCourse: (id: string) => `/courses/${id}`,
    deleteCourse: (id: string) => `/courses/${id}`,

    //Examination
    addExamination: '/examinations',
    getExaminations: '/examinations',
    searchExamination: '/examinations/search',
    getExaminationById: (id: string) => `/examinations/${id}`,
    updateExamination: (id: string) => `/examinations/${id}`,
    deleteExamination: (id: string) => `/examinations/${id}`,

    //Payment
    getPayments: '/payments',
    initiatePayment: '/payments/initiatePayment',
    verifyPayment: '/payments/verify',
    getPaymentsByRefNo: (refNo: string) => `/payments/${refNo}`,
    deletePayment: (refNo: string) => `/payments/${refNo}`,
    updatePayment: (refNo: string) => `/payments/${refNo}`,

    //Qualifications
    addQualification: '/qualifications',
    getQualifications: '/qualifications',
    getQualificationById: (id: string) => `/qualifications/${id}`,
    updateQualification: (id: string) => `/qualifications/${id}`,
    deleteQualification: (id: string) => `/qualifications/${id}`,

    //RegistrationType
    addRegistrationType: '/registrationTypes',
    getRegistrationTypes: '/registrationTypes',
    getRegistrationTypeById: (id: string) => `/registrationTypes/${id}`,
    updateRegistrationType: (id: string) => `/registrationTypes/${id}`,
    deleteRegistrationType: (id: string) => `/registrationTypes/${id}`,

    //Result
    getResults: '/results',
    uploadResult: '/results/uploadResult',
    getStudentResult: (memNo: string) => `/registrationTypes/${memNo}`,
    UpdateStudenResult: (memNo: string) => `/registrationTypes/${memNo}`,
    deleteStudentResult: (memNo: string) => `/registrationTypes/${memNo}`,

    //Roles
    addRoles: '/roles',
    getRoles: '/roles',
    getRoleByName: (name: string) => `/roles/${name}`,
    updateRoles: (name: string) => `/roles/${name}`,
    deleteRole: (name: string) => `/registrationTypes/${name}`,

    //Training
    addTraining: '/trainings',
    getTrainings: '/trainings',
    searchtraining: '/trainings/search',
    getTrainingById: (id: string) => `/trainings/${id}`,
    updateTraining: (id: string) => `/trainings/${id}`,
    deleteTraining: (id: string) => `/trainings/${id}`,

    //User
    getUsers: '/users',
    getUserByEmail: (email: string) => `/users/${email}`,
    updateUser: (email: string) => `/users/${email}`,
    deleteUser: (email: string) => `/users/${email}`,
};