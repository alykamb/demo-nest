import { Inject, Injectable } from '@nestjs/common'

import { BullMq } from './bullMq.transport'

type Call = (...args: any[]) => any | Promise<any>
export type Payload = {
    type: string
    payload?: any
}

export const NAME = Symbol()

@Injectable()
export class CommandBus {
    private handlers = new Map<string, Call>()
    constructor(@Inject(NAME) public name: string, public bullmq: BullMq) {
        this.bullmq.createWorker(name, ({ type, payload }: Payload) => {
            return this.executeByName(type, payload)
        })
    }

    public registerHandler(type: string, call: Call): void {
        this.handlers.set(type, call)
    }

    public async executeByName(type: string, payload: any, project = this.name): Promise<any> {
        if (project !== this.name) {
            return this.bullmq.addJobPromise(project, type, payload)
        }

        const call = this.handlers.get(type)

        if (!call) {
            throw new Error('handler não existe')
        }
        return call(payload)
    }

    public execute(command?: any, project: string = this.name): Promise<any> {
        const type = Object.getPrototypeOf(command).constructor.name
        const payload = command

        return this.executeByName(type, payload, project)
    }
}
