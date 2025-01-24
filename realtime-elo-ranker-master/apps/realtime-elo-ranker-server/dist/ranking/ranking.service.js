"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingService = void 0;
const common_1 = require("@nestjs/common");
let RankingService = class RankingService {
    constructor() {
        this.players = [];
    }
    addPlayer(player) {
        const existingPlayer = this.players.find((p) => p.name === player.name);
        if (existingPlayer) {
            return { message: 'Player already exists' };
        }
        this.players.push(player);
        return { message: 'Player added successfully' };
    }
    updatePlayer(player) {
        const existingPlayer = this.players.find((p) => p.name === player.name);
        if (existingPlayer) {
            existingPlayer.score = player.score;
            existingPlayer.rank = player.rank;
        }
        else {
            return { message: 'Player does not exist' };
        }
    }
    deletePlayer(playerName) {
        const playerIndex = this.players.findIndex((p) => p.name === playerName);
        if (playerIndex !== -1) {
            this.players.splice(playerIndex, 1);
            return { message: 'Player deleted successfully' };
        }
        else {
            return { message: 'Player does not exist' };
        }
    }
    getPlayers() {
        return this.players;
    }
};
exports.RankingService = RankingService;
exports.RankingService = RankingService = __decorate([
    (0, common_1.Injectable)()
], RankingService);
//# sourceMappingURL=ranking.service.js.map