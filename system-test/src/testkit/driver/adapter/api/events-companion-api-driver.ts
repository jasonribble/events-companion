import type { Result } from '../../../common/result.js';
import { success, failure } from '../../../common/result.js';
import type { GoToEventsCompanionRequest } from '../../port/dtos/GoToEventsCompanionRequest.js';
import type { GoToEventsCompanionResponse } from '../../port/dtos/GoToEventsCompanionResponse.js';
import type { PlaceOrderRequest } from '../../port/dtos/PlaceOrderRequest.js';
import type { PlaceOrderResponse } from '../../port/dtos/PlaceOrderResponse.js';
import type { CancelOrderRequest } from '../../port/dtos/CancelOrderRequest.js';
import type { CancelOrderResponse } from '../../port/dtos/CancelOrderResponse.js';
import type { DeliverOrderRequest } from '../../port/dtos/DeliverOrderRequest.js';
import type { DeliverOrderResponse } from '../../port/dtos/DeliverOrderResponse.js';
import type { ViewOrderRequest } from '../../port/dtos/ViewOrderRequest.js';
import type { ViewOrderResponse } from '../../port/dtos/ViewOrderResponse.js';
import type { SystemError } from '../../port/dtos/errors/SystemError.js';
import type { PublishCouponRequest } from '../../port/dtos/PublishCouponRequest.js';
import type { PublishCouponResponse } from '../../port/dtos/PublishCouponResponse.js';
import type { BrowseCouponsRequest } from '../../port/dtos/BrowseCouponsRequest.js';
import type { BrowseCouponsResponse } from '../../port/dtos/BrowseCouponsResponse.js';
import type { EventsCompanionDriver } from '../../port/events-companion-driver.js';
import { EventsCompanionApiClient } from './client/EventsCompanionApiClient.js';

export class EventsCompanionApiDriver implements EventsCompanionDriver {
  private readonly client: EventsCompanionApiClient;

  constructor(baseUrl: string) {
    this.client = new EventsCompanionApiClient(baseUrl);
  }

  async goToEventsCompanion(_request: GoToEventsCompanionRequest): Promise<Result<GoToEventsCompanionResponse, SystemError>> {
    const result = await this.client.health().checkHealth();
    if (result.success) return success({});
    return failure(result.error);
  }

  async placeOrder(request: PlaceOrderRequest): Promise<Result<PlaceOrderResponse, SystemError>> {
    return this.client.orders().placeOrder(request);
  }

  async cancelOrder(request: CancelOrderRequest): Promise<Result<CancelOrderResponse, SystemError>> {
    const result = await this.client.orders().cancelOrder(request.orderNumber);
    if (result.success) return success({});
    return failure(result.error);
  }

  async deliverOrder(request: DeliverOrderRequest): Promise<Result<DeliverOrderResponse, SystemError>> {
    const result = await this.client.orders().deliverOrder(request.orderNumber);
    if (result.success) return success({});
    return failure(result.error);
  }

  async viewOrder(request: ViewOrderRequest): Promise<Result<ViewOrderResponse, SystemError>> {
    return this.client.orders().viewOrder(request.orderNumber);
  }

  async publishCoupon(request: PublishCouponRequest): Promise<Result<PublishCouponResponse, SystemError>> {
    const result = await this.client.coupons().publishCoupon(request);
    if (result.success) return success({});
    return failure(result.error);
  }

  async browseCoupons(_request: BrowseCouponsRequest): Promise<Result<BrowseCouponsResponse, SystemError>> {
    return this.client.coupons().browseCoupons();
  }

  async close(): Promise<void> {
    // No resources to release: the API client uses fetch per-call.
  }
}
