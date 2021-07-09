import { Module, OnApplicationBootstrap } from '@nestjs/common'

import { BullMq } from '../../bullMq.transport'
import { CommandBus, NAME } from '../../commandBus'
import { redisProvider } from '../../redis'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CreateHeroCommand, CreateHeroHandler } from './commands/createHero.command'

// console.log(CreateHeroCommand.name)

@Module({
    imports: [],
    controllers: [AppController],
    providers: [
        AppService,
        CommandBus,
        BullMq,
        redisProvider,
        {
            provide: NAME,
            useValue: 'Heroes',
        },
        CreateHeroHandler,
    ],
})
export class AppModule implements OnApplicationBootstrap {
    constructor(public appService: AppService, private commandBus: CommandBus) {}

    public onApplicationBootstrap(): void {
        this.commandBus.registerHandler('createHero', this.appService.create.bind(this.appService))

        console.log(Reflect.getMetadata('command_handler_metadata', CreateHeroHandler))
    }
}
