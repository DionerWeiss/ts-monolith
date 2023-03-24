import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export class PlaceOrderUseCase implements UseCaseInterface {
  constructor(private readonly _clientFacade: ClientAdmFacadeInterface) {}
  
  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this._clientFacade.find({ id: input.clientId })
    if(!client) {
        throw new Error("Client not found");
    }
        
    return {
      id: "",
      invoiceId: "",
      products: [],
      status: "",
      total: 0
    }
  }

}