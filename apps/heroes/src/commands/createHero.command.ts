import { commandHandler } from '../../../decorators'

export class CreateHeroCommand {
    constructor(public name: string) {}
}

@commandHandler(CreateHeroCommand)
export class CreateHeroHandler {
    public execute(command: CreateHeroCommand): void {
        console.log(command)
    }
}
