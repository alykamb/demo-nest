import { Injectable } from '@nestjs/common'
import { setTimeout } from 'timers/promises'

type Call = (...args: any[]) => any | Promise<any>

@Injectable()
class CommandBus {
    private handlers = new Map<string, Call>()
    public registerHandler(type: string, call: Call): void {
        this.handlers.set(type, call)
    }

    public async execute(type: string, payload: any): Promise<any> {
        const call = this.handlers.get(type)
        if (!call) {
            throw new Error('handler não existe')
        }
        return call(payload)
    }
}

const commandBus = new CommandBus()

function createThing(): any {
    return setTimeout(2000).then(() => true)
}

commandBus.registerHandler('createThing', createThing)
commandBus.registerHandler('somaUm', (n: number) => n + 1)

// void commandBus.execute('createThing', 1).then(console.log)
// void commandBus.execute('somaUm', 2).then(console.log)

export default CommandBus
