import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRepository{
    async getAllEmployees(){
        const employeeRepo = getConnection().getRepository(Employee);
        const data = await employeeRepo.find();
        return data;
    }

    public async getEmployeeById(employeeId: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const data = await employeeRepo.findOne({
            id: employeeId
        })
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

    public async updateEmployee(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        const data = await employeeRepo.update(
            {
                id: employeeDetails.id,
                deletedAt: null
            },
            {
                name: employeeDetails.name ? employeeDetails.name : undefined,
                departmentId: employeeDetails.departmentId ? employeeDetails.departmentId : undefined
            }
        )
        const updatedData = await employeeRepo.findOne(employeeDetails.id)
        return data;
    }
}
