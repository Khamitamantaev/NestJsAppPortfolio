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
      roles: ['admin']
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      roles: ['moderator']
    },
  ];

  create(user: User) {
    this.users.push(user);
  }

  findAll(){
    return this.users
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}