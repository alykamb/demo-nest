import { Body, Controller, Post } from '@nestjs/common'

import { CommandBus } from '../../commandBus'
import { Hero } from '../../common/dtos/hero'
import { Monster } from '../../common/dtos/monster'

@Controller('hero')
export class AppController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post('create')
    public create(@Body('name') name: string): Promise<Hero> {
        return this.commandBus.execute('createHero', name)
    }

    @Post('add-pet')
    public async addPet(@Body() heroPetDto: any): Promise<Hero & { pet: Monster }> {
        const hero: Hero & { pet: Monster } = await this.commandBus.execute(
            'createHero',
            heroPetDto.name,
        )
        hero.pet = await this.commandBus.execute('createMonster', heroPetDto.pet, 'Monsters')

        return hero
    }
}
