import { User } from "./user";
import { Request } from "./request";

export class Department {
    departmentID: string;
    name: string;
    admins: User[];
    requests: Request[];
}
