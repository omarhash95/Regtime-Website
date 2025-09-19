declare module 'tinykeys' {
  export type KeyBindingHandler = (event: KeyboardEvent) => void;

  export interface Options {
    /** Which keyboard event to listen on. Defaults to 'keydown'. */
    event?: 'keydown' | 'keyup';
  }

  export type KeyBindingMap = Record<string, KeyBindingHandler>;

  /** Attaches keybindings; returns an unsubscribe function. */
  export function tinykeys(
    target: Window | Document | HTMLElement,
    bindings: KeyBindingMap,
    options?: Options
  ): () => void;
}