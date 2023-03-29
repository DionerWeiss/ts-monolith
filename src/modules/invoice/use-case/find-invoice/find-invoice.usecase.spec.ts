import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Invoice } from "../../domain/entity/invoice.entity";
import { Product } from "../../domain/entity/product.entity";
import { Address } from "../../domain/value-object/address.value-object";
import { FindInvoiceUseCase } from "./find-invoice.usecase";

const product1 = new Product({
  id: new Id("1"),
  name: 'product name',
  price: 100,
})
const product2 = new Product({
  id: new Id("2"),
  name: 'product name 2',
  price: 200,
})

const invoice = new Invoice({
  id: new Id("333"),
  address: new Address({
    city: "city 1",
    complement: "complement",
    number: '100',
    state: "SP",
    street: "street 1",
    zipCode: "90000",
  }),
  document: "invoice document",
  items: [product1, product2],
  name: "invoice name"
})


const MockRepository = () => ({
  find: jest.fn().mockResolvedValue(invoice),
  generate: jest.fn()
})

describe("FindInvoiceUseCase", () => {
  it("should find a invoice", async () => {
    const repository = MockRepository()
    const input = {
      id: "333"
    }

    const useCase = new FindInvoiceUseCase(repository)

    const result = await useCase.execute(input)

    expect(repository.find).toHaveBeenCalled()
    expect(result.id).toBe(input.id)
    expect(result.name).toEqual(invoice.name)
    expect(result.address.city).toEqual(invoice.address.city)
    expect(result.address.complement).toEqual(invoice.address.complement)
    expect(result.address.number).toEqual(invoice.address.number)
    expect(result.address.state).toEqual(invoice.address.state)
    expect(result.address.street).toEqual(invoice.address.street)
    expect(result.address.zipCode).toEqual(invoice.address.zipCode)
    expect(result.document).toEqual(invoice.document)
    result.items.forEach(item => {
      expect(item).toEqual({
        id: item.id,
        name: item.name,
        price: item.price
      })
    })
    expect(result.total).toBe(300)
  })
})