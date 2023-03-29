import { IsEmail, IsNotEmpty, IsStrongPassword, IsAlphanumeric, Min, Max, Length } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsAlphanumeric()
    @Length(6, 20)
    username: string;

    @IsNotEmpty()
    @IsStrongPassword()
    @Length(6, 20)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    role: string;
}