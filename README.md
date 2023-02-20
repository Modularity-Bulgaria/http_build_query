# http_build_query

[![codecov](https://codecov.io/gh/Modularity-Bulgaria/http_build_query/branch/main/graph/badge.svg?token=HS160E15RY)](https://codecov.io/gh/Modularity-Bulgaria/http_build_query)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Modularity-Bulgaria/http_build_query/ci-workflow.yml)

## Introduction

Have you ever found yourself needing to connect to a legacy PHP API that requires the usage of `http_build_query` with **RFC1738**?

This library will enable you to do so with ease :beer:

## Requirements
- NodeJS 14.x

## Installation

Install using either `npm` or `yarn`
```sh
npm i @modularitybg/http_build_query
//or
yarn add @modularitybg/http_build_query
```

## How to use

```js
const httpBuildQuery = require('@modularitybg/http_build_query');

const rfcFormattedQuery = httpBuildQuery({
    amount: { amount: 2900 },
    stringValueWithWhiteSpace: "String Value",
    city: "Unlandstraße",
    arrayValues: [1, "string"],
})
``
//Result
"amount=%7B%22amount%22%3A2900%7D&stringValueWithWhiteSpace=String+Value&city=Unlandstra\\u00dfe&arrayValues=%5B1%2C%22string%22%5D"
```
_Notice that special characters are transformed using UTF-8 mapping, similar to how is handled in PHP_


## Why not simply use _URLSearchParams_?

Let's compare the difference:
```js
nativeQueryResult = new URLSearchParams({
    amount:{ 
        amount: 2900 
    },
    stringValueWithWhiteSpace: "String Value",
    city: "Unlandstraße",
    arrayValues: [1, "string"]
}).toString()

//Result
'amount=%5Bobject+Object%5D&stringValueWithWhiteSpace=String+Value&city=Unlandstra%C3%9Fe&arrayValues=1%2Cstring'
```

This type of encoding may not be compatible with the API you are trying to connect.
Notice the **Object**, **arrayValues** definitions and the **special character** in the city name.

## License

MIT