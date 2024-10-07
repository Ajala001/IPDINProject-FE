export class ExaminationSearchmodel {
    searchQuery: string
    pageNumber: number
    pageSize: number

    constructor(){
        this.searchQuery = ""
        this.pageNumber = 0
        this.pageSize = 0
    }
}