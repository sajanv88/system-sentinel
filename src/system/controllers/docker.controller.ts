import { Controller, Get, NotImplementedException } from "@nestjs/common";
import { Dockerervice } from "../services/docker.service";

@Controller("container")
export class DockerController {
    constructor(private readonly docker: Dockerervice) {}
    
    @Get("/metrics")
    async getCpuUsage() {
        // Todo: Implement docker container metrics stats
        return new NotImplementedException("Container metrics not implemented yet.")
    }

}
