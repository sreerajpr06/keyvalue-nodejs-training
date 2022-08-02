import { IsNumber, IsString, IsUUID } from "class-validator";

export class UpdateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public role: string;

    @IsString()
    public password: string;

    @IsNumber()
    public experience: number;

    @IsUUID()
    public departmentId: string;
}