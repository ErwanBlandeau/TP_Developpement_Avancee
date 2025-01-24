export interface Player {
    name: string;
    score: number;
    rank: number;
}
export declare class RankingService {
    private players;
    addPlayer(player: Player): {
        message: string;
    };
    updatePlayer(player: Player): {
        message: string;
    } | undefined;
    deletePlayer(playerName: string): {
        message: string;
    };
    getPlayers(): Player[];
}
