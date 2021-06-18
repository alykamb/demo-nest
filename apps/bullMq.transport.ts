import { Injectable } from '@nestjs/common'

@Injectable()
export class BullMq {
    private workers = new Map<string, any>()

    // Todo: receber provider do Redis e criar instancia no construtor
    /**
     * addJob(name, payload, project)
     */
    /**
     * Todo: createWorker(name, callback)
     */
}
