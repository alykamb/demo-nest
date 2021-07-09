import { Body, Controller, Post } from '@nestjs/common'

import { CommandBus } from '../../commandBus'
import { Hero } from '../../common/dtos/hero'
import { Monster } from '../../common/dtos/monster'
import { CreateMonsterCommand } from '../../monsters/src/commands/createMonster.command'
import { PROJECTS } from '../../projects'
import { CreateHeroCommand } from './commands/createHero.command'

@Controller('hero')
export class AppController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post('create')
    public create(@Body('name') name: string): Promise<Hero> {
        return this.commandBus.execute(new CreateHeroCommand(name))
    }

    @Post('add-pet')
    public async addPet(@Body() heroPetDto: any): Promise<Hero & { pet: Monster }> {
        const hero: Hero & { pet: Monster } = await this.commandBus.execute(
            new CreateHeroCommand(heroPetDto.name),
        )
        hero.pet = await this.commandBus.execute(
            new CreateMonsterCommand(heroPetDto.pet),
            PROJECTS.Monsters,
        )

        return hero
    }
}
