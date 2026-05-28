import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      service: 'Karya Kreatif Andalan API',
      timestamp: new Date().toISOString(),
    };
  }
}
