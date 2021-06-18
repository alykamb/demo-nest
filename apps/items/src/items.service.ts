import { Injectable } from '@nestjs/common'

@Injectable()
export class ItemsService {
    getHello(): string {
        return 'Hello World!'
    }
}
