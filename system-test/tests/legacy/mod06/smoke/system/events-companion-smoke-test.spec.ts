import { test, expect, forChannels, ChannelType } from '../fixtures.js';

forChannels(ChannelType.UI, ChannelType.API)(() => {
    test('shouldBeAbleToGoToEventsCompanion', async ({ eventsCompanionDriver }) => {
        const result = await eventsCompanionDriver.goToEventsCompanion({});
        expect(result.success).toBe(true);
    });
});
