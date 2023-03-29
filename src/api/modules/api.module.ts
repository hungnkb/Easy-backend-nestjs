import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/modules/auth.module";
import { UserModule } from "../users/modules/user.module";

@Module({
    imports: [UserModule, AuthModule],
})

export class ApiModule { }