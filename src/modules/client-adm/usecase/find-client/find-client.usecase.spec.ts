import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Client } from "../../domain/client.entity";
import { FindClientUseCase } from "./find-client.usecase";

const client = new Client({
  id: new Id("1"),
  name: 'client name',
  address: 'client address',
  email: 'x@x.com'
})

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn().mockResolvedValue(client)
})

describe('Find client use case unit test', () => {
  it('should find a client', async () => {
    const repository = MockRepository()
    const usecase = new FindClientUseCase(repository)

    const input = {
      id: "1"
    }

    const result = await usecase.execute(input)

    expect(repository.find).toHaveBeenCalled()
    expect(result.id).toBe(input.id)
    expect(result.name).toEqual(client.name)
    expect(result.email).toEqual(client.email)
    expect(result.address).toEqual(client.address)
  })
});