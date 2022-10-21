# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.0.0](https://github.com/foray1010/use-typed-event-listener/compare/v3.0.0...v4.0.0) (2022-10-21)

### ⚠ BREAKING CHANGES

- drop node.js v12 and v17
- only support node ^12.22.0 || ^14.17.0 || >=16.13.0
- drop node 10
- require react >=16.14.0 and typescript >=4.1.2

### Bug Fixes

- export valid es modules files ([f5fad3a](https://github.com/foray1010/use-typed-event-listener/commit/f5fad3a27b70107e08b7f03cc60df3ac1eee0cd9))
- make typescript as optional peer dependency ([feff3eb](https://github.com/foray1010/use-typed-event-listener/commit/feff3eb62bc82689932bb082256bd42bc17a7915))

- bump node version requirement ([7774dc8](https://github.com/foray1010/use-typed-event-listener/commit/7774dc883eb61fb58341f0fe2b38553c98b3e8bd))
- drop node 10 ([0f7b3f4](https://github.com/foray1010/use-typed-event-listener/commit/0f7b3f45661c2c57dfefe885ad703a0c74339513))
- drop node.js v12 and v17 ([da930ed](https://github.com/foray1010/use-typed-event-listener/commit/da930ed4ba8a69787d8cf9fc519657f2a8fc58de))
- use react jsx-runtime ([d721958](https://github.com/foray1010/use-typed-event-listener/commit/d7219586415bded931fdb5d0d845106d4e8d87c0))

## [3.0.0](https://github.com/foray1010/use-typed-event-listener/compare/v2.0.2...v3.0.0) (2020-08-03)

### ⚠ BREAKING CHANGES

- move default export in commonjs build to the .default property

### Features

- move default export in commonjs build to the .default property ([72820c1](https://github.com/foray1010/use-typed-event-listener/commit/72820c11ac251f5dad4cacafb8a0b12df4f55d92))

### [2.0.2](https://github.com/foray1010/use-typed-event-listener/compare/v2.0.1...v2.0.2) (2020-06-26)

### Bug Fixes

- allow undefined element ([81ba810](https://github.com/foray1010/use-typed-event-listener/commit/81ba810da7d2020d58a180cd0ef77b84ee4fb9e7))

### [2.0.1](https://github.com/foray1010/use-typed-event-listener/compare/v2.0.0...v2.0.1) (2020-05-21)

### Bug Fixes

- lower bundle size by using @babel/runtime ([799389e](https://github.com/foray1010/use-typed-event-listener/commit/799389ee6cac419a206c2d7cf6b0e6aac08bc084))

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
