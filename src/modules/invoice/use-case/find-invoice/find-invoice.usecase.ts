import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface"
import { Product } from "../../domain/entity/product.entity"
import { Address } from "../../domain/value-object/address.value-object"
import { InvoiceGateway } from "../../gateway/invoice.gateway"
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.dto"

export class FindInvoiceUseCase implements UseCaseInterface {
  constructor(private readonly repository: InvoiceGateway){}

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {

    const client = await this.repository.find(input.id)

    return {
      id: client.id.id,
      address: new Address({
        city: client.address.city,
        complement: client.address.complement,
        number: client.address.number,
        state: client.address.state,
        street: client.address.street,
        zipCode: client.address.zipCode
      }),
      name: client.name,
      document: client.document,
      items: client.items.map((product) => ({
        id: product.id.id,
        name: product.name,
        price: product.price,

      })),
      total: client.items.reduce((prev: number, current: Product) => prev + current.price, 0),
      createdAt: client.createdAt,
    }
  }
}