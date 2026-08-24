export interface AsyncCloseable {
  close(): Promise<void>;
}
