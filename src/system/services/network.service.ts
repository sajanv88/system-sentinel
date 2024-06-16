import { Injectable } from "@nestjs/common";

@Injectable()
export class NetworkService {
    async getUsage() {
        const os = await import('os');
        const network = await import('network');
        return new Promise((resolve, reject) => {
            network.get_active_interface((err, obj) => {
                if (err) {
                    console.log('Error:', err);
                    reject(err);
                } else {
                    console.log('Active Network Interface:', obj);
                    resolve({
                        interfaces: os.networkInterfaces(),
                        activeInterface: obj
                    })
                }
            });
        })
    }

    async getActiveNetworkStats() {
        const childProcess = await import('child_process');
        const { exec } = childProcess;
        return new Promise((resolve, reject) => {
            exec('netstat -e', (err, stdout, stderr) => {
                if (err) {
                    console.error(`Error: ${err.message}`);
                    reject(err.message);
                    return;
                }
                if (stderr) {
                    console.error(`Stderr: ${stderr}`);
                    reject(err.message);
                    return;
                }

                const lines = stdout.trim().split('\n');
                const stats = {};

                lines.forEach(line => {
                    const parts = line.trim().split(/\s+/);
                    if (parts.length >= 2) {
                        const key = parts[0];
                        stats[key] = parts.slice(1).join(' ');
                    }
                });

                const json = JSON.stringify(stats, null, 2);
                resolve(json);
            });
        })
    }

    async getStats() {
        const netstat = await import('node-netstat');
        return new Promise((resolve, reject) => {
            const activeConnections = [];
            netstat({}, (data) => {
                activeConnections.push(data);
                resolve(activeConnections);
            });
        })
    }
}