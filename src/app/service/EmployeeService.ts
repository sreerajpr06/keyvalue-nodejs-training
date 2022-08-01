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

    async getEmployeeById(employeeIdDetails: any) {
        const employeeId = employeeIdDetails.id;
        const data = await this.employeeRepository.getEmployeeById(employeeId);
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

    public async deleteEmployee(employeeDetails: any) {
        try {
            const data = await this.employeeRepository.softDeleteEmployee(employeeDetails.id);
            return data;
        } catch (err) {
            throw new HttpException(400, "Failed to delete employee");
        }
    }

    public async updateEmployee(employeeDetails: any, employeeIdDetails: any) {
        try {
            const employeeId = employeeIdDetails.id;
            const updatedEmployee = plainToClass(Employee, {
                id: employeeId,
                name: employeeDetails.name,
                departmentId: employeeDetails.departmentId
            })
            const save = await this.employeeRepository.updateEmployee(updatedEmployee);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to update employee");
        }
    }
}