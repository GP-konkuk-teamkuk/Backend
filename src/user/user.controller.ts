import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('user')
@Controller('/api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  async loginUser(@Body() loginUserDto: LoginUserDto, @Session() session: any) {
    const result = await this.userService.login(loginUserDto);
    session.userId = result.userId;
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
