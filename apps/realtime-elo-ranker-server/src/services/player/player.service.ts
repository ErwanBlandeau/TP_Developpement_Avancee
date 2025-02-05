import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../../data/model/PlayerEntity';
import { CacheRankingService } from '../ranking-cache/ranking-cache.service';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly CacheRankingService: CacheRankingService,
  ) {}

  /**
   * Adds a new player to the repository with the given ID and rank.
   *
   * @param id - The unique identifier for the player.
   * @param rank - The rank of the player.
   * @returns A promise that resolves when the player has been successfully added.
   */
  async addPlayer(id: string, rank: number): Promise<void> {
    const player = new Player();
    player.name = id;
    player.rank = rank;
    await this.playerRepository.save(player);
  }

  
  /**
   * Gets all players from the repository.
   * @returns A promise that resolves with an array of all players.
 */
  async getAllPlayers(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

  /**
   *  Gets the player with the given ID.
   * @param id  The unique identifier for the player.
   * @returns The player with the given ID, or undefined if no player exists with that ID.
   */
  async getPlayer(id: number): Promise<Player | undefined> {
    const player = await this.playerRepository.findOne({ where: { id } });
    return player ?? undefined;
  }
  
  /** 
   *  Updates the rank of the player with the given ID.
   * @param id  The unique identifier for the player.
   * @param rank  The rank of the player.
   * @returns A promise that resolves when the player has been successfully updated.
   */
  async updatePlayer(id: number, rank: number): Promise<void> {
    const player = await this.playerRepository.findOne({ where: { id } });
    if (player) {
      player.rank = rank;
      await this.playerRepository.save(player);
    }
  }

  /**
   *  Deletes the player with the given ID.
   * @param id The unique identifier for the player.
   * @returns A promise that resolves when the player has been successfully deleted.
   */
  async deletePlayer(id: number): Promise<void> {
    await this.playerRepository.delete({ id });
  }
}