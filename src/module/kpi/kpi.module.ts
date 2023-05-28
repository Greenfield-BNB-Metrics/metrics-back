import { Module } from '@nestjs/common';
import { KpiService } from './kpi.service';
import { KpiController } from './kpi.controller';
import { KpiModel } from 'src/model/kpi.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([KpiModel])],
  providers: [KpiService],
  controllers: [KpiController],
  exports: [KpiService],
})
export class KpiModule {}
