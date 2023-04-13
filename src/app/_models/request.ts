import { Review } from "./review";
/*
   Student Name : Manal Magdy Eid Khalil Eid
   Student ID : B1901825

*/
export class Request {
    requestID: string;
    description: string;
    workType: string ;
    date: string;
    status: string;
    reason : string;
    reviews: Review[];
}
