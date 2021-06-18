import { Injectable } from '@nestjs/common'

import { Monster } from '../../common/dtos/monster'

@Injectable()
export class MonstersService {
    public async createMonsterService(type: string): Promise<Monster> {
        return new Monster(type)
    }
}
