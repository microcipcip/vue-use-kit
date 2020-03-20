export declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback)
  disconnect: () => void
  observe: (target: Element, options?: ResizeObserverObserveOptions) => void
  unobserve: (target: Element) => void
}

export interface ResizeObserverEntry {
  readonly borderBoxSize: ResizeObserverEntryBoxSize
  readonly contentBoxSize: ResizeObserverEntryBoxSize
  readonly contentRect: DOMRectReadOnly
  readonly target: Element
}

export interface ResizeObserverObserveOptions {
  box?: 'content-box' | 'border-box'
}

export type ResizeObserverCallback = (
  entries: ResizeObserverEntry[],
  observer: ResizeObserver
) => void

export interface ResizeObserverEntryBoxSize {
  blockSize: number
  inlineSize: number
}
