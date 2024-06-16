import {Body, Controller, Get, NotImplementedException, Post, Sse} from "@nestjs/common";
import { CPUService } from "../services/cpu.service";
import { NetworkService } from "../services/network.service";
import { DiskService } from "../services/disk.service";
import {interval, map, Observable} from "rxjs";

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
       return this.net.getUsage();
    }

    @Get('/net/active_stats')
    async getActiveNetworkStats() {
        return this.net.getActiveNetworkStats();
    }

    @Sse("/network_stats")
    sse(): Observable<any> {
        return interval(1000).pipe(map(() => this.net.getStats()))
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
