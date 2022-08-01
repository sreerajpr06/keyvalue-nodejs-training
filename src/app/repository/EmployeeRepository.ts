import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRepository{
    async getAllEmployees(){
        const employeeRepo = getConnection().getRepository(Employee);
        const data = await employeeRepo.find();
        return data;
    }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    public async softDeleteEmployee(employeeId: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const data = employeeRepo.softDelete({
            id: employeeId
        })
        return data;
    }
}
