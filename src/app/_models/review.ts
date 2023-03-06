import { User } from "./user";

export class Review {
    reviewID: string;
    reviewStatus: string;
    resason : string;
    reviewDate: string;
    supervisor: User;
    request: string;
}
