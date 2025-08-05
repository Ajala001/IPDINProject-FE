export interface UserUpdateModel {
    phoneNumber: string
    dateOfBirth: string
    profilePic: File | null
    streetNo: string
    streetName: string
    city: string
    stateOfResidence: string
    localGovt: string
    stateOfOrigin: string
    country: string
    driverLicenseNo: string
    yearIssued: number
    expiringDate: string
    yearsOfExperience: number
    nameOfCurrentDrivingSchool: string
  }



  export interface UserResponseModel {
    id: string;
    fullName: string;
    membershipNumber: string;
    email: string
    gender: number;
    dateOfBirth: string; // Use 'Date' if working with Date objects
    profilePic: string;
    address: string;
    localGovt: string;
    level: string
    stateOfOrigin: string;
    driverLicenseNo: string;
    yearIssued: number;
    expiringDate: string; // Use 'Date' if working with Date objects
    yearsOfExperience: number;
    nameOfCurrentDrivingSchool: string;
    academicQualifications: AcademicQualificationInfo[];
}

interface AcademicQualificationInfo {
    degree: string;
    fieldOfStudy: string;
}

export interface User {
  fullName: string;
  email: string;
  profilePic: string;
}
