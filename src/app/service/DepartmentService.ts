import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DepartmentRepository } from "../repository/DepartmentRepository";

export class DepartmentService{
    constructor(private departmentRepository: DepartmentRepository) {

    }

    async getAllDepartments(){
        const data = await this.departmentRepository.getAllDepartments();
        return data;
    }
    
    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
            });
            const save = await this.departmentRepository.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create department");
        }
    }
}