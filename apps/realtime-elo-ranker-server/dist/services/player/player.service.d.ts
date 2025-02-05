import { Repository } from 'typeorm';
import { Player } from '../../data/model/PlayerEntity';
import { CacheRankingService } from '../ranking-cache/ranking-cache.service';
export declare class PlayerService {
    private readonly playerRepository;
    private readonly CacheRankingService;
    constructor(playerRepository: Repository<Player>, CacheRankingService: CacheRankingService);
    addPlayer(id: string, rank: number): Promise<void>;
    getAllPlayers(): Promise<Player[]>;
    getPlayer(id: number): Promise<Player | undefined>;
    updatePlayer(id: number, rank: number): Promise<void>;
    deletePlayer(id: number): Promise<void>;
}
