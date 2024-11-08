import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('user')
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  async loginUser(@Body('email') email: string, @Body('password') password: string, @Session() session: any) {
    const result = await this.userService.login(email, password);
    session.userId = result.userId; // Assuming result contains userId
    return result;
  }
  
  @Post('/logout')
  @ApiOperation({ summary: 'Logout user' })
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
  @ApiOperation({ summary: 'Register user' })
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }
}
