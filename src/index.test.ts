import { fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import * as React from 'react'

import useEventListener from '.'

describe('useEventListener', () => {
  it('should bind event listener and call with event', () => {
    const eventListener = jest.fn<void, [MouseEvent]>()

    renderHook(() => {
      useEventListener(window, 'click', eventListener)
    })

    fireEvent.click(window)
    expect(eventListener).toHaveBeenCalledTimes(1)
    expect(eventListener).toHaveBeenCalledWith(expect.any(Event))
  })

  it('should create event listener with `options`', () => {
    const childEventListener = jest.fn<void, [MouseEvent]>()
    const parentEventListener = jest
      .fn<void, [MouseEvent]>()
      .mockImplementation((evt) => {
        evt.stopPropagation()
      })

    const childElement = document.createElement('div')
    const parentElement = document.createElement('div')
    parentElement.appendChild(childElement)

    renderHook(() => {
      useEventListener(childElement, 'click', childEventListener)
      useEventListener(parentElement, 'click', parentEventListener, true)
    })

    fireEvent.click(childElement)
    expect(childEventListener).toHaveBeenCalledTimes(0)
    expect(parentEventListener).toHaveBeenCalledTimes(1)
  })

  it('should not re-bind event listener when `options` is the same', () => {
    const eventListener = jest.fn<void, [MouseEvent]>()

    const dummyElement = document.createElement('div')
    jest.spyOn(dummyElement, 'addEventListener')

    const { rerender } = renderHook(() => {
      useEventListener(dummyElement, 'click', eventListener, {
        capture: true,
      })
    })

    rerender()

    expect(dummyElement.addEventListener).toHaveBeenCalledTimes(1)
  })

  it('should re-bind event listener when `options` is not the same', () => {
    const eventListener = jest.fn<void, [MouseEvent]>()

    const dummyElement = document.createElement('div')
    jest.spyOn(dummyElement, 'addEventListener')

    let count = 0
    const { rerender } = renderHook(() => {
      count += 1
      const capture = count === 1

      useEventListener(dummyElement, 'click', eventListener, {
        capture,
      })
    })

    rerender()

    expect(dummyElement.addEventListener).toHaveBeenCalledTimes(2)
  })

  it('should unbind event listener', () => {
    const eventListener = jest.fn<void, [MouseEvent]>()

    const { unmount } = renderHook(() => {
      useEventListener(window, 'click', eventListener)
    })

    fireEvent.click(window)
    expect(eventListener).toHaveBeenCalledTimes(1)

    unmount()

    fireEvent.click(window)
    expect(eventListener).toHaveBeenCalledTimes(1)
  })

  it('should bind `this` to listener', () => {
    const obj = {
      eventListener() {
        return this
      },
    }
    jest.spyOn(obj, 'eventListener')

    renderHook(() => {
      useEventListener(window, 'click', obj.eventListener)
    })

    fireEvent.click(window)
    expect(obj.eventListener).toHaveReturnedWith(window)
  })

  it('should update event listener without re-binding', () => {
    const firstEventListener = jest.fn<void, [MouseEvent]>()
    const secondEventListener = jest.fn<void, [MouseEvent]>()

    const dummyElement = document.createElement('div')
    jest.spyOn(dummyElement, 'addEventListener')

    let count = 0
    const { rerender } = renderHook(() => {
      count += 1
      const eventListener =
        count === 1 ? firstEventListener : secondEventListener

      useEventListener(dummyElement, 'click', eventListener)
    })

    fireEvent.click(dummyElement)
    rerender()
    fireEvent.click(dummyElement)

    expect(dummyElement.addEventListener).toHaveBeenCalledTimes(1)
    expect(firstEventListener).toHaveBeenCalledTimes(1)
    expect(secondEventListener).toHaveBeenCalledTimes(1)
  })

  it('should work with window element', () => {
    const eventListener = jest.fn<void, [MouseEvent]>()

    renderHook(() => {
      useEventListener(window, 'click', eventListener)
    })

    fireEvent.click(window)
    expect(eventListener).toHaveBeenCalledTimes(1)
  })

  it('should work with document element', () => {
    const eventListener = jest.fn<void, [MouseEvent]>()

    renderHook(() => {
      useEventListener(document, 'click', eventListener)
    })

    fireEvent.click(document)
    expect(eventListener).toHaveBeenCalledTimes(1)
  })

  it('should work with html element', () => {
    const eventListener = jest.fn<void, [MouseEvent]>()

    renderHook(() => {
      useEventListener(document.body, 'click', eventListener)
    })

    fireEvent.click(document.body)
    expect(eventListener).toHaveBeenCalledTimes(1)
  })

  it('should support react ref', () => {
    const { result: refResult } = renderHook(() =>
      React.useRef<HTMLDivElement>(null),
    )
    const ref = refResult.current

    const { result } = renderHook(() => {
      useEventListener(ref.current, 'click', () => {})
    })

    expect(result.error).toBe(undefined)
  })

  it('should pass if element is null', () => {
    const { result } = renderHook(() => {
      useEventListener(null, 'click', () => {})
    })

    expect(result.error).toBe(undefined)
  })

  it('should pass if element is undefined', () => {
    const { result } = renderHook(() => {
      useEventListener(undefined, 'click', () => {})
    })

    expect(result.error).toBe(undefined)
  })
})
