import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import { Invoice } from "../../domain/entity/invoice.entity";
import { Product } from "../../domain/entity/product.entity";
import { Address } from "../../domain/value-object/address.value-object";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";

export class GenerateInvoiceUseCase implements UseCaseInterface {
  constructor(private readonly repository: InvoiceGateway) {}

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const invoice = new Invoice({
      id: new Id(input.id),
      name: input.name,
      document: input.document,
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      }),
      items: input.items.map((item) => new Product({
        id: new Id(item.id),
        name: item.name,
        price: item.price,
      }))
    })

    await this.repository.generate(invoice)

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: invoice.items.reduce((accumulator, value) => {
        return accumulator + value.price;
      }, 0)
    };
  }
  
}