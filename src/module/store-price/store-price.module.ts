import { Module } from '@nestjs/common';
import { StorePriceService } from './store-price.service';
import { StorePriceController } from './store-price.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorePriceModel } from 'src/model/store-price.model';

@Module({
  imports: [TypeOrmModule.forFeature([StorePriceModel])],
  providers: [StorePriceService],
  controllers: [StorePriceController],
  exports: [StorePriceService],
})
export class StorePriceModule {}
