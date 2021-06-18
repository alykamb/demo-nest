import { Inject, Injectable } from '@nestjs/common'

import { BullMq } from './bullMq.transport'

type Call = (...args: any[]) => any | Promise<any>
type Payload = {
    type: string
    payload?: any
}

export const NAME = Symbol()

@Injectable()
export class CommandBus {
    private handlers = new Map<string, Call>()
    constructor(@Inject(NAME) public name: string, public bullmq: BullMq) {
        this.bullmq.createWorker(name, ({ type, payload }: Payload) => this.execute(type, payload))
    }

    public registerHandler(type: string, call: Call): void {
        this.handlers.set(type, call)
    }

    public async execute(type: string, payload?: any, project?: string): Promise<any> {
        if (project !== this.name) {
            //executar no bullmq
        }

        const call = this.handlers.get(type)

        if (!call) {
            throw new Error('handler não existe')
        }
        return call(payload)
    }
}
