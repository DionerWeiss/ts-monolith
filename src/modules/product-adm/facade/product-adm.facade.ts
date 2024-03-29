import { UseCaseInterface } from "../../@shared/usecase/use-case.interface";
import { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto, ProductAdmFacadeInterface } from "./product-adm.facade.interface";

export interface UseCasesProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
}

export class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUsecase: UseCaseInterface;
  private _checkStockUsecase: UseCaseInterface;

  constructor(usecasesProps: UseCasesProps) {
    this._addUsecase = usecasesProps.addUseCase;
    this._checkStockUsecase = usecasesProps.stockUseCase;
  }

  async addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return this._addUsecase.execute(input);
  }
  
  async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUsecase.execute(input)
  }
}