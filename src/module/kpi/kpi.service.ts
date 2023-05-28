import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KpiModel } from 'src/model/kpi.model';
import { Repository } from 'typeorm';

@Injectable()
export class KpiService {
  constructor(
    @InjectRepository(KpiModel)
    private kpiModel: Repository<KpiModel>,
  ) {}

  public async getAbleKpi(): Promise<KpiModel[] | undefined> {
    const queryBuilder = await this.kpiModel.createQueryBuilder('km');
    const res = await queryBuilder
      .leftJoinAndSelect('km.user', 'user')
      .andWhere('km.isActive = :isActive', { isActive: true })
      .getMany();
    return res;
  }

  public async setKpi(kpi: {
    spAddress: string;
    storePriceLimit: number;
    webHook: string;
    userId: number;
  }): Promise<KpiModel> {
    const expiresAt = Date.now();
    return await this.kpiModel.save({ ...kpi, expiresAt });
  }
}
