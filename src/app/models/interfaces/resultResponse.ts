export interface BatchResultResponseDto {
    id: string;
    examTitle: string;
    uploadDate: string; 
    numberOfUploadedResults: number;
    studentResults: StudentResultResponseDto[];
}


export interface StudentResultResponseDto {
    id: string; 
    fullName: string;
    examTitle: string;
    totalScore: number;
    breakdown: string;
}
