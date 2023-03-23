import { ClientGateway } from "../../gateway/client.gateway"
import { FindClientInputDto, FindClientOutputDto } from "./find-client.dto"

export class FindClientUseCase {
  constructor(private readonly clientRepository: ClientGateway){}

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {

    const client = await this.clientRepository.find(input.id)

    return {
      id: client.id.id,
      address: client.address,
      email: client.email,
      name: client.name,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    }
  }
}