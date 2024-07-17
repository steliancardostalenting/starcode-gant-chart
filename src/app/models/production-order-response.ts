import { ProductionOrder } from './production-order';

export class ProductionOrderResponse {
  '@odata.context': string;
  value: ProductionOrder[];

  constructor(odataContext: string, value: ProductionOrder[]) {
    this['@odata.context'] = odataContext;
    this.value = value;
  }

  static fromJSON(json: any): ProductionOrderResponse {
    return new ProductionOrderResponse(json['@odata.context'], json.value);
  }
}
