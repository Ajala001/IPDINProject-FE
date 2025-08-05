import { AcademicQualificationModel } from "./academicQualification"



export class SignUpModel {
  levelId: string
  lastName: string
  firstName: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  gender: number
  dateOfBirth: DateOfBirth
  country: string
  stateOfResidence: string
  driverLicenseNo: string
  yearIssued: number
  expiringDate: ExpiringDate
  yearsOfExperience: number
  nameOfCurrentDrivingSchool: string
  academicQualifications: AcademicQualificationModel[]

  constructor() {
    this.levelId = "";
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.phoneNumber = "";
    this.password = "";
    this.confirmPassword = "";
    this.gender = 0;
    this.dateOfBirth = { year: 2000, month: 1, day: 1, dayOfWeek: 1 };
    this.country = "";
    this.stateOfResidence = "";
    this.driverLicenseNo = "";
    this.yearIssued = 0;
    this.expiringDate = { year: 2000, month: 1, day: 1, dayOfWeek: 1 };
    this.yearsOfExperience = 0;
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

export interface ExpiringDate {
  year: number
  month: number
  day: number
  dayOfWeek: number
}

