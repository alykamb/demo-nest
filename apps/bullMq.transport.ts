import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common'
import { Queue, QueueEvents, Worker } from 'bullmq'
import Redis from 'ioredis'
import { firstValueFrom, from, Subject } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'

import { REDIS, RedisAddress } from './redis'
type GenericFunction = (...args: any[]) => any | Promise<any>
type JobResponse = {
    jobId: string
    returnvalue: string
}
@Injectable()
export class BullMq implements OnModuleDestroy {
    private worker: Worker
    private queues = new Map<string, Queue>()
    private queuesEvents = new Map<string, QueueEvents>()

    private redis: Redis.Redis

    private responses$ = new Subject<JobResponse>()
    private promiseCallbacks = new Map<string, any>()
    private callbacks = new Map<string, any>()

    constructor(@Inject(REDIS) public redisAddress: RedisAddress) {
        this.redis = new Redis(redisAddress)
    }

    private createQueue(name: string): Queue {
        if (this.queues.has(name)) {
            return this.queues.get(name)
        }

        const queue = new Queue(name, { connection: this.redis })
        this.queues.set(name, queue)

        const events = new QueueEvents(name, { connection: this.redis })
        this.queuesEvents.set(name, events)

        events.on('completed', (job: JobResponse) => {
            //rxjs
            this.responses$.next(job)

            //promise
            this.promiseCallbacks.get(job.jobId)?.(job.returnvalue) //executa o resolve que foi adicionado no map
            this.promiseCallbacks.delete(job.jobId)

            //callback
            this.callbacks.get(job.jobId)?.(job.returnvalue) //executa o resolve que foi adicionado no map
            this.callbacks.delete(job.jobId)
        })

        return queue
    }

    //versão com rxjs
    public addJob(project: string, type: string, payload?: any): Promise<any> {
        const queue = this.createQueue(project)

        return firstValueFrom(
            from(queue.add(project, { type, payload })).pipe(
                mergeMap((job) => {
                    return this.responses$.pipe(
                        filter((response) => response.jobId === job.id),
                        map((response) => response.returnvalue),
                    )
                }),
            ),
        )
    }

    //versão com promise
    public async addJobPromise(project: string, type: string, payload?: any): Promise<any> {
        const queue = this.createQueue(project)
        const job = await queue.add(project, { type, payload })

        return new Promise((resolve) => this.promiseCallbacks.set(job.id, resolve))
    }

    //versão com callback
    public addJobCallback(
        callback: (arg?: any) => any,
        project: string,
        type: string,
        payload?: any,
    ): void {
        const queue = this.createQueue(project)

        void queue.add(project, { type, payload }).then((job) => {
            this.callbacks.set(job.id, callback)
        })
    }

    public createWorker(name: string, callback: GenericFunction): void {
        this.worker = new Worker(name, (job) => callback(job.data), { connection: this.redis })
    }

    public async onModuleDestroy(): Promise<void> {
        await this.worker.close()
    }

    /**
     * addJob(name, payload, project)
     */
}
