import { Offer } from "./offer";
import { Role } from "./role";
import { Department } from "./department";

export class Supervisor {
    supervisorID: string;
    password: string;
    fullname: string;
    role: Role;
    department?: string;
    offers?: Offer[];
    position?: string;
    token: string;
}
