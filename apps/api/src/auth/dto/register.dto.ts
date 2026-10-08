import { UserRole } from "@daily-drop/types";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
export class RegisterDto {
    @IsString()
    firstName!: string

    @IsString()
    lastName!: string

    @IsEmail()
    email!: string

    @IsString()
    @IsNotEmpty()
    password!: string

    @IsString()
    phoneNumber!: string

    @IsEnum(UserRole)
    role!: UserRole
}