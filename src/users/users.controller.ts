import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';



@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('createuser')
  @Roles(Role.Admin)
  create(@Body() createUserDto: CreateUserDto) {
  this.userService.create(createUserDto);
  return this.userService.findAll()
}
}
