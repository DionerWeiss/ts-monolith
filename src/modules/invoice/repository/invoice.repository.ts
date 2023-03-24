import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Invoice } from "../domain/entity/invoice.entity";
import { Product } from "../domain/entity/product.entity";
import { Address } from "../domain/value-object/address.value-object";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";
import { ProductModel } from "./product.model";

export class InvoiceRepository implements InvoiceGateway {
  
  async find(id: string): Promise<Invoice> {
    let invoice

    try {
      invoice = await InvoiceModel.findOne({ 
        where: { 
          id 
        },
        include: "items",
        rejectOnEmpty: true
      });
    } catch (error) {
      throw new Error("Invoice not found");
    }

    return new Invoice({
      id: new Id(invoice.id),
      address: new Address({
        city: invoice.city,
        complement: invoice.complement,
        number: invoice.number,
        state: invoice.state,
        street: invoice.street,
        zipCode: invoice.zipcode,
      }),
      document: invoice.document,
      items: invoice.items.map((item) => new Product({
        id: new Id(item.id),
        name: item.name,
        price: item.price,
      })),
      name: invoice.name,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    })
  }

  async generate(input: Invoice): Promise<void> {
    await InvoiceModel.create(
      {
        id: input.id.id,
        name: input.name,
        document: input.document,
        street: input.address.street,
        number: input.address.number,
        complement: input.address.complement,
        zipcode: input.address.zipCode,
        state: input.address.state,
        city: input.address.city,
        items: input.items.map((item) => ({
          id: item.id.id,          
          name: item.name,
          price: item.price,
        })),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        include: [{ model: ProductModel }]
      }
      );
  }
  
}