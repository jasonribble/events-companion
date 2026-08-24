import type { EventsCompanionDriver } from '../../../../driver/port/events-companion-driver.js';
import type { GoToEventsCompanionResponse } from '../../../../driver/port/dtos/GoToEventsCompanionResponse.js';
import { UseCaseResult } from '../../shared/use-case-result.js';
import { VoidVerification } from '../../shared/void-verification.js';
import type { UseCaseContext } from '../../shared/use-case-context.js';
import { BaseEventsCompanionUseCase } from './base/BaseEventsCompanionUseCase.js';

export class GoToEventsCompanion extends BaseEventsCompanionUseCase<GoToEventsCompanionResponse, VoidVerification> {
  constructor(driver: EventsCompanionDriver, context: UseCaseContext) {
    super(driver, context);
  }

  async execute(): Promise<UseCaseResult<GoToEventsCompanionResponse, VoidVerification>> {
    const result = await this.driver.goToEventsCompanion({});

    return new UseCaseResult(
      result,
      this.context,
      (_, ctx) => new VoidVerification(undefined, ctx),
    );
  }
}
