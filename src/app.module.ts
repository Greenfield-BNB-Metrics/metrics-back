import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { dataSourceOptions } from './config/db-source';
import { KpiModule } from './module/kpi/kpi.module';
import { NotificationModule } from './module/notification/notification.module';
import { StorePriceModule } from './module/store-price/store-price.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    KpiModule,
    NotificationModule,
    StorePriceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
