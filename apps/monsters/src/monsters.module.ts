import { Module, OnApplicationBootstrap } from '@nestjs/common'

import { CommandBus, NAME } from '../../commandBus'
import { MonstersController } from './monsters.controller'
import { MonstersService } from './monsters.service'

@Module({
    imports: [],
    controllers: [MonstersController],
    providers: [MonstersService, CommandBus, { provide: NAME, useValue: 'Monsters' }],
})
export class MonstersModule implements OnApplicationBootstrap {
    constructor(public monstersService: MonstersService, public commandBus: CommandBus) {}

    public onApplicationBootstrap(): void {
        this.commandBus.registerHandler(
            'createMonster',
            this.monstersService.createMonsterService.bind(this.monstersService),
        )
    }
}
