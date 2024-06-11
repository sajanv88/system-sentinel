import { Controller, Get, NotImplementedException } from "@nestjs/common";
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
        // Todo: Implement cpu stats
        return new NotImplementedException("CPU usage not implemented yet.")
    }

    @Get("/net")
    async getNetworkUsage() {
        // Todo: Implement net stats
        return new NotImplementedException("Network stats not implemented yet.")
    }

    @Get("/disk")
    async getDiskUsage() {
        // Todo: Implement disk stats
        return new NotImplementedException("Disk usage not implemented yet.")
    }
}
