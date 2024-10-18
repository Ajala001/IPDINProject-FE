export class ApplicationModel {
    applicationId: string
    applicationType: string

    constructor() {
        this.applicationId = "",
            this.applicationType = ""
    }
}


export interface ApplicationResponseModel {
    id: string;
    applicantfullName: string;
    applicationPurpose: string;
    date: string;
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