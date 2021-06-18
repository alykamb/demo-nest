import { Body, Controller, Post } from '@nestjs/common'

import { MonstersService } from './monsters.service'

@Controller('monster')
export class MonstersController {
    constructor(private readonly monstersService: MonstersService) {}

    @Post()
    public createMonster(@Body('type') type: string): Promise<any> {
        return this.monstersService.createMonsterService(type)
    }
}
