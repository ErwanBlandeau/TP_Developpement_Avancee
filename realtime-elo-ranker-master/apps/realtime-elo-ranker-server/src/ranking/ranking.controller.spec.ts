import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { of } from 'rxjs';

describe('RankingController', () => {
  let rankingController: RankingController;
  let rankingService: RankingService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingController],
      providers: [
        {
          provide: RankingService,
          useValue: { updateRanking: jest.fn() },
        },
        {
          provide: EventEmitter2,
          useValue: { emit: jest.fn(), on: jest.fn() },
        },
      ],
    }).compile();

    rankingController = module.get<RankingController>(RankingController);
    rankingService = module.get<RankingService>(RankingService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  describe('updateRanking', () => {
    it('should call updateRanking method of RankingService and emit event', () => {
      const rankingData = { rank: 1, player: 'Player1' };
      const emitSpy = jest.spyOn(eventEmitter, 'emit');

      rankingController.updateRanking(rankingData);

      expect(rankingService.updateRanking).toHaveBeenCalledWith(rankingData);
      expect(emitSpy).toHaveBeenCalledWith('ranking.updated', rankingData);
    });
  });

  describe('streamRankingUpdates', () => {
    it('should return an observable with ranking updates', () => {
      const rankingUpdates = rankingController.streamRankingUpdates();
      expect(rankingUpdates).toBeInstanceOf(of);
    });
  });
});
