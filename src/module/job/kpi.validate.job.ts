import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { KpiService } from '../kpi/kpi.service';
import { NotificationService } from '../notification/notification.service';
import { StorePriceService } from '../store-price/store-price.service';

@Injectable()
export class StorePriceCron {
  constructor(
    private readonly kpiService: KpiService,
    private readonly storePriceService: StorePriceService,
    private readonly notificationService: NotificationService,
  ) {}
  private readonly logger = new Logger('LogKpi');

  @Cron('/2 * * * * *') // 2 sec
  public async setPrice() {
    await this.storePriceService.requestToGetPriceForSps();
  }

  @Cron('/2 * * * * *') // 2 sec
  public async validatePrice() {
    const kpis = await this.kpiService.getAbleKpi();
    kpis.forEach(async (kpi) => {
      const limit = await this.storePriceService.getStoreagePriceByLimit(
        kpi.expiresAt,
        kpi.spAddress,
        kpi.storePriceLimit,
      );
      if (!limit) {
        this.logger.log(`Notification webhook: ${kpi.webHook}`);
        await this.notificationService.discordNotification({
          webhook: kpi.webHook,
          price: limit.storePrice,
          spAddr: limit.spAddress,
        });
      }
    });
  }
}
