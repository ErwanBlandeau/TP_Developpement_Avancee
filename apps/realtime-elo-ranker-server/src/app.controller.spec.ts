import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerService } from './services/player/player.service';
import { MatchService } from './services/match/match.service';
import { CacheRankingService } from './services/ranking-cache/ranking-cache.service';
import { Response } from 'express';

describe('AppController', () => {
  let appController: AppController;
  let CacheRankingService: CacheRankingService;
  let playerService: PlayerService;
  let matchService: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn().mockReturnValue('Hello World!'),
          },
        },
        {
          provide: CacheRankingService,
          useValue: {
            getRankingData: jest.fn(),
            updateRank: jest.fn(),
            getRankingMoyen: jest.fn(),
          },
        },
        {
          provide: PlayerService,
          useValue: {
            addPlayer: jest.fn(),
          },
        },
        {
          provide: MatchService,
          useValue: {
            processMatch: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    CacheRankingService = module.get<CacheRankingService>(CacheRankingService);
    playerService = module.get<PlayerService>(PlayerService);
    matchService = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('postPlayer', () => {
    it('should add a player and return the id', async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const averageRank = 1500;
      jest.spyOn(CacheRankingService, 'getRankingMoyen').mockResolvedValue(averageRank);
      const addPlayerSpy = jest.spyOn(playerService, 'addPlayer').mockResolvedValue();

      await appController.postPlayer(res, { id: 'player1' });

      expect(CacheRankingService.getRankingMoyen).toHaveBeenCalled();
      expect(addPlayerSpy).toHaveBeenCalledWith('player1', averageRank);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('player1');
    });
  });

  describe('postMatch', () => {
    it('should process a match and return the result', async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const result = 'playerA a battu playerB';
      jest.spyOn(matchService, 'processMatch').mockResolvedValue(result);

      await appController.postMatch(res, { adversaire1: 'playerA', adversaire2: 'playerB', winner: 'playerA', draw: false });

      expect(matchService.processMatch).toHaveBeenCalledWith({ adversaire1: 'playerA', adversaire2: 'playerB', winner: 'playerA', draw: false });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(result);
    });
  });
});