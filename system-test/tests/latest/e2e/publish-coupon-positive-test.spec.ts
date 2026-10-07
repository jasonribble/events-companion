import { test, forChannels, ChannelType } from './base/fixtures.js';

forChannels(ChannelType.UI, ChannelType.API)(() => {
  test('shouldPublishCoupon', async ({ scenario }) => {
    await scenario
      .when()
      .publishCoupon()
      .withCouponCode('')
      .withDiscountRate(0.15)
      .then()
      .shouldSucceed();
  });
});
