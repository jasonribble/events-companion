import { ChannelType } from '../../../channel/channel-type.js';
import { EventsCompanionDriver } from '../../../driver/port/events-companion-driver.js';
import { ErpDriver } from '../../../driver/port/external/erp/erp-driver.js';
import { ClockDriver } from '../../../driver/port/external/clock/clock-driver.js';
import { TaxDriver } from '../../../driver/port/external/tax/tax-driver.js';

export type ChannelMode = 'dynamic' | 'static';

const STATIC_CHANNEL = ChannelType.API;

export class AppContext {
  private readonly shops = new Map<string, EventsCompanionDriver>();
  private readonly channelMode: ChannelMode;
  private readonly channel: string;
  private readonly eventsCompanionDriverFactory: (channel: string) => EventsCompanionDriver;
  readonly erpDriver: ErpDriver;
  readonly clockDriver: ClockDriver;
  readonly taxDriver: TaxDriver;

  constructor(opts: {
    channelMode: ChannelMode;
    channel: string;
    eventsCompanionDriverFactory: (channel: string) => EventsCompanionDriver;
    erpDriver: ErpDriver;
    clockDriver: ClockDriver;
    taxDriver: TaxDriver;
  }) {
    this.channelMode = opts.channelMode;
    this.channel = opts.channel;
    this.eventsCompanionDriverFactory = opts.eventsCompanionDriverFactory;
    this.erpDriver = opts.erpDriver;
    this.clockDriver = opts.clockDriver;
    this.taxDriver = opts.taxDriver;
  }

  eventsCompanion(mode?: ChannelMode): EventsCompanionDriver {
    const resolvedMode = mode ?? this.channelMode;
    const channel = resolvedMode === 'static' ? STATIC_CHANNEL : this.channel;
    if (!this.shops.has(channel)) {
      this.shops.set(channel, this.eventsCompanionDriverFactory(channel));
    }
    return this.shops.get(channel)!;
  }

  async closeAll(): Promise<void> {
    for (const driver of this.shops.values()) {
      await driver.close();
    }
    await this.erpDriver.close();
    await this.clockDriver.close();
    await this.taxDriver.close();
  }
}
