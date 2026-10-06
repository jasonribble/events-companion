import { test, forChannels, ChannelType, expect } from './base/fixtures.js';

forChannels(ChannelType.UI, ChannelType.API)(() => {
  test('shouldPlaceOrder', async () => {
    // await scenario.when().placeOrder().then().shouldSucceed();
    expect(true).toBeFalsy();
  });
});
