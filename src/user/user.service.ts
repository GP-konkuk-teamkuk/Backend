import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserRequest } from './dto/create-user.request';
import { LoginUserRequest } from './dto/login-user.request';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(loginUserDto: LoginUserRequest) {
    const { id: email, pw: password } = loginUserDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return { nickname: user.user, userId: user.id, id: user.email };
    } else {
      throw new NotFoundException('Invalid credentials');
    }
  }

  async logout(userId: number) {
    return { message: 'User logged out' };
  }

  async register(createUserDto: CreateUserRequest) {
    const { nickname, id: email, pw: password } = createUserDto;

    if (nickname.length < 2 || nickname.length > 15) {
      throw new BadRequestException('Nickname must be between 2 and 15 characters');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Invalid email format');
    }

    if (password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters long');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ user: nickname, email, password: hashedPassword });
    await this.userRepository.save(newUser);
    return { message: 'User registered' };
  }
}
