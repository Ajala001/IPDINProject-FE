export class SignInModel {
    identifier: string
    password: string
    rememberMe: boolean

    constructor(){
        this.identifier = ""
        this.password = "",
        this.rememberMe = false
    }
}