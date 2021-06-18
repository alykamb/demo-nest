import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common'
import { Worker } from 'bullmq'
import Redis from 'ioredis'

import { REDIS, RedisAddress } from './redis'
type GenericFunction = (...args: any[]) => any | Promise<any>

@Injectable()
export class BullMq implements OnModuleDestroy {
    private worker: Worker
    private redis: Redis.Redis

    constructor(@Inject(REDIS) public redisAddress: RedisAddress) {
        this.redis = new Redis(redisAddress)
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
