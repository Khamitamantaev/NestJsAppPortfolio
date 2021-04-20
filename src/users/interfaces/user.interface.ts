import { Role } from "src/enums/role.enum";

export interface User {
  readonly userId: number;
  readonly username: string;
  readonly password: string;
  readonly roles: Role[];
}