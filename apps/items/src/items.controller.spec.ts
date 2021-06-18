import { Test, TestingModule } from '@nestjs/testing'

import { Item } from '../../common/dtos/item'
import { ItemsController } from './items.controller'
import { ItemsService } from './items.service'

describe('ItemsController', () => {
    let itemsController: ItemsController

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ItemsController],
            providers: [ItemsService],
        }).compile()

        itemsController = app.get<ItemsController>(ItemsController)
    })

    describe('root', () => {
        it('should return "Hello World!"', () => {
            const item = {
                name: 'Armor',
                value: 150,
            }
            expect(itemsController.createItem(item)).toBeInstanceOf(Item)
        })
    })
})
