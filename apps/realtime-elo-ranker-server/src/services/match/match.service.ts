import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../../data/model/PlayerEntity';
import { CacheRankingService } from '../ranking-cache/ranking-cache.service';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly CacheRankingService: CacheRankingService,
  ) {}

  /**
   *  Processes a match between two players and updates their ranks accordingly.
   * @param body  The body of the request containing the match data. 
   * @returns  A message indicating the result of the match.
   */
  async processMatch(body: { adversaire1: string, adversaire2: string, winner: string | null, draw: boolean }): Promise<string> {
    const { adversaire1, adversaire2, winner, draw } = body;

    const adversaire1Player = await this.playerRepository.findOne({ where: { name: adversaire1 } });
    const adversaire2Player = await this.playerRepository.findOne({ where: { name: adversaire2 } });
    console.log(adversaire1Player, adversaire2Player);

    if (!adversaire1Player || !adversaire2Player) {
      throw new Error('Les deux joueurs ne sont pas enregistrés');
    }

    const adversaire1RankJoueur = adversaire1Player.rank;
    const adversaire2RankJoueur = adversaire2Player.rank;

    const K = 32;
    const WeA = 1 / (1 + Math.pow(10, (adversaire2RankJoueur - adversaire1RankJoueur) / 400));
    const WeB = 1 / (1 + Math.pow(10, (adversaire1RankJoueur - adversaire2RankJoueur) / 400));

    let scoreA = 0.5;
    let scoreB = 0.5;
    let result = 'Match nul';

    if (!draw) {
      if (winner === adversaire1) {
        scoreA = 1;
        scoreB = 0;
        result = `${adversaire1} a battu ${adversaire2}`;
      } else if (winner === adversaire2) {
        scoreA = 0;
        scoreB = 1;
        result = `${adversaire2} a battu ${adversaire1}`;
      } else {
        throw new Error('le résultat du match est invalide');
      }
    }

    const scoreFinaladv1 = Math.round(adversaire1RankJoueur + K * (scoreA - WeA));
    const scoreFinaladv2 = Math.round(adversaire2RankJoueur + K * (scoreB - WeB));

    await this.CacheRankingService.updateRank(adversaire1, scoreFinaladv1);
    await this.CacheRankingService.updateRank(adversaire2, scoreFinaladv2);

    return result;
  }
}