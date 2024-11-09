import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { id: email, pw: password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      return { userId: user.id };
    }
    throw new Error('Invalid credentials');
  }

  async logout(userId: number) {
    return 'User logged out';
  }

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.pw, 10);
    const newUser = this.userRepository.create({ user: createUserDto.nickname, email: createUserDto.id, password: hashedPassword });
    await this.userRepository.save(newUser);
    return {message: 'User registered'};
  }
}
