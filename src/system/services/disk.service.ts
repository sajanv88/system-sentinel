import { Injectable } from "@nestjs/common";
import {NotSupportedException} from "../../not-supported.exception";

@Injectable()
export class DiskService {

    private async listAllMountedFileSystems(): Promise<string[] | string> {
        const {exec} = await import('child_process');
        return new Promise((resolve, reject) => {
            exec('df -h --output=target', (error, stdout, stderr) => {
                if (error) {
                    return reject(`Error getting mounted filesystems: ${stderr}`);
                }
                const mountPoints = stdout
                    .split('\n')
                    .slice(1) // Skip the header line
                    .map(line => line.trim())
                    .filter(line => line !== '');
                resolve(mountPoints);
            });
        });
    }

    private async listAllDrivesIfWindows() {
        // Todo: Will come back later for windows machine.
    }

    private async getUsageByPath(path: string) {
        const diskUsage = await import('diskusage');
        return diskUsage.check(path).then((diskSpace) => ({
            total: diskSpace.total,
            free: diskSpace.free,
            used: diskSpace.total - diskSpace.free,
            usage: ((diskSpace.total - diskSpace.free) / diskSpace.total) * 100
        })).catch((err) => {
            throw new Error(`Failed to get disk usage: ${err.message}`);
        });
    }

   private async getTotalDiskUsage() {
        try {
            const mountPoints = await this.listAllMountedFileSystems();
            if (typeof mountPoints !== "string") {
                const diskUsages = await Promise.all(
                    mountPoints
                        .map(mountPoint =>
                            this.getUsageByPath(mountPoint)
                                .catch(err => console.error(err))));

                const totalDiskSpace = diskUsages
                    .reduce((acc, diskUsage) => acc + (diskUsage ? diskUsage.total : 0), 0);
                const totalFreeSpace = diskUsages
                    .reduce((acc, diskUsage) => acc + (diskUsage ? diskUsage.free : 0), 0);

                const totalUsedSpace = totalDiskSpace - totalFreeSpace;
                const totalUsagePercentage = (totalUsedSpace / totalDiskSpace) * 100;

                return {
                    total: totalDiskSpace,
                    free: totalFreeSpace,
                    used: totalUsedSpace,
                    usage: Number(totalUsagePercentage.toFixed(2))
                };
            }
        } catch (error) {
            console.error('Error getting total disk usage:', error);
            return null;
        }
    }

    async getUsage(path: string = '/') {
        const os = await import('os');
        if(os.platform() === "win32") {
            throw new NotSupportedException();
        }else if (os.platform() === "linux" || os.platform() === "darwin") {
            const currentPathDiskUsage = await this.getUsageByPath(path);
            const totalDiskInformation = await this.getTotalDiskUsage();
            return {
                currentPathDiskUsage,
                totalDiskInformation,
                path
            }
        }else {
            throw new NotSupportedException("Supported platforms are Linux and MacOs");
        }


    }
}