import { Injectable } from '@nestjs/common'

@Injectable()
export class MonstersService {
    public getHello(): string {
        return 'Hello World!'
    }
}
