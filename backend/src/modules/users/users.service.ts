import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
// import { CreateUserDto } from './dto/create-user.dto'; // To be created

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string, universityId: string): Promise<User | undefined> {
    // In a real multi-tenant app, universityId MUST be used in the query
    return this.usersRepository.findOne({ where: { email, university_id: universityId } });
  }

  async findById(id: string, universityId: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id, university_id: universityId } });
  }

  // async create(createUserDto: CreateUserDto, universityId: string): Promise<User> {
  //   const newUser = this.usersRepository.create({ ...createUserDto, university_id: universityId });
  //   return this.usersRepository.save(newUser);
  // }
}
