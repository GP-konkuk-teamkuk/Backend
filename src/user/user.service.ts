import { Injectable, BadRequestException } from '@nestjs/common';
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

    console.log(email, password);
    const user = await this.userRepository.findOne({ where: { email } });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      console.error('login');
      console.log(user);
      return { nickname: user.user, userId: user.id, id: user.email };
    }
    throw new Error('Invalid credentials');
  }

  async logout(userId: number) {
    return { message: 'User logged out' };
  }

  async register(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const { nickname, id: email, pw: password } = createUserDto;

    // authentication logic
    //if (nickname.length < 2 || nickname.length > 15) {
    //  throw new BadRequestException('Nickname must be between 2 and 15 characters');
    //}

    //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //if (!emailRegex.test(email)) {
    //  throw new BadRequestException('Invalid email format');
    //}

    //if (password.length < 8) {
    //  throw new BadRequestException('Password must be at least 8 characters long');
    //}

    console.error('register');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ user: nickname, email, password: hashedPassword });
    await this.userRepository.save(newUser);
    return { message: 'User registered' };
  }
}
