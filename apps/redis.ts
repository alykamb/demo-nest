import { Provider } from '@nestjs/common'

export interface RedisAddress {
    host: string
    port: number
}
export const REDIS = Symbol()
export const redisProvider: Provider<RedisAddress> = {
    provide: REDIS,
    useValue: {
        host: '192.168.0.100',
        port: 6379,
    },
}
