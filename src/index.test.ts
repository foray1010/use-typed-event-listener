import {fireEvent} from '@testing-library/react'
import {renderHook} from 'react-hooks-testing-library'

import useEventListener from '.'

describe('useEventListener', () => {
  it('should bind and unbind event listener', () => {
    const eventListener = jest.fn<void, [MouseEvent]>()

    const {unmount} = renderHook(() => {
      useEventListener(window, 'click', eventListener)
    })

    fireEvent.click(window)
    expect(eventListener).toHaveBeenCalledTimes(1)

    unmount()

    fireEvent.click(window)
    expect(eventListener).toHaveBeenCalledTimes(1)
  })

  it('should update event listener', () => {
    let count = 0

    const firstEventListener = jest.fn<void, [MouseEvent]>()
    const secondEventListener = jest.fn<void, [MouseEvent]>()

    const {rerender} = renderHook(() => {
      count += 1
      const eventListener = count === 1 ? firstEventListener : secondEventListener

      useEventListener(window, 'click', eventListener)
    })

    fireEvent.click(window)
    rerender()
    fireEvent.click(window)

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

    // `as any` as `fireEvent.click` doesn't accept `document`
    fireEvent.click(document as any)
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

  it('should pass if element is undefined', () => {
    const {result} = renderHook(() => {
      useEventListener(undefined, 'click', () => {})
    })

    expect(result.error).toBe(undefined)
  })
})
