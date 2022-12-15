import { Controller, Get, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get('all')
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }
  
  @Post('create')
  async create(@Body() user: User) {
    return await this.usersService.create(user);
  }
  
  
}
