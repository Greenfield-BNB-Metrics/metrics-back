import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { dataSourceOptions } from './config/db-source';
import { KpiModule } from './module/kpi/kpi.module';
import { NotificationModule } from './module/notification/notification.module';
import { StorePriceModule } from './module/store-price/store-price.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    KpiModule,
    NotificationModule,
    StorePriceModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
