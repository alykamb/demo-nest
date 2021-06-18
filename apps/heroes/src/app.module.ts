import { Module, OnApplicationBootstrap } from '@nestjs/common'

import { CommandBus, NAME } from '../../commandBus'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
    imports: [],
    controllers: [AppController],
    providers: [
        AppService,
        CommandBus,
        {
            provide: NAME,
            useValue: 'Heroes',
        },
    ],
})
export class AppModule implements OnApplicationBootstrap {
    constructor(public appService: AppService, private commandBus: CommandBus) {}

    public onApplicationBootstrap(): void {
        this.commandBus.registerHandler('createHero', this.appService.create.bind(this.appService))
    }
}
