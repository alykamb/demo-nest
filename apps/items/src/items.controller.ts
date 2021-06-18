import { Controller, Get } from '@nestjs/common'

import { ItemsService } from './items.service'

@Controller()
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
<<<<<<< HEAD
    getHello(): string {
=======
    public getHello(): string {
>>>>>>> b597b0ca75d684ad2a44f1ae43b2f3e767aaa073
        return this.itemsService.getHello()
    }
}
