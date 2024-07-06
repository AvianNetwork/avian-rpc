![Avian RPC Banner](https://github.com/AvianNetwork/avian-rpc/raw/main/media/repo-banner.png)

# Avian Network - Avian RPC

<a href="https://aviannetwork.github.io/avian-rpc/Client.html" target="_blank">Documentation Website</a>

A client library to connect to Avian Core RPC in JavaScript.

[![NPM Package](https://img.shields.io/npm/v/@ravenite/ravencoin-rpc.svg?style=flat-square)](https://www.npmjs.org/package/@ravenite/ravencoin-rpc)

**An Avian module for [avian](https://github.com/AvianNetwork/Avian).**

## Getting Started

```sh
# Using npm
npm install @aviannetwork/avian-rpc

# Using yarn
yarn add @aviannetwork/avian-rpc
```

### Usage

You can either write manually requests to your RPC connection via the `request` method, or you can use the built-in methods provided by the client class.

#### Manually

```javascript
import { Client } from '@aviannetwork/avian-rpc';

const client = new Client({
  url: 'http://127.0.0.1:7896',
  username: 'username',
  password: 'password',
});

client.request('getchaintips').then(response => {
  console.log('response', response);
});
```

#### Built-in Methods

```javascript
import { Client } from '@aviannetwork/avian-rpc';

const client = new Client({
  url: 'http://127.0.0.1:7896',
  username: 'username',
  password: 'password',
});

client.methods.listAssets().then(assets => {
  console.log('assets', assets);
});
```

## Examples and Documentation

See [documentation](https://aviannetwork.github.io/avian-rpc/Client.html) for developer guides.

## License

Code released under [the MIT license](./LICENSE.md).

### Development

Some RPC commands within Avian have known bugs. You may experience them as a result. If you find that the issue comes from this library, please create an Issue so that it can be resolved quickly.