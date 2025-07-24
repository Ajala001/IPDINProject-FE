export class ApplicationModel {
    serviceId: string | null
    isTraining: boolean

    constructor() {
        this.serviceId = "",
        this.isTraining = false
    }
}


export interface ApplicationResponseModel {
    id: string;
    applicantFullName: string;
    applicationFee: string
    appliedFor: string;
    date: string;
    hasPaid: string
    status: 0
}

export class ApplicationSearchModel {
    searchQuery: string
    pageNumber: number
    pageSize: number

    constructor(){
        this.searchQuery = ""
        this.pageNumber = 0
        this.pageSize = 0
    }
}