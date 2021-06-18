import { NestFactory } from '@nestjs/core'

import { ItemsModule } from './items.module'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(ItemsModule)
    await app.listen(3000)
}
void bootstrap()
