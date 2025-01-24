import { Controller, Post, Body, Sse } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, Subject } from 'rxjs';

@Controller('ranking')
export class RankingController {
  private rankingUpdates = new Subject<any>();

  constructor(
    private readonly rankingService: RankingService,

    private readonly eventEmitter: EventEmitter2,
  ) {
    this.eventEmitter.on('ranking.updated', (data) => {
      this.rankingUpdates.next(data);
    });
  }
  @Post('update')
  updateRanking(@Body() rankingData: any) {
    this.rankingService.updateRanking(rankingData);
    this.eventEmitter.emit('ranking.updated', rankingData);
  }
  @Sse('stream')
  streamRankingUpdates(): Observable<any> {
    return this.rankingUpdates.asObservable();
  }
}
