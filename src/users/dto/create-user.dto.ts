import { Role } from "src/enums/role.enum";

export class CreateUserDto {
  readonly userId: number;
  readonly username: string;
  readonly password: string;
  readonly roles: string[]

}