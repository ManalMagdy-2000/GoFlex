import { Offer } from "./offer";
import { Role } from "./role";
import { Department } from "./department";

export class Employee {
    employeeID: string;
    password: string;
    fullname: string;
    email: string;
    occupation?: string;
    dateOfBirth?: string;
    role: Role;
    department?: string;
    offers?: Offer[];
    position?: string;
    token: string;
}
