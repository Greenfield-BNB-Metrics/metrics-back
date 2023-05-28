import { Module } from '@nestjs/common';
import { KpiModule } from '../kpi/kpi.module';
import { NotificationModule } from '../notification/notification.module';
import { StorePriceModule } from '../store-price/store-price.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [KpiModule, StorePriceModule, NotificationModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
