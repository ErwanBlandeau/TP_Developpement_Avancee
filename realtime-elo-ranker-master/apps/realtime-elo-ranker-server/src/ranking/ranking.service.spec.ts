import { Test, TestingModule } from '@nestjs/testing';
import { RankingService } from './ranking.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('RankingService', () => {
  let rankingService: RankingService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingService,
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(), // Mock de la méthode emit
          },
        },
      ],
    }).compile();

    rankingService = module.get<RankingService>(RankingService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should emit an event when updateRanking is called', () => {
    const newData = { position: 1, name: 'Player1', score: 100 };

    // Mock de la méthode emit
    const emitSpy = jest.spyOn(eventEmitter, 'emit');

    // Appelle la méthode updateRanking
    rankingService.updateRanking(newData);

    // Vérifie que la méthode emit a été appelée avec les bons arguments
    expect(emitSpy).toHaveBeenCalledWith('ranking.updated', newData);
  });
});
