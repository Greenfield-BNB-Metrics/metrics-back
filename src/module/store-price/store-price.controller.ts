import { Controller, Get, HttpCode, Param, Req } from '@nestjs/common';
import { StorePriceService } from './store-price.service';

@Controller('api/spprice')
export class StorePriceController {
  constructor(private readonly storePriceService: StorePriceService) {}

  @Get('get/:addr')
  @HttpCode(200)
  public async getSp(
    @Req() request: Request,
    @Param('addr') addr: string,
  ): Promise<any> {
    return await this.storePriceService.getSpPrices(addr);
  }
}
