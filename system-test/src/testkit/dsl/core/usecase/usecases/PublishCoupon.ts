import type { EventsCompanionDriver } from '../../../../driver/port/events-companion-driver.js';
import type { PublishCouponRequest } from '../../../../driver/port/dtos/PublishCouponRequest.js';
import type { PublishCouponResponse } from '../../../../driver/port/dtos/PublishCouponResponse.js';
import { UseCaseResult } from '../../shared/use-case-result.js';
import { VoidVerification } from '../../shared/void-verification.js';
import type { UseCaseContext } from '../../shared/use-case-context.js';
import { BaseEventsCompanionUseCase } from './base/BaseEventsCompanionUseCase.js';

export class PublishCoupon extends BaseEventsCompanionUseCase<PublishCouponResponse, VoidVerification> {
  private _couponCodeParamAlias?: string;
  private _discountRate: number | string = '';
  private _validFrom?: string;
  private _validTo?: string;
  private _usageLimit?: number | string;

  constructor(driver: EventsCompanionDriver, context: UseCaseContext) {
    super(driver, context);
  }

  couponCode(couponCodeParamAlias: string): this {
    this._couponCodeParamAlias = couponCodeParamAlias;
    return this;
  }

  discountRate(discountRate: number | string): this {
    this._discountRate = discountRate;
    return this;
  }

  validFrom(validFrom: string): this {
    this._validFrom = validFrom;
    return this;
  }

  validTo(validTo: string): this {
    this._validTo = validTo;
    return this;
  }

  usageLimit(usageLimit: number | string): this {
    this._usageLimit = usageLimit;
    return this;
  }

  async execute(): Promise<UseCaseResult<PublishCouponResponse, VoidVerification>> {
    const couponCode = this.context.getParamValue(this._couponCodeParamAlias);

    const request: PublishCouponRequest = {
      code: couponCode ?? '',
      discountRate: String(this._discountRate),
      validFrom: this._validFrom,
      validTo: this._validTo,
      usageLimit: this._usageLimit === undefined ? undefined : String(this._usageLimit),
    };

    const result = await this.driver.publishCoupon(request);

    return new UseCaseResult(
      result,
      this.context,
      (_, ctx) => new VoidVerification(undefined, ctx),
    );
  }
}
