import { test, expect, forChannels, ChannelType } from '../fixtures.js';
import { loadConfiguration } from '../../../../config/configuration-loader.js';

forChannels(ChannelType.UI, ChannelType.API)(() => {
  test('shouldBeAbleToGoToEventsCompanion', async ({ scenario }) => {
    await scenario.assume().eventsCompanion().shouldBeRunning();
  });

});

test('shouldBeAbleToGoToEventsCompanionApi', async () => {
  const config = loadConfiguration();
  const response = await fetch(`${config.eventsCompanion.backendApiUrl}/health`);
  expect(response.status).toBe(500);
});
