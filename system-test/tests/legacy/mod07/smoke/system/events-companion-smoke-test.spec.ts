import { test, forChannels, ChannelType } from '../fixtures.js';

forChannels(ChannelType.UI, ChannelType.API)(() => {
    test('shouldBeAbleToGoToEventsCompanion', async ({ app }) => {
        (await app.eventsCompanion().goToEventsCompanion().execute()).shouldSucceed();
    });
});
