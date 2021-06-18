import { Body, Controller, Post } from '@nestjs/common'

import CommandBus from '../../commandBus'
import { Item } from '../../common/dtos/item'

@Controller()
export class ItemsController {
    constructor(public commandBus: CommandBus) {}

    @Post('item')
    public createItem(@Body() data: Item): Promise<Item> {
        return this.commandBus.execute('createItem', data)
    }
}
