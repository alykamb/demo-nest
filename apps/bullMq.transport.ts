import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common'
import { Job, Queue, QueueEvents, Worker } from 'bullmq'
import Redis from 'ioredis'
import { Subject } from 'rxjs'

import { REDIS, RedisAddress } from './redis'
type GenericFunction = (...args: any[]) => any | Promise<any>

@Injectable()
export class BullMq implements OnModuleDestroy {
    private worker: Worker
    private queues = new Map<string, Queue>()
    private queuesEvents = new Map<string, QueueEvents>()

    private responses$ = new Subject<Job>()
    private redis: Redis.Redis

    constructor(@Inject(REDIS) public redisAddress: RedisAddress) {
        this.redis = new Redis(redisAddress)
    }

    private createQueue(name: string): Queue {
        if (this.queues.has(name)) {
            return this.queues.get(name)
        }

        const queue = new Queue(name)
        this.queues.set(name, queue)

        const events = new QueueEvents(name)
        this.queuesEvents.set(name, events)

        events.on('completed', (job: Job) => this.responses$.next(job))

        return queue
    }

    public addJob(project: string, type: string, payload?: any) {
        const queue = this.createQueue(project)

        // this
    }

    public createWorker(name: string, callback: GenericFunction): void {
        this.worker = new Worker(name, callback, { connection: this.redis })
    }

    public async onModuleDestroy(): Promise<void> {
        await this.worker.close()
    }

    /**
     * addJob(name, payload, project)
     */
}
