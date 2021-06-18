import { Injectable } from '@nestjs/common'

import { Item } from '../../common/dtos/item'

@Injectable()
export class ItemsService {
    public createItem(item: Item): Item {
        return new Item(item.name, item.value)
    }
}
