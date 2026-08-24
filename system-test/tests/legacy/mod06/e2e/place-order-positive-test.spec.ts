import { test, expect, forChannels, ChannelType } from './base/BaseE2eTest.js';
import { randomUUID } from 'node:crypto';

forChannels(ChannelType.UI, ChannelType.API)(() => {
    test('shouldPlaceOrderForValidInput', async ({ eventsCompanionDriver, erpDriver }) => {
        const sku = `SKU-${randomUUID().substring(0, 8)}`;

        // Given
        const productResult = await erpDriver.returnsProduct({ sku, price: '20.00' });
        expect(productResult.success).toBe(true);

        // When
        const result = await eventsCompanionDriver.placeOrder({ sku, quantity: '5', country: 'US' });

        // Then
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.value.orderNumber).toMatch(/^ORD-/);

            const viewResult = await eventsCompanionDriver.viewOrder({ orderNumber: result.value.orderNumber });
            expect(viewResult.success).toBe(true);
            if (viewResult.success) {
                expect(viewResult.value.sku).toBe(sku);
                expect(viewResult.value.quantity).toBe(5);
                expect(viewResult.value.unitPrice).toBe(20);
                expect(viewResult.value.status).toBe('PLACED');
                expect(viewResult.value.totalPrice).toBeGreaterThan(0);
            }
        }
    });
});
