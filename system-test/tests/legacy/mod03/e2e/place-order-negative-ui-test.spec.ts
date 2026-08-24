import { uiTest as test, expect } from './base/BaseE2eTest.js';

const TIMEOUT = 30_000;

test('shouldRejectOrderWithNonIntegerQuantity', async ({ config, eventsCompanionPage }) => {
    const eventsCompanionUiUrl = config.eventsCompanion.frontendUrl;

    // When: place order with invalid quantity via UI
    await eventsCompanionPage.goto(eventsCompanionUiUrl);
    await eventsCompanionPage.locator("a[href='/new-order']").click({ timeout: TIMEOUT });
    await eventsCompanionPage.locator('[aria-label="SKU"]').fill('SOME-SKU', { timeout: TIMEOUT });
    await eventsCompanionPage.locator('[aria-label="Quantity"]').fill('invalid-quantity', { timeout: TIMEOUT });
    await eventsCompanionPage.locator('[aria-label="Country"]').fill('US', { timeout: TIMEOUT });
    await eventsCompanionPage.locator('[aria-label="Place Order"]').click({ timeout: TIMEOUT });

    // Then: should see an error alert whose text contains the validation message,
    // the "quantity" field, and the integer constraint message (single text match,
    // matching Java/.NET test shape).
    const errorAlert = eventsCompanionPage.locator("[role='alert'][data-notification-id]");
    await errorAlert.waitFor({ state: 'visible', timeout: TIMEOUT });
    const errorText = (await errorAlert.textContent({ timeout: TIMEOUT })) ?? '';
    expect(errorText).toContain('The request contains one or more validation errors');
    expect(errorText).toContain('quantity');
    expect(errorText).toContain('Quantity must be an integer');
});
