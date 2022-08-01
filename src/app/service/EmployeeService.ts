import { EmployeeRepository } from "../repository/EmployeeRepository";

export class EmployeeService{
    constructor(private employeeRepo: EmployeeRepository) {

    }

    async getAllEmployees(){
        const data = await this.employeeRepo.getAllEmployees();
        return data;
    }
}