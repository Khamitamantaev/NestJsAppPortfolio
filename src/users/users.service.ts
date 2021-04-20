import { Injectable } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';
import { User } from './interfaces/user.interface';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      roles: [Role.Admin],
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      roles: [Role.Moderator],
    },
    {
      userId: 3,
      username: 'Khamit',
      password: '1234',
      roles: [Role.Regular, Role.Admin],
    },
  ];

  create(user: User) {
    this.users.push(user);
  }

  findAll() {
    return this.users;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
