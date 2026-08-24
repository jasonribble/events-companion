import type { EventsCompanionDriver } from '../../../../../driver/port/events-companion-driver.js';
import { BaseUseCase } from '../../../shared/base-use-case.js';

export abstract class BaseEventsCompanionUseCase<TResponse, TVerification> extends BaseUseCase<
  EventsCompanionDriver,
  TResponse,
  TVerification
> {}
