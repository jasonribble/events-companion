import type { AppContext, ChannelMode } from '../scenario/app-context.js';
import { UseCaseContext, type ExternalSystemMode } from '../shared/use-case-context.js';
import { EventsCompanionDsl } from './EventsCompanionDsl.js';
import { ClockDsl } from './external/clock/ClockDsl.js';
import { ErpDsl } from './external/erp/ErpDsl.js';
import { TaxDsl } from './external/tax/TaxDsl.js';

function resolveExternalSystemMode(): ExternalSystemMode {
  return (process.env.EXTERNAL_SYSTEM_MODE as ExternalSystemMode) ?? 'real';
}

export class UseCaseDsl {
  private readonly useCaseContext: UseCaseContext;
  private _eventsCompanionDsl?: EventsCompanionDsl;
  private _clockDsl?: ClockDsl;
  private _erpDsl?: ErpDsl;
  private _taxDsl?: TaxDsl;

  constructor(private readonly app: AppContext) {
    this.useCaseContext = new UseCaseContext(resolveExternalSystemMode());
  }

  eventsCompanion(mode?: ChannelMode): EventsCompanionDsl {
    if (mode) {
      this._eventsCompanionDsl = new EventsCompanionDsl(this.app.eventsCompanion(mode), this.useCaseContext);
    } else {
      this._eventsCompanionDsl ??= new EventsCompanionDsl(this.app.eventsCompanion(mode), this.useCaseContext);
    }
    return this._eventsCompanionDsl;
  }

  clock(): ClockDsl {
    this._clockDsl ??= new ClockDsl(this.app.clockDriver, this.useCaseContext);
    return this._clockDsl;
  }

  erp(): ErpDsl {
    this._erpDsl ??= new ErpDsl(this.app.erpDriver, this.useCaseContext);
    return this._erpDsl;
  }

  tax(): TaxDsl {
    this._taxDsl ??= new TaxDsl(this.app.taxDriver, this.useCaseContext);
    return this._taxDsl;
  }

  async close(): Promise<void> {
    await this.app.closeAll();
  }
}
