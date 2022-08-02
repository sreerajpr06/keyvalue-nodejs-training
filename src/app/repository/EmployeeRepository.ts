import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRepository {
    async getAllEmployees() {
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

    public async getEmployeeByName(username: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { name: username },
        });
        return employeeDetail;
    }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        const data = employeeRepo.save(employeeDetails);
        return data;
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
            }, employeeDetails
        )
        const updatedData = await employeeRepo.findOne(employeeDetails.id)
        return data;
    }
}
