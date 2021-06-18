import { Body, Controller, Post } from '@nestjs/common'

import { CommandBus } from '../../commandBus'
import { Monster } from '../../common/dtos/monster'

@Controller('monster')
export class MonstersController {
    constructor(public commandBus: CommandBus) {}

    @Post('create-monster')
    public createMonster(@Body('type') type: string): Promise<Monster> {
        return this.commandBus.execute('createMonster', type)
    }
}
