import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async loginUser(@Body('email') email: string, @Body('password') password: string, @Session() session: any) {
    const result = await this.userService.login(email, password);
    session.userId = result.userId; // Assuming result contains userId
    return result;
  }
  
  @Post('/logout')
  async logoutUser(@Session() session: any) {
    if (session.userId) {
      const result = await this.userService.logout(session.userId);
      session.destroy();
      return result;
    } else {
      return { message: 'No user logged in' };
    }
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }
}
