import { Hero } from '../../../common/dtos/hero'
import { commandHandler } from '../../../decorators'

export class CreateHeroCommand {
    constructor(public name: string) {}
}

@commandHandler(CreateHeroCommand)
export class CreateHeroHandler {
    public execute(command: CreateHeroCommand): Hero {
        return new Hero(command.name)
    }
}
