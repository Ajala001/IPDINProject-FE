export class CourseModel {
    courseCode: string
    courseTitle: string
    courseUnit: string
    status: number

    constructor(){
        this.courseCode = ""
        this.courseTitle = ""
        this.courseUnit = ""
        this.status = 0
    }
  }

  export interface CourseResponseModel {
    id: string
    courseCode: string
    courseTitle: string
    courseUnit: string
    status: number
  }

  export interface CourseResponseModel2 {
    id: string
    courseCode: string
    courseTitle: string
    courseUnit: string
    status: number
    selected: boolean;
  }