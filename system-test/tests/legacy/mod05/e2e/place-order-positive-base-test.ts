import { expect, type TestType } from '@playwright/test';
import { randomUUID } from 'node:crypto';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function runPlaceOrderPositive(test: TestType<any, any>): void {
  test('shouldPlaceOrderForValidInput', async ({ eventsCompanionDriver, erpDriver }) => {
    const sku = `SKU-${randomUUID().substring(0, 8)}`;

    const productResult = await erpDriver.returnsProduct({ sku, price: '20.00' });
    expect(productResult.success).toBe(true);

    const result = await eventsCompanionDriver.placeOrder({ sku, quantity: '5', country: 'US' });

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
}
