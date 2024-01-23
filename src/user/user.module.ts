import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

export const jwtSecret = "@nth0ny";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      // secret: jwtConstants.secret,
      //  secret: process.env.JWT_SECRET,
       secret: jwtSecret,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService,JwtStrategy,],
  // exports:[UserService]
})
export class UserModule {}
