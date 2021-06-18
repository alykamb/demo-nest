import { Controller, Get } from '@nestjs/common'

import { ItemsService } from './items.service'

@Controller()
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    public getHello(): string {
        return this.itemsService.getHello()
    }
}
