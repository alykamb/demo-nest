import { Module, OnApplicationBootstrap } from '@nestjs/common'

import { CommandBus, NAME } from '../../commandBus'
import { ItemsController } from './items.controller'
import { ItemsService } from './items.service'

@Module({
    imports: [],
    controllers: [ItemsController],
    providers: [
        ItemsService,
        CommandBus,
        {
            provide: NAME,
            useValue: 'Items',
        },
    ],
})
export class ItemsModule implements OnApplicationBootstrap {
    constructor(public itemsService: ItemsService, public commandBus: CommandBus) {}

    public onApplicationBootstrap(): void {
        this.commandBus.registerHandler(
            'createItem',
            this.itemsService.createItem.bind(this.itemsService),
        )
    }
}
