import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { StorePriceModel } from 'src/model/store-price.model';
import { Repository } from 'typeorm';
import { CONST_SP_ADDRESSES } from './storage-address.const';

@Injectable()
export class StorePriceService {
  constructor(
    @InjectRepository(StorePriceModel)
    private storePriceModel: Repository<StorePriceModel>,
  ) {}
  public api = 'https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org/';

  public async getAllStorages(): Promise<Array<string>> {
    return CONST_SP_ADDRESSES;
  }

  public async getStoreagePriceByLimit(
    timeStamp: number,
    spAddr: string,
    priceLimit: number,
  ): Promise<StorePriceModel | undefined> {
    const queryBuilder = this.storePriceModel.createQueryBuilder('spm');
    const res = await queryBuilder
      .where('spm.isActive = :isActive', { isActive: true })
      .andWhere('spm.spAddress =:spAddr', { spAddr })
      .andWhere('spm.timeStamp >:timeStamp', { timeStamp })
      .andWhere('spm.storePrice >:priceLimit', { priceLimit })
      .getOne();
    return res;
  }

  public async getSpPrices(
    spAddr: string,
  ): Promise<StorePriceModel[] | undefined> {
    const queryBuilder = await this.storePriceModel.createQueryBuilder('spm');
    const res = await queryBuilder
      .where('spm.isActive = :isActive', { isActive: true })
      .andWhere('spm.spAddress = :spAddr', { spAddr })
      .getMany();
    return res;
  }

  public async setStoragePrice(storage: {
    spAddress: string;
    storePrice: number;
    timeStamp: number;
  }): Promise<StorePriceModel> {
    return await this.storePriceModel.save(storage);
  }

  public async requestToGetPriceForSps(): Promise<any> {
    const storages = await this.getAllStorages();
    try {
      storages.forEach(async (storage) => {
        const price = await this.greenfieldLastPriceByAddrApi(storage);
        await this.setStoragePrice({
          spAddress: price.sp_storage_price.sp_address,
          storePrice: Number(price.sp_storage_price.store_price),
          timeStamp: Number(price.sp_storage_price.update_time_sec),
        });
      });
    } catch (e) {
      throw new NotAcceptableException(`Store failed, ${e}`);
    }
  }

  private async greenfieldLastPriceByAddrApi(spAddr: string) {
    const config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: `${
        this.api
      }/greenfield/sp/get_sp_storage_price_by_time/${spAddr}/${0}`,
      headers: {},
    };
    try {
      const req = await axios.request(config);
      const data = JSON.parse(req.data);
      console.log(data);
      return data;
    } catch (e) {
      throw new NotAcceptableException('Request faied');
    }
  }
}
