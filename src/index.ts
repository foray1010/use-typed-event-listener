import * as React from 'react'

function useEventListener<KD extends keyof DocumentEventMap>(
  element: Document | void,
  eventType: KD,
  listener: (this: Document, evt: DocumentEventMap[KD]) => void
): void
function useEventListener<KH extends keyof HTMLElementEventMap>(
  element: HTMLElement | void,
  eventType: KH,
  listener: (this: HTMLElement, evt: HTMLElementEventMap[KH]) => void
): void
function useEventListener<KW extends keyof WindowEventMap>(
  element: Window | void,
  eventType: KW,
  listener: (this: Window, evt: WindowEventMap[KW]) => void
): void
function useEventListener(
  element: Document | HTMLElement | Window | void,
  eventType: string,
  listener: (evt: Event) => void
): void

function useEventListener<
  KD extends keyof DocumentEventMap,
  KH extends keyof HTMLElementEventMap,
  KW extends keyof WindowEventMap
>(
  element: Document | HTMLElement | Window | void,
  eventType: KD | KH | KW | string,
  listener: (
    this: typeof element,
    evt: DocumentEventMap[KD] | HTMLElementEventMap[KH] | WindowEventMap[KW] | Event
  ) => void
): void {
  const listenerRef = React.useRef(listener)
  listenerRef.current = listener

  React.useEffect(() => {
    if (!element) return undefined

    // to avoid keep updating listener in DOM
    const wrappedListener: typeof listenerRef.current = (evt) =>
      listenerRef.current.call(element, evt)

    element.addEventListener(eventType, wrappedListener)

    return () => {
      element.removeEventListener(eventType, wrappedListener)
    }
  }, [element, eventType])
}

export default useEventListener
