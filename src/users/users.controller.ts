import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get('all')
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }
  
  @Get(':id')
  async findOne(@Param() params): Promise<User> {
    return await this.usersService.findOne(params.id);
  }
  
  @Post('create')
  async create(@Body() user: User) {
    return await this.usersService.create(user);
  }
  
  // 根据条件进行查询
  @Post('find')
  async find(@Body() user: Partial<User>) {
    console.log(user)
    return await this.usersService.find(user);
  }
}
