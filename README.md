# boxed-injector-react

[![NPM version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![dependencies Status][daviddm-image]][daviddm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

> Dependency Injection Tools for React Applications

## Installation

```sh
$ npm install --save boxed-injector-react
```

## Overview

This is a set of helper components for leveraging the [boxed-injector](https://github.com/giddyinc/boxed-injector) within a [React](https://github.com/facebook/react) application.

The use case for this is to pull business logic out of your components into separate testable services, and inject them into your components as props so that you can use them in multiple places. Leveraging a DI container enables automatic dependency resolution greatly simplifying application bootstrapping while making your code more declarative.

There are 2 main components.

1. [Inject](lib/Inject/README.md) (Higher Order Component for resolving dependencies declaratively into React containers) - [See detailed readme](lib/Inject/README.md)
2. [Injectable](lib/Injectable/README.md) (Wrapper around React Components for directly injecting resolved props) - [See detailed readme](lib/Injectable/README.md)


## Installation 

```sh
$ npm install --save boxed-injector-react
```

## Getting Started

Somewhere in app bootstrapping land, leverage the commonjs module cache to gain access to a singleton of inject and register your stuff.

```js
// injector.config.js

const React = require('React');
const Injector = require('boxed-injector').Injector;
const Inject = require('boxed-injector-react')(React).Inject;

const types = {
  FOO: 'FOO'
};

let inject;

function injectorConfig () {
  const injector = new Injector();
  injector.register(types.FOO, 'foo');
	inject = new Inject(injector);
	return injector;
};

injectorConfig.inject = inject;
injectorConfig.types = types;

module.exports = injectorConfig;
```

Then, in your components, reference the singleton to gain access to the injector.

```js
// MyComponent.js
const React = require('React');
const inject = require('./injector.config').inject;

@inject({ 'baz': 'foo' })
class MyComponent extends React.Component {
  render(){
    console.log(this.props);
    return <div/>;
  }
}

```

## Contributing
We look forward to seeing your contributions!

## License

MIT © [Ben Lugavere](http://benlugavere.com)


[npm-image]: https://badge.fury.io/js/boxed-injector.svg
[npm-url]: https://npmjs.org/package/boxed-injector
[travis-image]: https://travis-ci.org/giddyinc/boxed-injector.svg?branch=master
[travis-url]: https://travis-ci.org/giddyinc/boxed-injector
[daviddm-image]: https://david-dm.org/giddyinc/boxed-injector.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/giddyinc/boxed-injector
[coveralls-image]: https://coveralls.io/repos/giddyinc/boxed-injector/badge.svg
[coveralls-url]: https://coveralls.io/r/giddyinc/boxed-injector

[downloads-url]: https://www.npmjs.com/package/boxed-injector-react
[downloads-image]: https://img.shields.io/npm/dm/boxed-injector-react.svg?style=flat