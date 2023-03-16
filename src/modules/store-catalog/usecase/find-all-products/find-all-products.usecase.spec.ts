import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { FindAllProductsUsecase } from "./find-all-products.usecase";

const product1 = new Product({
  id: new Id("1"),
  name: 'any_name',
  description: 'any_description',
  salesPrice: 100
})

const product2 = new Product({
  id: new Id("2"),
  name: 'any_name_2',
  description: 'any_description_2',
  salesPrice: 100
})

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn().mockResolvedValue([product1, product2])
})

describe('FindAllProductsUseCase unit test', () => {
  it("should find all products", async () => {
    const productRepository = MockRepository()

    const usecase = new FindAllProductsUsecase(productRepository)

    const result = await usecase.execute()

    expect(productRepository.findAll).toHaveBeenCalled()
    expect(result.products.length).toBe(2)
    expect(result.products[0].id).toBe("1")
    expect(result.products[0].name).toBe("any_name")
    expect(result.products[0].description).toBe("any_description")
    expect(result.products[0].salesPrice).toBe(100)
    expect(result.products[1].id).toBe("2")
    expect(result.products[1].name).toBe("any_name_2")
    expect(result.products[1].description).toBe("any_description_2")
    expect(result.products[1].salesPrice).toBe(100)
  })
});