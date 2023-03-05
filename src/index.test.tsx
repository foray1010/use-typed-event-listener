/* eslint-disable testing-library/prefer-user-event */

import { fireEvent, render, renderHook } from '@testing-library/react'
import * as React from 'react'

import useEventListener from './index.js'

describe('useEventListener', () => {
  it('should bind event listener and call with event', () => {
    const eventListener = jest.fn<void, [MouseEvent], void>()

    renderHook(() => {
      useEventListener(window, 'click', eventListener)
    })

    fireEvent.click(window)
    expect(eventListener).toHaveBeenCalledTimes(1)
    expect(eventListener).toHaveBeenCalledWith(expect.any(Event))
  })

  it('should create event listener with `options`', () => {
    const childEventListener = jest.fn<void, [MouseEvent], void>()
    const parentEventListener = jest
      .fn<void, [MouseEvent], void>()
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
    const eventListener = jest.fn<void, [MouseEvent], void>()

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
    const eventListener = jest.fn<void, [MouseEvent], void>()

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
    const eventListener = jest.fn<void, [MouseEvent], void>()

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
    const eventListener = jest.fn(function eventListener(this: unknown) {
      return this
    })

    renderHook(() => {
      useEventListener(window, 'click', eventListener)
    })

    fireEvent.click(window)
    expect(eventListener).toHaveReturnedWith(window)
  })

  it('should update event listener without re-binding', () => {
    const firstEventListener = jest.fn<void, [MouseEvent], void>()
    const secondEventListener = jest.fn<void, [MouseEvent], void>()

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
    const eventListener = jest.fn<void, [MouseEvent], void>()

    renderHook(() => {
      useEventListener(window, 'click', eventListener)
    })

    fireEvent.click(window)
    expect(eventListener).toHaveBeenCalledTimes(1)
  })

  it('should work with document element', () => {
    const eventListener = jest.fn<void, [MouseEvent], void>()

    renderHook(() => {
      useEventListener(document, 'click', eventListener)
    })

    fireEvent.click(document)
    expect(eventListener).toHaveBeenCalledTimes(1)
  })

  it('should work with html element', () => {
    const eventListener = jest.fn<void, [MouseEvent], void>()

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

    const eventListener = jest.fn<void, [MouseEvent], void>()
    // should works with unassigned ref
    const { rerender } = renderHook(() => {
      useEventListener(ref.current, 'click', eventListener)
    })

    render(<div ref={ref} />)
    if (!ref.current) {
      throw new TypeError('ref.current should be assigned')
    }

    // should not fire event handler because ref is unassigned until after rerender
    fireEvent.click(ref.current)
    expect(eventListener).toHaveBeenCalledTimes(0)

    rerender()

    fireEvent.click(ref.current)
    expect(eventListener).toHaveBeenCalledTimes(1)
  })

  it('should pass if element is null', () => {
    expect(() => {
      renderHook(() => {
        useEventListener(null, 'click', () => {})
      })
    }).not.toThrow()
  })

  it('should pass if element is undefined', () => {
    expect(() => {
      renderHook(() => {
        useEventListener(undefined, 'click', () => {})
      })
    }).not.toThrow()
  })
})
