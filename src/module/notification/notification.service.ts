import { Injectable, NotAcceptableException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NotificationService {
  public async discordNotification(notification: {
    webhook: string;
    price: number;
    spAddr: string;
  }): Promise<void> {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          username: 'Greenfild BNB Metrics',
          content: `Alert: Store price more then limit, store address is ${notification.spAddr}, store price is ${notification.price}`,
        }),
      };
      await axios.request(config);
    } catch (e) {
      throw new NotAcceptableException(`Notification failed, ${e}`);
    }
  }
}
