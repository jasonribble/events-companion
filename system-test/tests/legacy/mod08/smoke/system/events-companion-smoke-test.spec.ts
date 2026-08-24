import { test, forChannels, ChannelType } from '../fixtures.js';

forChannels(ChannelType.UI, ChannelType.API)(() => {
    test('shouldBeAbleToGoToEventsCompanion', async ({ scenario }) => {
        await scenario.assume().eventsCompanion().shouldBeRunning();
    });
});
