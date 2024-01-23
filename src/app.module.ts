import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { DepartmentModule } from './department/department.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [AuthModule, UserModule, DoctorModule, PatientModule, DepartmentModule, CaslModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
