import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import { EmployeeRepository } from "../repository/EmployeeRepository";

export class EmployeeService{
    constructor(private employeeRepository: EmployeeRepository) {

    }

    async getAllEmployees(){
        const data = await this.employeeRepository.getAllEmployees();
        return data;
    }
    
    public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                // username: employeeDetails.username,
                // age: employeeDetails.age,
                departmentId: employeeDetails.departmentId,
                // isActive: true,
            });
            const save = await this.employeeRepository.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee");
        }
    }
}