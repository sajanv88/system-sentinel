import { Module } from '@nestjs/common';
import { CPUService } from './services/cpu.service';
import { DiskService } from './services/disk.service';
import { NetworkService } from './services/network.service';
import { Dockerervice } from './services/docker.service';
import { SystemController } from './controllers/system.controller';
import { DockerController } from './controllers/docker.controller';

@Module({
  imports: [],
  controllers: [SystemController, DockerController],
  providers: [CPUService, DiskService, NetworkService, Dockerervice],
})
export class SystemModule {}
