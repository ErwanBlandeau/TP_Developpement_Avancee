import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class RankingService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  updateRanking(newData: any) {
    // Logique métier pour mettre à jour le classement
    console.log('Classement mis à jour avec :', newData);

    // Émet un évènement pour notifier les changements
    this.eventEmitter.emit('ranking.updated', newData);
  }
}
