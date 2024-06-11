import {Injectable, Logger} from "@nestjs/common";

@Injectable()
export class CPUService {
    private _logger = new Logger(CPUService.name);
    async getUsage() {
        const os = await import("os");
        const cpus = os.cpus()
        const usagePerCore = cpus.map((cpu, index) => {
            const total = Object.values(cpu.times).reduce((acc, time) => acc + time, 0);
            const idle = cpu.times.idle;
            const used = total - idle;
            const percentage = (used / total ) * 100;
            return {
                core: index,
                usage: percentage
            };
        });

        const totalUsage = usagePerCore.reduce((acc, core) => acc + core.usage, 0) / cpus.length;
        const { model, speed } = os.cpus()[0];
        return {
            cpuModel: model,
            speed,
            perCore: usagePerCore.map(p => ({...p, usage: Number(p.usage.toFixed(2))})),
            total: Number(totalUsage.toFixed(2))
        };
    }
}