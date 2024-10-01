export interface Examination {
    id: string
    examTitle: string
    examDate: string
    examTime: string
    examYear: number
    fee: number
    courses: Course[]
  }
  
  export interface Course {
    id: string
    courseCode: string
    courseTitle: string
    courseUnit: string
    status: number
  }
  