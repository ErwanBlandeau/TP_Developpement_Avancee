import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../../data/model/PlayerEntity';

@Injectable()
export class CacheRankingService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  /**
   *  Adds a new player to the repository with the given ID and rank.
   * @param id  The unique identifier for the player.
   * @param rank  The rank of the player.
   */
  public async setRankingData(id: string, rank: number): Promise<void> {
    const player = new Player();
    player.name = id;
    player.rank = rank;
    await this.playerRepository.save(player);
  }

  
  /**
   *  Gets the rank of the player with the given ID.
   * @returns The average ranking of all players.
   */
  public async getRankingMoyen(): Promise<number> {
    const players = await this.playerRepository.find();
    if (players.length === 0) {
      return 0;
    }
    const total = players.reduce((acc, player) => acc + player.rank, 0);
    return total / players.length;
  }

  /**
   *  Gets the rank of the player with the given ID.
   * @returns The sorted array of players
   */
  public async getRankingData(): Promise<Player[]> {
    return await this.playerRepository.find({ order: { rank: 'DESC' } });
  }

  /**
   *  Updates the rank of the player with the given ID.
   * @param id  The unique identifier for the player.
   * @param newRank  The rank of the player.
   */
  public async updateRank(id: string, newRank: number): Promise<void> {
    const player = await this.playerRepository.findOne({ where: { name: id } });
    if (player) {
      player.rank = newRank;
      await this.playerRepository.save(player);
    }
  }
}