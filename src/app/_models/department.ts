import { Admin } from "./admin";
import { Request } from "./request";

export class Department {
    departmentID: string;
    name: string;
    Admins: Admin[];
    requests: Request[];
}
