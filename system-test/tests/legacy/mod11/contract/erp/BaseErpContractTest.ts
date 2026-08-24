import type { ContractTest } from '../base/BaseExternalSystemContractTest.js';

export function registerErpContractTests(test: ContractTest): void {
  test('shouldBeAbleToGetProduct', async ({ scenario }) => {
    await scenario
      .given()
      .product()
      .withSku('BOOK-123')
      .withUnitPrice(12)
      .then()
      .product('BOOK-123')
      .hasSku('BOOK-123')
      .hasPrice(12);
  });
}
