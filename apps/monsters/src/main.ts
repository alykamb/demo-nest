import { NestFactory } from '@nestjs/core'

import { MonstersModule } from './monsters.module'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(MonstersModule)
    await app.listen(3001)
}
void bootstrap()
