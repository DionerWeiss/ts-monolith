import { AddClientUseCase } from "./add-client.usecase";

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn()
})

describe('Add client use case unit test', () => {
  it('should add a client', async () => {
    const repository = MockRepository()
    const usecase = new AddClientUseCase(repository)

    const input = {
      name: "Client 1",
      email: "a@x.com",
      address: "address client"
    }

    const result = await usecase.execute(input)

    expect(repository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.email).toEqual(input.email)
    expect(result.address).toEqual(input.address)
  })
});