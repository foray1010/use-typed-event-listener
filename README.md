# use-typed-event-listener

[![Build Status](https://img.shields.io/circleci/project/foray1010/use-typed-event-listener/master.svg)](https://circleci.com/gh/foray1010/use-typed-event-listener/tree/master)
[![codecov.io](https://img.shields.io/codecov/c/github/foray1010/use-typed-event-listener.svg)](https://codecov.io/gh/foray1010/use-typed-event-listener)

[![node](https://img.shields.io/node/v/use-typed-event-listener.svg)](https://www.npmjs.com/package/use-typed-event-listener)
[![npm](https://img.shields.io/npm/dm/use-typed-event-listener.svg)](https://www.npmjs.com/package/use-typed-event-listener)
[![npm](https://img.shields.io/npm/l/use-typed-event-listener.svg)](https://www.npmjs.com/package/use-typed-event-listener)

`use-typed-event-listener` is a React Hook for DOM event listeners with TypeScript supported

With TypeScript helps, this package can detect which event type the element supports, and **automatically cast a correct typing for event**

## Installation

```sh
npm install use-typed-event-listener
# or
yarn add use-typed-event-listener
```

## Development Setup

We are using [corepack](https://nodejs.org/api/corepack.html) to manage the `yarn` version

```bash
corepack enable
```

## Interface

```js
useEventListener(element, eventType, listener[, options])
```

- `element` can be `window`, `document` or any `HTMLElement`. If it is `undefined`, no event will not be bound

- `eventType` is a case-sensitive string representing the [event type](https://developer.mozilla.org/en-US/docs/Web/Events) to listen for

- `listener` is the callback function when an event of `eventType` occurs

- `options` _(optional)_ see <https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters>

## Usage

- `listener` typings will be automatically casted based on `element` and `eventType`

  ```tsx
  import useEventListener from 'use-typed-event-listener'

  export default (props: Props) => {
    // typings for `event` will be `MouseEvent` as this package recognizes the `click` event type
    useEventListener(window, 'click', (event) => {
      console.log(event.buttons)
    })

    return <SomeComponent />
  }
  ```

- No need to avoid passing new reference to `listener` or `options`, they are memorized and will not trigger the hook again

  ```tsx
  import useEventListener from 'use-typed-event-listener'

  export default (props: Props) => {
    // this hook will only run once
    useEventListener(window, 'click', (event) => {}, {
      capture: true,
    })

    return <SomeComponent />
  }
  ```

- Prevent casting `eventType` as `string`

  ```tsx
  import useEventListener from 'use-typed-event-listener'

  export default (props: Props) => {
    const eventType: string = 'click'

    useEventListener(window, eventType, (event) => {
      // as `eventType` is a wild card string, `event` will fallback to general `Event` type
      // this line will throw `Property 'buttons' does not exist on type 'Event'.ts(2339)`
      console.log(event.buttons)
    })

    return <SomeComponent />
  }
  ```

- Checks if element support this event type

  ```tsx
  import useEventListener from 'use-typed-event-listener'

  export default (props: Props) => {
    // this pass as HTMLElement supports copy event
    useEventListener(document.body, 'copy', (event) => {
      console.log(event.clipboardData)
    })

    // as Window doesn't support copy event
    useEventListener(window, 'copy', (event) => {
      // this throws `Property 'clipboardData' does not exist on type 'Event'.ts(2339)`
      console.log(event.clipboardData)
    })

    return <SomeComponent />
  }
  ```
