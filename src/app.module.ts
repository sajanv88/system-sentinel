import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SystemModule } from './system/system.module';

@Module({
  imports: [SystemModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
