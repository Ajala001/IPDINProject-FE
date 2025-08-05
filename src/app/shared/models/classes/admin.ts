import { AcademicQualificationModel } from "./academicQualification"

export class AddAdminModel {
    levelId: string
    lastName: string
    firstName: string
    email: string
    gender: number
    dateOfBirth: DateOfBirth
    stateOfResidence: string
    country: string
    yearsOfExperience: number
    driverLicenseNo: string
    nameOfCurrentDrivingSchool: string
    academicQualifications: AcademicQualificationModel[]
    

    constructor() {
      this.levelId = "";
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.gender = 0;
      this.dateOfBirth = { year: 2000, month: 1, day: 1, dayOfWeek: 1 };
      this.stateOfResidence = "";
      this.country = "";
      this.yearsOfExperience = 0;
      this.driverLicenseNo = "";
      this.nameOfCurrentDrivingSchool = "";
      this.academicQualifications = []
    }
  }
  
export interface DateOfBirth {
  year: number
  month: number
  day: number
  dayOfWeek: number
}



