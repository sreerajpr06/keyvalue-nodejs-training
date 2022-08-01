import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRepository{
    async getAllEmployees(){
        const employeeRepo = getConnection().getRepository(Employee);
        const data = await employeeRepo.find();
        return data;
    }
}
