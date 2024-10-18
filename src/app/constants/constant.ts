export const apiEndpoints =
{
    //Authentication
    signUpUrl: '/auth/signUp',
    signInUrl: '/auth/signIn',
    signOutUrl: '/auth/signOut',
    forgetPasswordUrl: '/auth/forgetPassword',
    resetPasswordUrl: '/auth/resetPassword',

    //Application
    createApplicationUrl: '/applications',
    getApplicationsUrl: '/applications',
    searchApplicationsUrl: '/applications/search',
    getApplicationByIdUrl: (id: string) => `/applications/${id}`,
    updateApplicationUrl(id: string) : string {
      return `/applications/${id}`
    }, // utility function
    deleteApplicationUrl: (id: string) => `/applications/${id}`,
    downloadApplicationSlipUrl: (id: string) => `/applications/download-applicationSlip/${id}`,
    acceptApplicationUrl: (id: string) => `/applications/accept/${id}`,
    rejectApplicationUrl: (id: string) => `/applications/reject/${id}`,

    //Course
    createCourseUrl: '/courses',
    getCoursesUrl: '/courses',
    searchCoursesUrl: '/courses/search',
    getCourseByIdUrl: (id: string) => `/courses/${id}`,
    updateCourseUrl(id: string) : string {
      return `/courses/${id}`
    },
    deleteCourseUrl: (id: string) => `/courses/${id}`,

    //Examination
    createExaminationUrl: '/examinations',
    getExaminationsUrl: '/examinations',
    searchExaminationUrl: '/examinations/search',
    getExaminationByIdUrl: (id: string) => `/examinations/${id}`,
    updateExaminationUrl: (id: string) => `/examinations/${id}`,
    deleteExaminationUrl: (id: string) => `/examinations/${id}`,

    //Payment
    getPaymentsUrl: '/payments',
    initiatePaymentUrl: '/payments/initiatePayment',
    verifyPaymentUrl: '/payments/verify',
    searchPaymentsUrl: '/payments/search',
    getPaymentsByRefNoUrl: (refNo: string) => `/payments/${refNo}`,
    deletePaymentUrl: (refNo: string) => `/payments/${refNo}`,
    updatePaymentUrl: (refNo: string) => `/payments/${refNo}`,

    //Qualifications
    createQualificationUrl: '/qualifications',
    getQualificationsUrl: '/qualifications',
    getQualificationByIdUrl: (id: string) => `/qualifications/${id}`,
    updateQualificationUrl: (id: string) => `/qualifications/${id}`,
    deleteQualificationUrl: (id: string) => `/qualifications/${id}`,

    //Level
    createLevelUrl: '/levels',
    getLevelsUrl: '/levels',
    getLevelByIdUrl: (id: string) => `/levels/${id}`,
    updateLevelUrl: (id: string) => `/levels/${id}`,
    deleteLevelUrl: (id: string) => `/levels/${id}`,

    //Result
    getResultsUrl: '/results',
    uploadResultUrl: '/results/uploadResult',
    getStudentResultUrl: (memNo: string) => `/registrationTypes/${memNo}`,
    UpdateStudentResultUrl: (memNo: string) => `/registrationTypes/${memNo}`,
    deleteStudentResultUrl: (memNo: string) => `/registrationTypes/${memNo}`,

    //Roles
    createRoleUrl: '/roles',
    getRolesUrl: '/roles',
    getRoleByNameUrl: (name: string) => `/roles/${name}`,
    updateRoleUrl: (name: string) => `/roles/${name}`,
    deleteRoleUrl: (name: string) => `/registrationTypes/${name}`,

    //Training
    createTrainingUrl: '/trainings',
    getTrainingsUrl: '/trainings',
    searchtrainingUrl: '/trainings/search',
    getTrainingByIdUrl: (id: string) => `/trainings/${id}`,
    updateTrainingUrl: (id: string) => `/trainings/${id}`,
    deleteTrainingUrl: (id: string) => `/trainings/${id}`,

    //User
    getUsersUrl: '/users',
    searchUsersUrl: '/users/search',
    getUserByEmailUrl: (email: string) => `/users/${email}`,
    updateUserUrl: (email: string) => `/users/${email}`,
    deleteUserUrl: (email: string) => `/users/${email}`,
};




// (params: { [key: string]: any }) => {
//   return Object.entries(params)
//     .filter(([key, value]) => value) // Exclude empty or null values
//     .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
//     .join('&'); // Join with '&'
// },