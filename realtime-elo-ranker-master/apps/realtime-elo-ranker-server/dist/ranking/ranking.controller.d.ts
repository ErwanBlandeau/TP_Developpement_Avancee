import { RankingService, Player } from './ranking.service';
export declare class RankingController {
    private readonly rankingService;
    constructor(rankingService: RankingService);
    addPlayer(playerData: {
        name: string;
        score: number;
        rank: number;
    }): {
        message: string;
    };
    updatePlayer(playerData: {
        name: string;
        score: number;
        rank: number;
    }): {
        message: string;
    };
    getRanking(): Player[];
    deletePlayer(playerName: string): {
        message: string;
    };
}
