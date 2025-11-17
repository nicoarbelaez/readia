export interface KeyboardEvent {
  key: string;
  altKey: boolean;
  target: EventTarget | null;
  preventDefault(): void;
}
