import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RankingController } from './ranking/ranking.controller';
import { RankingService } from './ranking/ranking.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [RankingController],
  providers: [RankingService],
})
export class AppModule {}
