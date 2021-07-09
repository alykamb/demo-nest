import { Monster } from '../../../common/dtos/monster'
import { commandHandler } from '../../../decorators'

export class CreateMonsterCommand {
    constructor(public type: string) {}
}

@commandHandler(CreateMonsterCommand)
export class CreateMonsterHandler {
    public execute(command: CreateMonsterCommand): Monster {
        return new Monster(command.type)
    }
}
