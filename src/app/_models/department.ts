import { Employee } from "./employee";
import { Request } from "./request";

export class Department {
    departmentID: string;
    name: string;
    Admins: Employee[];
    requests: Request[];
}
