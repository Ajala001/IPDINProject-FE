import { CourseResponseModel } from "./course"

export class ExaminationModel {
  examTitle: string
  examDateAndTime: string
  examYear: number
  fee: string
  courses: string[];

  constructor() {
    this.examTitle = ""
    this.examDateAndTime = ""
    this.examYear = 0
    this.fee = ""
    this.courses = []
  }
}

export interface ExaminationResponseModel {
  id: string;          
  examTitle: string;
  examDate: string;   
  examTime: string;    
  examYear: number;    
  fee: string;  
  applicationFee: string;
  status: number;      
  courses: CourseResponseModel[];
}