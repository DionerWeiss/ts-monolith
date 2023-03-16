import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import { ProductGateway } from "../../gateway/product.gateway";

export class FindAllProductsUsecase implements UseCaseInterface {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute(): Promise<any> {
    const products = await this.productRepository.findAll()

    return {
      products: products.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      }))
    }
  }

}