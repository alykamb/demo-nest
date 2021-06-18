import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common'
import { Queue, QueueEvents, Worker } from 'bullmq'
import Redis from 'ioredis'

import { REDIS, RedisAddress } from './redis'
type GenericFunction = (...args: any[]) => any | Promise<any>

@Injectable()
export class BullMq implements OnModuleDestroy {
    private worker: Worker
    private queues = new Map<string, Queue>()
    private queuesEvents = new Map<string, QueueEvents>()
    private redis: Redis.Redis

    constructor(@Inject(REDIS) public redisAddress: RedisAddress) {
        this.redis = new Redis(redisAddress)
    }

    private createQueue(name: string): void {
        if (this.queues.has(name)) {
            return
        }
        this.queues.set(name, new Queue(name))
        this.queuesEvents.set(name, new QueueEvents(name))
    }

    // public addJob()

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
