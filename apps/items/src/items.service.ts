import { Injectable } from '@nestjs/common'

@Injectable()
export class ItemsService {
    public getHello(): string {
        return 'Hello World!'
    }
}
