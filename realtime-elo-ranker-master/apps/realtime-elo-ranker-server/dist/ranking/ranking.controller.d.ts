import { RankingService } from './ranking.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
export declare class RankingController {
    private readonly rankingService;
    private readonly eventEmitter;
    private rankingUpdates;
    constructor(rankingService: RankingService, eventEmitter: EventEmitter2);
    updateRanking(rankingData: any): void;
    streamRankingUpdates(): Observable<any>;
}
