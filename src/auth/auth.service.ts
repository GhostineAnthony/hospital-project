import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
// private prisma = new PrismaClient();
// private jwtservice = new JwtService();
// constructor(private userService: UserService){}

// async signIn(createUserDto:CreateUserDto):Promise<any>{
// // Fetch a user with the given email
//     const email = createUserDto.email;
//     const password = createUserDto.password;
//     const user = await this.prisma.user.findUnique({ where:{email}});
//      if (!user) {
//         throw new NotFoundException(`No user found for email: ${email}`);
      
//     }

//     // Check if the password is correct
//     const isPasswordValid =  await bcrypt.compare( password,user.password);

//     // If password does not match, throw an error
//     if (!isPasswordValid) {
//       throw new UnauthorizedException('Invalid password');
//     }
//     const payload = {sub:user.id,username: user.name};
//     return {
//       accessToken: await this.jwtservice.signAsync({ payload }),
//     };

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
