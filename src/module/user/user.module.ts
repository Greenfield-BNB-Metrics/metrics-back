import { Module } from '@nestjs/common';
import { UserService } from '../job/kpi.validate.job';
import { KpiModule } from '../kpi/kpi.module';
import { NotificationModule } from '../notification/notification.module';
import { StorePriceModule } from '../store-price/store-price.module';
import { UserController } from './user.controller';

@Module({
  imports: [KpiModule, StorePriceModule, NotificationModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
