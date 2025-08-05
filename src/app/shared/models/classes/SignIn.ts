export class SignInModel {
    membershipNumber: string
    password: string
    rememberMe: boolean

    constructor(){
        this.membershipNumber = "",
        this.password = "",
        this.rememberMe = false
    }
}