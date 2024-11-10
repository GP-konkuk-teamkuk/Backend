import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { ServerDescription } from 'typeorm';

@ApiTags('user')
@Controller('/api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
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
  async loginUser(@Body() loginUserDto: LoginUserDto, @Session() session: any) {
    const result = await this.userService.login(loginUserDto);
    session.userId = result.userId;
    return result;
  }

  @Post('/logout')
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
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: 200,
    description: 'Login',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'User registered' },
      },
    },
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }
}
