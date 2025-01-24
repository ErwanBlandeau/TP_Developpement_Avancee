// import { Injectable } from '@nestjs/common';
// import { EventEmitter2 } from '@nestjs/event-emitter';

// @Injectable()
// export class RankingService {
//   constructor(private readonly eventEmitter: EventEmitter2) {}

//   updateRanking(newData: any) {
//     // Logique métier pour mettre à jour le classement
//     console.log('Classement mis à jour avec :', newData);

//     // Émet un évènement pour notifier les changements
//     this.eventEmitter.emit('ranking.updated', newData);
//   }
// }

import { Injectable } from '@nestjs/common';

export interface Player {
  name: string;
  score: number;
  rank: number;
}

@Injectable()
export class RankingService {
  private players: Player[] = [];

  // Ajouter un nouveau joueur
  addPlayer(player: Player): { message: string } {
    const existingPlayer = this.players.find((p) => p.name === player.name);
    if (existingPlayer) {
      return { message: 'Player already exists' };
    }

    this.players.push(player);
    return { message: 'Player added successfully' };
  }
  updatePlayer(player: Player) {
    const existingPlayer = this.players.find((p) => p.name === player.name);
    if (existingPlayer) {
      existingPlayer.score = player.score;
      existingPlayer.rank = player.rank;
    } else {
      return { message: 'Player does not exist' };
    }
  }
  deletePlayer(playerName: string) {
    const playerIndex = this.players.findIndex((p) => p.name === playerName);
    if (playerIndex !== -1) {
      this.players.splice(playerIndex, 1);
      return { message: 'Player deleted successfully' };
    } else {
      return { message: 'Player does not exist' };
    }
  }

  getPlayers(): Player[] {
    return this.players;
  }
}
