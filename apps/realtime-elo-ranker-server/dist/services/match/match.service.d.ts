import { Repository } from 'typeorm';
import { Player } from '../../data/model/PlayerEntity';
import { CacheRankingService } from '../ranking-cache/ranking-cache.service';
export declare class MatchService {
    private readonly playerRepository;
    private readonly CacheRankingService;
    constructor(playerRepository: Repository<Player>, CacheRankingService: CacheRankingService);
    processMatch(body: {
        adversaire1: string;
        adversaire2: string;
        winner: string | null;
        draw: boolean;
    }): Promise<string>;
}
