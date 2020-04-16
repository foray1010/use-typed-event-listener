# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/foray1010/use-typed-event-listener/compare/v1.3.1...v2.0.0) (2020-04-16)

### ⚠ BREAKING CHANGES

- drop nodejs < 10.13

### Bug Fixes

- **typescript:** does not provide correct type to work with react ref ([77d177c](https://github.com/foray1010/use-typed-event-listener/commit/77d177c21057d763514680a00f1f7e3a66aa6728))

* require nodejs 10 ([30d9bf5](https://github.com/foray1010/use-typed-event-listener/commit/30d9bf5c99057a795885179cff4df14632016617))

### [1.3.1](https://github.com/foray1010/use-typed-event-listener/compare/v1.3.0...v1.3.1) (2019-06-05)

### Bug Fixes

- enable tree shaking for package `fast-equals` ([#5](https://github.com/foray1010/use-typed-event-listener/issues/5)) ([1ac8ef4](https://github.com/foray1010/use-typed-event-listener/commit/1ac8ef4))

## [1.3.0](https://github.com/foray1010/use-typed-event-listener/compare/v1.2.0...v1.3.0) (2019-06-04)

### Features

- output esm build ([16323ea](https://github.com/foray1010/use-typed-event-listener/commit/16323ea))

## [1.2.0](https://github.com/foray1010/use-typed-event-listener/compare/v1.1.1...v1.2.0) (2019-06-04)

### Features

- accept `useCapture` or `options` as 4th argument ([#4](https://github.com/foray1010/use-typed-event-listener/issues/4)) ([043511b](https://github.com/foray1010/use-typed-event-listener/commit/043511b))

### Tests

- should bind event listener and call with event ([bf593d7](https://github.com/foray1010/use-typed-event-listener/commit/bf593d7))

### [1.1.1](https://github.com/foray1010/use-typed-event-listener/compare/v1.1.0...v1.1.1) (2019-06-01)

### Bug Fixes

- add license in package.json ([5e4f06b](https://github.com/foray1010/use-typed-event-listener/commit/5e4f06b))

## [1.1.0](https://github.com/foray1010/use-typed-event-listener/compare/v1.0.0...v1.1.0) (2019-06-01)

### Bug Fixes

- include LICENSE in release ([b63b5e8](https://github.com/foray1010/use-typed-event-listener/commit/b63b5e8))

### Features

- bind `this` in event listener ([6fcd560](https://github.com/foray1010/use-typed-event-listener/commit/6fcd560))

## 1.0.0 (2019-05-31)

### Bug Fixes

- include fallback event in typings ([8c4c551](https://github.com/foray1010/use-typed-event-listener/commit/8c4c551))

### Features

- add useEventListener function ([205af61](https://github.com/foray1010/use-typed-event-listener/commit/205af61))
- avoid keep updating listener in DOM ([cb6ca49](https://github.com/foray1010/use-typed-event-listener/commit/cb6ca49))

### Tests

- add tests for useEventListener ([0a3938b](https://github.com/foray1010/use-typed-event-listener/commit/0a3938b))
- should update event listener without re-binding ([1b412e8](https://github.com/foray1010/use-typed-event-listener/commit/1b412e8))
