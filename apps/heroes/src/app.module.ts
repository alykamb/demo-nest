import { Module, OnApplicationBootstrap } from '@nestjs/common'
import { ModulesContainer } from '@nestjs/core'

import { BullMq } from '../../bullMq.transport'
import { CommandBus, NAME } from '../../commandBus'
import { COMMAND_METADATA } from '../../decorators'
import { PROJECTS } from '../../projects'
import { redisProvider } from '../../redis'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CreateHeroHandler } from './commands/createHero.command'

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
            useValue: PROJECTS.Heroes,
        },
        CreateHeroHandler,
    ],
})
export class AppModule implements OnApplicationBootstrap {
    constructor(
        public appService: AppService,
        private commandBus: CommandBus,
        private modulesContainer: ModulesContainer,
    ) {}

    public onApplicationBootstrap(): void {
        const modules = Array.from(this.modulesContainer.values()) //pega todos modules do nest

        const handlers: any[] = []
        for (const module of modules) {
            //para cara module
            handlers.push(
                ...Array.from(module.providers.values()) //pega todos os providers
                    .filter((provider) => {
                        return (
                            provider?.instance?.constructor && //filtra providers que tem construtor(são classes)
                            !!Reflect.getMetadata(COMMAND_METADATA, provider.instance.constructor) //e tem o nosso decorador
                        )
                    })
                    .map((provider) => ({
                        //mapeia os dados necessários
                        instance: provider?.instance, //intância do commandHandler
                        commandName: Reflect.getMetadata(
                            //nome do command que ele executa
                            COMMAND_METADATA,
                            provider.instance.constructor,
                        ),
                    })),
            )
        }

        //para cada um, registra no bus
        handlers.forEach(({ instance, commandName }) => {
            this.commandBus.registerHandler(commandName, (commandData) =>
                instance.execute(commandData),
            )
        })
    }
}
