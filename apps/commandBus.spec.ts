import { CommandBus } from './commandBus'

describe('commandBus', () => {
    let commandBus: CommandBus

    beforeEach(() => {
        commandBus = new CommandBus()
    })

    test('registrar um handler', () => {
        const name = 'teste'
        const func = (): null => null
        commandBus.registerHandler(name, func)
        expect(commandBus['handlers'].get(name)).toBe(func)
    })

    test('deve dar thrown ao executar com handler inexistente', () => {
        void expect(commandBus.execute('non exists', 1)).rejects.toThrow()
    })

    test.todo('deve dar throw se o handler der throw')
    test.todo('deve retornar o valor retornado pelo handler')
})
