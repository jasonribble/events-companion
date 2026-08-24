export interface PublishCouponRequest {
  code: string;
  discountRate: string;
  validFrom?: string;
  validTo?: string;
  usageLimit?: string;
}
