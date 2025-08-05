export interface pagedResponse {
    isSuccessful: boolean,
    message: string,
    totalRecords: number,
    totalPages: number,
    pageSize: number,
    currentPage: number,
    data: any
}
