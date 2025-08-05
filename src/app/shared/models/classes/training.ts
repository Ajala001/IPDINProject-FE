export class TrainingModel {
    title: string
    description: string
    fee: number
    startingDateAndTime: string
    endingDateAndTime: string
    registrationDeadline: string
    duration: number
    capacity: number
    category: number
    status: number

    constructor(){
        this.title = "",
        this.description = "",
        this.fee = 0,
        this.startingDateAndTime = "",
        this.endingDateAndTime = "",
        this.registrationDeadline = "",
        this.duration = 0,
        this.capacity = 0,
        this.category = 0,
        this.status = 0
    }
  }


  export interface TrainingResponseModel{
    id: string;          
    title: string;
    description: string;   
    fee: string;    
    startingDateAndTime: string;    
    endingDateAndTime: string; 
    registrationDeadline: string;
    duration: number;  
    capacity: number;
    category: number    
    status: number;
  }

  export interface TrainingUpdateModel{       
    title: string;
    description: string;   
    fee: number;    
    startingDateAndTime: string;    
    endingDateAndTime: string; 
    registrationDeadline: string;
    duration: number;  
    capacity: number;
    category: number    
    status: number;
  }