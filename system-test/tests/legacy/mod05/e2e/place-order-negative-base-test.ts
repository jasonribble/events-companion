import { expect, type TestType } from '@playwright/test';
import { assertThatResult } from '../../../../src/testkit/common/result-assert.js';
import type { EventsCompanionDriver } from '../../../../src/testkit/driver/port/events-companion-driver.js';

export function runPlaceOrderNegative<TTestArgs extends { eventsCompanionDriver: EventsCompanionDriver }, TWorkerArgs extends object>(
  test: TestType<TTestArgs, TWorkerArgs>,
): void {
  test('shouldRejectOrderWithNonIntegerQuantity', async ({ eventsCompanionDriver }) => {
    const result = await eventsCompanionDriver.placeOrder({ sku: 'SOME-SKU', quantity: '3.5', country: 'US' });

    expect(result.success).toBe(false);
    const error = assertThatResult(result).getError();
    expect(error.message).toContain('The request contains one or more validation errors');
    const quantityError = error.fieldErrors.find((e: { field: string; message: string }) => e.field === 'quantity');
    expect(quantityError?.message).toBe('Quantity must be an integer');
  });
}
