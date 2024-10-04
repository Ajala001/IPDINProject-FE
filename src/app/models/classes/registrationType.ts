export class RegistrationTypeResponse {
    id: string
    name: string
    dues: number

    constructor(){
        this.id = "",
        this.name = "",
        this.dues = 0
    }
}

export class RegistrationTypeModel {
    name: string
    dues: number


    constructor(){
        this.name = "",
        this.dues = 0
    }
  }