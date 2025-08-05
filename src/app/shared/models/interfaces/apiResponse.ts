export interface apiResponse {
    authorizationUrl: string | null;
    isSuccessful : boolean,
    message : string,
    data : any
}

export interface ApiResponse<T> {
    isSuccessful: boolean;
    message: string;
    data?: T;
  }
