import {Body, Controller, Get, NotImplementedException, Post} from "@nestjs/common";
import { CPUService } from "../services/cpu.service";
import { NetworkService } from "../services/network.service";
import { DiskService } from "../services/disk.service";

@Controller("sys")
export class SystemController {
    constructor(
        private readonly cpu: CPUService,
        private readonly net: NetworkService,
        private readonly disk: DiskService) {}
    
    @Get("/cpu")
    async getCpuUsage() {
        return this.cpu.getUsage();
    }

    @Get("/net")
    async getNetworkUsage() {
        // Todo: Implement net stats
        return new NotImplementedException("Network stats not implemented yet.")
    }

    @Get("/disk")
    async getDiskUsage() {
        return this.disk.getUsage();
    }
    @Post("/disk")
    async getDiskUsageByPath(@Body() payload: {path: string}) {
        return this.disk.getUsage(payload.path);
    }
}
