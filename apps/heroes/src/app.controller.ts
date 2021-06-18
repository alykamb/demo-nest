import { Body, Controller, Post } from '@nestjs/common'

import { CommandBus } from '../../commandBus'
import { Hero } from '../../common/dtos/hero'

@Controller('hero')
export class AppController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post('create')
    public create(@Body('name') name: string): Promise<Hero> {
        return this.commandBus.execute('createHero', name)
    }
}
