import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Client } from "../../domain/client.entity";
import { ClientGateway } from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export class AddClientUseCase {
  constructor(private readonly clientRepository: ClientGateway){}

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      email: input.email,
      address: input.address
    }

    const client = new Client(props)

    await this.clientRepository.add(client)

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