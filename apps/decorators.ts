export const COMMAND_METADATA = Symbol()

export const commandHandler =
    (command: any): ClassDecorator =>
    (target: any): void => {
        Reflect.defineMetadata(COMMAND_METADATA, command.name, target)
    }
