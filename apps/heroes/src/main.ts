import { NestFactory } from '@nestjs/core'
<<<<<<< HEAD

import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    await app.listen(3000)
}
bootstrap()
=======

import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    await app.listen(3000)
}
void bootstrap()
>>>>>>> b597b0ca75d684ad2a44f1ae43b2f3e767aaa073
