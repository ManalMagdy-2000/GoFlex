/*
   Student Name : Manal Magdy Eid Khalil Eid
   Student ID : B1901825

*/
import { Review } from "./review";
import { Role } from "./role";
import { Department } from "./department";

export class User {
    id: string;
    username: string; //employee ID
    password: string;
    fullname: string;
    email: string;
    role: Role;
    department?: string;
    reviews?: Review[];
    position?: string;
    token: string;
}
