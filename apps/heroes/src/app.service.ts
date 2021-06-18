import { Injectable } from '@nestjs/common'

import { Hero } from '../../common/dtos/hero'

@Injectable()
export class AppService {
    public getHello(): string {
        return 'Hello World!'
    }

    public create(name: string): Hero {
        const hero = new Hero(name)
        return hero
    }
}
