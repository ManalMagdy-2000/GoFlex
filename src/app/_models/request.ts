import { Review } from "./review";

export class Request {
    requestID: string;
    description: string;
    date: string;
    time: string;
    studentLevel: string;
    numberOfStudents: number;
    status: string;
    reviews: Review[];
}
