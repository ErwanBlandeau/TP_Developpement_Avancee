import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class RankingService {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    updateRanking(newData: any): void;
}
