import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public password: string;

    @IsString()
    public role: string;

    @IsNumber()
    public experience: number;

    @IsUUID()
    public departmentId: string;
}