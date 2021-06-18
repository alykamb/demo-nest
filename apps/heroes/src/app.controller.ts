import { Controller, Post } from '@nestjs/common'

import { Hero } from '../../common/dtos/hero'
import { AppService } from './app.service'

@Controller('hero')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post()
    public create(name: string): Hero {
        const hero = new Hero(name)
        return hero
    }
}
