import { ClientGateway } from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.dto";

export class FindClientUseCase {
  constructor(private readonly _clientRepository: ClientGateway){}

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {

    const client = await this._clientRepository.find(input.id);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.street,
      complement: client.complement,
      number: client.number,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}