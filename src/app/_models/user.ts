import { Offer } from "./offer";
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
    offers?: Offer[];
    position?: string;
    token: string;
}
