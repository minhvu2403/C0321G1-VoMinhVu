import {AttachService} from "./attach-service";

export interface ContractDetail {
  id: number;
  contractId: number;
  quantity: number;
  attachService: AttachService;
}
