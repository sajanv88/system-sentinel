import {HttpException, HttpStatus} from "@nestjs/common";

export class NotSupportedException extends HttpException {
    constructor(message: string = "Not Supported") {
        super(message, HttpStatus.NOT_ACCEPTABLE);
    }
}