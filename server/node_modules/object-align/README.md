# object-align

[![Build Status](https://circleci.com/gh/blackflux/object-align.png?style=shield)](https://circleci.com/gh/blackflux/object-align)
[![Test Coverage](https://img.shields.io/coveralls/blackflux/object-align/master.svg)](https://coveralls.io/github/blackflux/object-align?branch=master)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=blackflux/object-align)](https://dependabot.com)
[![Dependencies](https://david-dm.org/blackflux/object-align/status.svg)](https://david-dm.org/blackflux/object-align)
[![NPM](https://img.shields.io/npm/v/object-align.svg)](https://www.npmjs.com/package/object-align)
[![Downloads](https://img.shields.io/npm/dt/object-align.svg)](https://www.npmjs.com/package/object-align)
[![Semantic-Release](https://github.com/blackflux/js-gardener/blob/master/assets/icons/semver.svg)](https://github.com/semantic-release/semantic-release)
[![Gardener](https://github.com/blackflux/js-gardener/blob/master/assets/badge.svg)](https://github.com/blackflux/js-gardener)

Align object key order with reference object recursively.

## Install

Install with [npm](https://www.npmjs.com/):

    $ npm install --save object-align

## Usage

<!-- eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies -->
```js
const objectAlign = require('object-align');

const obj = { k1: 1, k2: 2 };
const ref = { k2: null, k1: null };

objectAlign(obj, ref);
// obj => { k2: 1, k1: 2 }
```
