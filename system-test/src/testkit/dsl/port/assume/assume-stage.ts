import type { AssumeRunning } from './steps/assume-running.js';

export interface AssumeStage {
  eventsCompanion(): AssumeRunning;
  erp(): AssumeRunning;
  tax(): AssumeRunning;
  clock(): AssumeRunning;
}
