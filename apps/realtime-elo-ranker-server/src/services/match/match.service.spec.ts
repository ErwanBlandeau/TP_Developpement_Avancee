import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchService } from './match.service';
import { Player } from '../../data/model/PlayerEntity';
import { CacheRankingService } from '../ranking-cache/ranking-cache.service';

describe('MatchService', () => {
  let service: MatchService;
  let repository: Repository<Player>;
  let CacheRankingService: CacheRankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
        {
          provide: CacheRankingService,
          useValue: {
            updateRank: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MatchService>(MatchService);
    repository = module.get<Repository<Player>>(getRepositoryToken(Player));
    CacheRankingService = module.get<CacheRankingService>(CacheRankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processMatch', () => {
    it('should process a match and update player ranks', async () => {
      const adversaire1 = { name: 'playerA', rank: 1000 } as Player;
      const adversaire2 = { name: 'playerB', rank: 1000 } as Player;

      jest.spyOn(repository, 'findOne').mockImplementation(async (options) => {
        const { name } = options.where as { name: string };
        if (name === 'playerA') return adversaire1;
        if (name === 'playerB') return adversaire2;
        return null;
      });

      const updateRankSpy = jest.spyOn(CacheRankingService, 'updateRank').mockResolvedValue();

      const result = await service.processMatch({ adversaire1: 'playerA', adversaire2: 'playerB', winner: 'playerA', draw: false });

      expect(updateRankSpy).toHaveBeenCalledTimes(2);
      expect(result).toBe('playerA a batu playerB');
    });

    it('should throw an error if players are not registered', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.processMatch({ adversaire1: 'playerA', adversaire2: 'playerB', winner: 'playerA', draw: false }))
        .rejects
        .toThrow('Les deux joueurs ne sont pas enregistrés');
    });

    it('should process a draw match and update player ranks', async () => {
      const adversaire1 = { name: 'playerA', rank: 1000 } as Player;
      const adversaire2 = { name: 'playerB', rank: 1000 } as Player;

      jest.spyOn(repository, 'findOne').mockImplementation(async (options: { where: { name: string } }) => {
              const { name } = options.where;
              if (name === 'playerA') return adversaire1;
              if (name === 'playerB') return adversaire2;
              return null;
            });

      const updateRankSpy = jest.spyOn(CacheRankingService, 'updateRank').mockResolvedValue();

      const result = await service.processMatch({ adversaire1: 'playerA', adversaire2: 'playerB', winner: null, draw: true });

      expect(updateRankSpy).toHaveBeenCalledTimes(2);
      expect(result).toBe('Match nul');
    });

    it('should throw an error if match result is invalid', async () => {
      const adversaire1 = { name: 'playerA', rank: 1000 } as Player;
      const adversaire2 = { name: 'playerB', rank: 1000 } as Player;

      jest.spyOn(repository, 'findOne').mockImplementation(async (options: { where: { name: string } }) => {
        const { name } = options.where;
        if (name === 'playerA') return adversaire1;
        if (name === 'playerB') return adversaire2;
        return null;
      });

      await expect(service.processMatch({ adversaire1: 'playerA', adversaire2: 'playerB', winner: 'playerC', draw: false }))
        .rejects
        .toThrow('le résultat du match est invalide');
    });
  });
});