import { Injectable } from '@nestjs/common'

type Call = (...args: any[]) => any | Promise<any>

@Injectable()
export class CommandBus {
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
