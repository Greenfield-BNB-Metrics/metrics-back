import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { KpiService } from './kpi.service';

@Controller('api/kpi')
export class KpiController {
  constructor(private readonly kpiService: KpiService) {}

  @Post('set')
  @HttpCode(201)
  public async setKpi(
    @Req() request: Request,
    @Body() body: any,
  ): Promise<any> {
    return await this.kpiService.setKpi(body);
  }
}
