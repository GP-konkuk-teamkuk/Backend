import { Controller, Post, Body, Session } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserRequest } from './dto/create-user.request';
import { LoginUserRequest } from './dto/login-user.request';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'Login',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
      },
    },
  })
  async loginUser(@Body() loginUserDto: LoginUserRequest, @Session() session) {
    const result = await this.userService.login(loginUserDto);
    session.userId = result.userId;
    return result;
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({
    status: 200,
    description: 'Login',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'User logged out' },
      },
    },
  })
  async logoutUser(@Session() session) {
    if (session.userId) {
      const result = await this.userService.logout(session.userId);
      session.destroy();
      return result;
    } else {
      return { message: 'No user logged in' };
    }
  }

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: 201,
    description: 'Login',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'User registered' },
      },
    },
  })
  async register(@Body() createUserDto: CreateUserRequest) {
    return await this.userService.register(createUserDto);
  }
}
