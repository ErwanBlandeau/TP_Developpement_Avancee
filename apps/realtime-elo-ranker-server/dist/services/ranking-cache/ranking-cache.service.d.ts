import { Repository } from 'typeorm';
import { Player } from '../../data/model/PlayerEntity';
export declare class CacheRankingService {
    private readonly playerRepository;
    constructor(playerRepository: Repository<Player>);
    setRankingData(id: string, rank: number): Promise<void>;
    getRankingMoyen(): Promise<number>;
    getRankingData(): Promise<Player[]>;
    updateRank(id: string, newRank: number): Promise<void>;
}
