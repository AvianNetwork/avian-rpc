import { Client as HyperbitClient } from '@hyperbitjs/rpc';
import {
  Assets,
  Blockchain,
  Messages,
  Mining,
  Misc,
  Net,
  RawTransactions,
  Rewards,
  Wallet,
} from './methods';
import { Config, IClient, RpcError } from './types';

/**
 * Create a RPC Client to connect to a Avian node.
 * @class Client
 * @category Client
 * @param config
 * @param {string} config.url Url endpoint to connect to node server
 * @param {string} config.username RPC username
 * @param {string} config.password RPC password
 * @param {Objct=} config.httpOptions HTTP options object of values to add to request headers
 * @example
 *  import Client from '@aviannetwork/avian-rpc';

const client = new Client({
  url: 'http://127.0.0.1:9050',
  username: 'username',
  password: 'password',
});

client.assets.listAssets().then(assets => {
  console.log('assets', assets);
});
 */
export class Client implements IClient {
  /** @type {Assets} */
  public assets: Assets;
  /** @type {Blockchain} */
  public blockchain: Blockchain;
  /** @type {Messages} */
  public messages: Messages;
  /** @type {Mining} */
  public mining: Mining;
  /** @type {Misc} */
  public misc: Misc;
  /** @type {Net} */
  public net: Net;
  /** @type {RawTransactions} */
  public rawTransactions: RawTransactions;
  /** @type {Rewards} */
  public rewards: Rewards;
  /** @type {Wallet} */
  public wallet: Wallet;
  private _instance: HyperbitClient;

  constructor(config: Config) {
    this._instance = new HyperbitClient(config);

    this.assets = new Assets(this);
    this.blockchain = new Blockchain(this);
    this.messages = new Messages(this);
    this.mining = new Mining(this);
    this.misc = new Misc(this);
    this.net = new Net(this);
    this.rawTransactions = new RawTransactions(this);
    this.rewards = new Rewards(this);
    this.wallet = new Wallet(this);
  }

  /**
   * Make a RPC request with a method command and payload
   * @param {string} method Name of rpc command.
   * @param {(Object|Array)=} params Data required by rpc command. Typically an object or an array.
   * @returns {Promise}
   */
  request(method: string, params: any = []): Promise<any | RpcError> {
    return this._instance.request(method, params);
  }
}
