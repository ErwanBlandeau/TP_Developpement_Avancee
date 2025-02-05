"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const PlayerEntity_1 = require("../../data/model/PlayerEntity");
const ranking_cache_service_1 = require("../ranking-cache/ranking-cache.service");
let MatchService = class MatchService {
    constructor(playerRepository, CacheRankingService) {
        this.playerRepository = playerRepository;
        this.CacheRankingService = CacheRankingService;
    }
    async processMatch(body) {
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
            }
            else if (winner === adversaire2) {
                scoreA = 0;
                scoreB = 1;
                result = `${adversaire2} a battu ${adversaire1}`;
            }
            else {
                throw new Error('le résultat du match est invalide');
            }
        }
        const scoreFinaladv1 = Math.round(adversaire1RankJoueur + K * (scoreA - WeA));
        const scoreFinaladv2 = Math.round(adversaire2RankJoueur + K * (scoreB - WeB));
        await this.CacheRankingService.updateRank(adversaire1, scoreFinaladv1);
        await this.CacheRankingService.updateRank(adversaire2, scoreFinaladv2);
        return result;
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(PlayerEntity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ranking_cache_service_1.CacheRankingService])
], MatchService);
//# sourceMappingURL=match.service.js.map