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
    
    public employeeLogin = async (
            name: string,
            password: string
        ) => {
            const employeeDetails = await this.employeeRepository.getEmployeeByName(name);
            if (!employeeDetails) {
                throw new UserNotAuthorizedException();
            }
            const validPassword = await bcrypt.compare(password, employeeDetails.password);
            if (validPassword) {
                let payload = {
                    "id": employeeDetails.id,
                    "name": employeeDetails.name,
                    "role": employeeDetails.role
                };
                const token = this.generateAuthTokens(payload);

                return {
                    idToken: token,
                    employeeDetails,
                };
            } else {
                throw new IncorrectUsernameOrPasswordException();
            }
        };

    private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
    };  


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