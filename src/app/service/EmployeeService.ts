import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from "bcrypt";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import jsonwebtoken from "jsonwebtoken";

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
        if(!data) {
            throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_NOT_FOUND)
        }
        return data;
    }
    
    public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                // username: employeeDetails.username,
                // age: employeeDetails.age,
                role: employeeDetails.role,
                password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10) : '',
                departmentId: employeeDetails.departmentId,
                experience: employeeDetails.experience,
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

    public async updateEmployee(employeeDetails: any, employeeId: any) {
        try {
            const updatedEmployee = plainToClass(Employee, {
                id: employeeId,
                name: employeeDetails.name,
                experience: employeeDetails.experience,
                departmentId: employeeDetails.departmentId
            })
            const save = await this.employeeRepository.updateEmployee(updatedEmployee);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to update employee");
        }
    }
} 