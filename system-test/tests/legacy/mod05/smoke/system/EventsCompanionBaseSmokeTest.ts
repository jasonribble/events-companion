import { expect, type TestType } from '@playwright/test';

// Playwright's TestType is invariant in its fixture shape, so we accept any test
// type and rely on the runtime destructuring of `eventsCompanionDriver` from fixtures.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function runEventsCompanionBaseSmokeTest(test: TestType<any, any>): void {
  test('shouldBeAbleToGoToEventsCompanion', async ({ eventsCompanionDriver }) => {
    const result = await eventsCompanionDriver.goToEventsCompanion({});
    expect(result.success).toBe(true);
  });
}
