# Driver-Fetch

[![Build Status](https://travis-ci.com/barktler/Driver-Fetch.svg?branch=master)](https://travis-ci.com/barktler/Driver-Fetch)
[![codecov](https://codecov.io/gh/barktler/Driver-Fetch/branch/master/graph/badge.svg)](https://codecov.io/gh/barktler/Driver-Fetch)
[![npm version](https://badge.fury.io/js/%40barktler%2Fdriver-fetch.svg)](https://www.npmjs.com/package/@barktler/driver-fetch)
[![downloads](https://img.shields.io/npm/dm/@barktler/driver-fetch.svg)](https://www.npmjs.com/package/@barktler/driver-fetch)

:yellow_heart: Fetch Driver

## Install

```sh
yarn add @barktler/driver-fetch
# Or
npm install @barktler/driver-fetch --save
```

## Usage

Create Fetch driver with json body formatter

```ts
import { createFetchDriver } from "@barktler/driver-fetch";
api.useDriver(createFetchDriver());
```

Create Fetch driver with form data body formatter

```ts
import { createFetchDriver } from "@barktler/driver-fetch";
api.useDriver(createFetchDriver({
    bodyType: 'form-data',
}));
```
