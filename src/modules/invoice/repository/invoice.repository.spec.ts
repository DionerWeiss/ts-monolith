import { Sequelize } from "sequelize-typescript";
import { InvoiceProductModel } from "./invoice-product.model";
import { InvoiceModel } from "./invoice.model";
import { InvoiceRepository } from "./invoice.repository";
import { ProductModel } from "./product.model";

describe('InvoiceRepository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {force: true}
    })

    await sequelize.addModels([InvoiceModel,ProductModel,InvoiceProductModel ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a invoice', async () => {
    const product1 = await ProductModel.create({
      id: "1",
      name: 'Product 1',
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const invoice = await InvoiceModel.create({
      id: "333",
      name: "invoice name",
      document: "invoice document",
      street: "street",
      number: 100,
      zipcode: "00001",
      city: "city",
      complement: "complement",
      state: "state",
      items: [product1],
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await InvoiceProductModel.create({
      invoiceId: invoice.id,
      productId: product1.id
    })

    const repository = new InvoiceRepository()

    const result = await repository.find("333")

    expect(result.id.id).toBe(invoice.id)
    expect(result.document).toEqual(invoice.document)
    expect(result.name).toEqual(invoice.name)
    expect(result.address.city).toEqual(invoice.city)
    expect(result.address.complement).toEqual(invoice.complement)
    expect(result.address.number).toEqual(invoice.number)
    expect(result.address.state).toEqual(invoice.state)
    expect(result.address.street).toEqual(invoice.street)
    expect(result.address.zipCode).toEqual(invoice.zipcode)

    expect(result.items[0].id.id).toEqual(product1.id)
    expect(result.items[0].name).toEqual(product1.name)
    expect(result.items[0].price).toEqual(product1.price)
  });

});