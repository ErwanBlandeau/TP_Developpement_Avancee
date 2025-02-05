import { Response } from 'express';
import { AppService } from './app.service';
import { PlayerService } from './services/player/player.service';
import { MatchService } from './services/match/match.service';
import { CacheRankingService } from './services/ranking-cache/ranking-cache.service';
export declare class AppController {
    private readonly appService;
    private readonly playerService;
    private readonly matchService;
    private readonly CacheRankingService;
    constructor(appService: AppService, playerService: PlayerService, matchService: MatchService, CacheRankingService: CacheRankingService);
    getHello(): string;
    getRanking(): Promise<any>;
    rankingEvent(res: Response): Promise<void>;
    postPlayer(res: Response, body: {
        id: string;
    }): Promise<void>;
    postMatch(res: Response, body: {
        adversaire1: string;
        adversaire2: string;
        winner: string | null;
        draw: boolean;
    }): Promise<void>;
}
