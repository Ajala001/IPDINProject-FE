export class ResetPasswordModel {
    token: string
    email: string
    newPassword: string
    confirmPassword: string

    constructor(){
        this.token = ""
        this.email = ""
        this.newPassword = ""
        this.confirmPassword = ""
    }
  }