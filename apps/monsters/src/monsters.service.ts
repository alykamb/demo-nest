import { Injectable } from '@nestjs/common'

import { Monster } from '../../common/dtos/monster'

@Injectable()
export class MonstersService {
    public createMonsterService(type: string): Monster {
        return new Monster(type)
    }
}
