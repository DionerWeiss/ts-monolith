import { ProductGateway } from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export class CheckStockUseCase {
  constructor(private readonly _productRepository: ProductGateway) {}

  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const product = await this._productRepository.find(input.productId)
    return {
      productId: product.id.id,
      stock: product.stock
    }
  }
}