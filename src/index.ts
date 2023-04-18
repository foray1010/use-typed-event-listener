import * as React from 'react'
import { useDeepCompareMemo } from 'use-deep-compare'

type Options = boolean | Readonly<AddEventListenerOptions> | undefined

function useEventListener<KD extends keyof DocumentEventMap>(
  element: Readonly<Document> | null | undefined,
  eventType: KD,
  // eslint-disable-next-line functional/prefer-immutable-types
  listener: (this: Document, evt: DocumentEventMap[KD]) => void,
  options?: Options,
): void
function useEventListener<KH extends keyof HTMLElementEventMap>(
  element: Readonly<HTMLElement> | null | undefined,
  eventType: KH,
  // eslint-disable-next-line functional/prefer-immutable-types
  listener: (this: HTMLElement, evt: HTMLElementEventMap[KH]) => void,
  options?: Options,
): void
function useEventListener<KW extends keyof WindowEventMap>(
  element: Readonly<Window> | null | undefined,
  eventType: KW,
  // eslint-disable-next-line functional/prefer-immutable-types
  listener: (this: Window, evt: WindowEventMap[KW]) => void,
  options?: Options,
): void
function useEventListener(
  element: Readonly<Document | HTMLElement | Window> | null | undefined,
  eventType: string,
  // eslint-disable-next-line functional/prefer-immutable-types
  listener: (evt: Event) => void,
  options?: Options,
): void

function useEventListener<
  KD extends keyof DocumentEventMap,
  KH extends keyof HTMLElementEventMap,
  KW extends keyof WindowEventMap,
>(
  element: Readonly<Document | HTMLElement | Window> | null | undefined,
  eventType: KD | KH | KW | string,
  listener: (
    /* eslint-disable functional/prefer-immutable-types */
    this: typeof element,
    evt:
      | DocumentEventMap[KD]
      | HTMLElementEventMap[KH]
      | WindowEventMap[KW]
      | Event,
    /* eslint-enable functional/prefer-immutable-types */
  ) => void,
  options?: Options,
): void {
  const listenerRef = React.useRef(listener)
  listenerRef.current = listener

  const memorizedOptions = useDeepCompareMemo(() => options, [options])

  React.useEffect(() => {
    if (!element) return

    // to avoid keep updating listener in DOM
    const wrappedListener: typeof listenerRef.current = (evt) =>
      listenerRef.current.call(element, evt)

    element.addEventListener(eventType, wrappedListener, memorizedOptions)

    return () => {
      element.removeEventListener(eventType, wrappedListener, memorizedOptions)
    }
  }, [element, eventType, memorizedOptions])
}

export default useEventListener
