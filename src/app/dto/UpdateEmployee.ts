import { Type } from "class-transformer";
import { IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";
import { Address } from "../entities/Address";
import { UpdateAddressDto } from "./UpdateAddress";

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

    @IsUUID()
    public addressId: string;

    @ValidateNested({ each: true })
        @Type(() => UpdateAddressDto)
        public address: Address   
}