export interface BatchResultResponseDto {
    id: string;
    examId: string;
    examTitle: string;
    uploadDate: string; 
    totalStudents: number;
    studentResults: StudentResultResponseDto[];
}


export interface StudentResultResponseDto {
    id: string; 
    batchId: string;
    examId: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    profilePic: string;
    membershipNumber: string
    totalScore: number;
    breakdown: string;
}