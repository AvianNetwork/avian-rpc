import { IClient } from '@/types';
import {
  CreateMultisig,
  CreateMultisigResponse,
  GetAddressBalance,
  GetAddressBalanceResponse,
  GetAddressBalanceResponseWithAsset,
  GetAddressDeltas,
  GetAddressDeltasResponse,
  GetAddressMempool,
  GetAddressMempoolResponse,
  GetAddressTxIds,
  GetAddressUtxos,
  GetAddressUtxosResponse,
  GetInfoResponse,
  GetMemoryInfo,
  GetMemoryInfoResponse,
  GetSpentInfo,
  GetSpentInfoResponse,
  loggingRequest,
  SetMockTime,
  SignMessageWithPrivKey,
  SignMessageWithPrivKeyResponse,
  ValidateAddress,
  ValidateAddressResponse,
  VerifyMessage,
} from './types';

/**
 * @class Misc
 * @subcategory Methods
 */
export class Misc {
  private _client: IClient;

  constructor(client: IClient) {
    this._client = client;
  }

  /**
   * Returns an object containing various state info.
   * @deprecated
   * @returns {Promise<GetInfoResponse>}
   */
  getInfo(): Promise<GetInfoResponse> {
    return this._client.request('getinfo');
  }

  /**
   * Returns an object containing information about memory usage.
   * @param params
   * @param {string=} [params.mode='stats'] Determines what kind of information is returned. This argument is optional, the default mode is \"stats\"
   * @returns {Promise<GetMemoryInfoResponse>}
   */
  getMemoryInfo(params: GetMemoryInfo): Promise<GetMemoryInfoResponse> {
    return this._client.request('getmemoryinfo', params);
  }

  /**
   * Return information about the given raven address.
   * @param params
   * @param {string} params.address The raven address to validate
   * @returns {Promise<ValidateAddressResponse>}
   */
  validateAddress(params: ValidateAddress): Promise<ValidateAddressResponse> {
    return this._client.request('validateaddress', params);
  }

  /**
   * Creates a multi-signature address with n signature of m keys required.
   * @param params
   * @param {number} params.nrequired The number of required signatures out of the n keys or addresses.
   * @param {string} params.keys      A json array of keys which are raven addresses or hex-encoded public keys
   * @returns {Promise<CreateMultisigResponse>} An object with the address and redeemScript
   */
  createMultisig(params: CreateMultisig): Promise<CreateMultisigResponse> {
    return this._client.request('createmultisig', params);
  }

  /**
   * Verify a signed message
   * @param params
   * @param {string} params.address   The raven address to use for the signature.
   * @param {string} params.signature The signature provided by the signer in base 64 encoding (see signmessage).
   * @param {string} params.message   The message that was signed.
   * @returns {Promise<boolean>} If the signature is verified or not.
   */
  verifyMessage(params: VerifyMessage): Promise<boolean> {
    return this._client.request('verifymessage', params);
  }

  /**
   * Sign a message with the private key of an address
   * @param params
   * @param {string} params.privkey The private key to sign the message with.
   * @param {string} params.message The message to create a signature of.
   * @returns {Promise<SignMessageWithPrivKeyResponse>} The signature of the message encoded in base 64
   */
  signMessageWithPrivKey(
    params: SignMessageWithPrivKey
  ): Promise<SignMessageWithPrivKeyResponse> {
    return this._client.request('signmessagewithprivkey', params);
  }

  /**
   * Returns all mempool deltas for an address (requires addressindex to be enabled).
   * @param params
   * @param {Array} params.addresses                Array of base58check encoded address
   * @param {boolean=} [params.includeAssets=false] If true this will return an expanded result which includes asset deltas
   * @returns {Promise<GetAddressMempoolResponse[]>}
   */
  getAddressMempool(
    params: GetAddressMempool
  ): Promise<GetAddressMempoolResponse[]> {
    return this._client.request('getaddressmempool', params);
  }

  /**
   * Returns all unspent outputs for an address (requires addressindex to be enabled).
   * @param params
   * @param {Array} params.addresses            Array of base58check encoded addresses
   * @param {boolean=} [params.chainInfo=false] Include chain info with results
   * @param {string=} params.assetName          Get UTXOs for a particular asset instead of RVN ('*' for all assets).
   * @returns {Promise<GetAddressUtxosResponse[]>}
   */
  getAddressUtxos(params: GetAddressUtxos): Promise<GetAddressUtxosResponse[]> {
    let parsed =
      Object.keys(params).length === 1 && params.addresses.length
        ? Object.values(params).flat()
        : params;
    return this._client.request('getaddressutxos', parsed);
  }

  /**
   * Returns all changes for an address (requires addressindex to be enabled).
   * @param params
   * @param {Array} params.addresses   Array of base58check encoded addresses
   * @param {number} params.start      The start block height
   * @param {number} params.end        The end block height
   * @param {boolean} params.chainInfo Include chain info in results, only applies if start and end specified
   * @param {string=} params.assetName Get deltas for a particular asset instead of RVN.
   * @returns {Promise<GetAddressDeltasResponse[]>}
   */
  getAddressDeltas(
    params: GetAddressDeltas
  ): Promise<GetAddressDeltasResponse[]> {
    return this._client.request('getaddressdeltas', params);
  }

  /**
   * Returns the txids for an address(es) (requires addressindex to be enabled).
   * @param params
   * @param {Array} params.addresses Array of base58check encoded addresses
   * @param {number=} params.start   The start block height
   * @param {number=} params.end     The end block height
   * @returns {Promise<string[]>} Array of transaction ids
   */
  getAddressTxIds(params: GetAddressTxIds): Promise<string[]> {
    return this._client.request('getaddresstxids', params);
  }

  /**
   * Returns the balance for an address(es) (requires addressindex to be enabled).
   * @param params
   * @param {Array} params.addresses                Array of base58check encoded addresses
   * @param {boolean=} [params.includeAssets=false] If true this will return an expanded result which includes asset balances
   * @returns {Promise<GetAddressBalanceResponse | GetAddressBalanceResponseWithAsset[]>}
   */
  getAddressBalance(
    params: GetAddressBalance
  ): Promise<GetAddressBalanceResponse | GetAddressBalanceResponseWithAsset[]> {
    return this._client.request('getaddressbalance', [params]);
  }

  /**
   * Returns the txid and index where an output is spent.
   * @param params
   * @param {string} txid  The hex string of the txid
   * @param {number} index The start block height
   * @returns {Promise<GetSpentInfoResponse>}
   */
  getSpentInfo(params: GetSpentInfo): Promise<GetSpentInfoResponse> {
    return this._client.request('getspentinfo', params);
  }

  /**
   * Set the local time to given timestamp (-regtest only)
   * @param params
   * @param {number} timestamp Unix seconds-since-epoch timestamp. Pass 0 to go back to using the system time.
   * @returns {Promise<null>}
   */
  setMockTime(params: SetMockTime): Promise<null> {
    return this._client.request('setmocktime', params);
  }

  /**
   * Simply echo back the input arguments. This command is for testing.
   *
   * The difference between echo and echojson is that echojson has argument conversion enabled in the client-side table in raven-cli and the GUI.
   *
   * There is no server-side difference.
   * @param params
   * @returns {Promise<unknown>}
   */
  echo(params = {}): Promise<unknown> {
    return this._client.request('echo', params);
  }

  /**
   * Simply echo back the input arguments. This command is for testing.
   *
   * The difference between echo and echojson is that echojson has argument conversion enabled in the client-side table in raven-cli and the GUI.
   *
   * There is no server-side difference.
   * @param params
   * @returns {Promise<unknown>}
   */
  echojson(params = {}): Promise<unknown> {
    return this._client.request('echojson', params);
  }

  /**
   * Gets and sets the logging configuration.
   *
   * When called without an argument, returns the list of categories that are currently being debug logged.
   *
   * When called with arguments, adds or removes categories from debug logging.
   *
   * The valid logging categories are: " + ListLogCategories() + " libevent logging is configured on startup and cannot be modified by this RPC during runtime.
   * @param params
   * @param {Array} params.include Array of strings. Add debug logging for these categories.
   * @param {Array} params.exclude Array of strings. Remove debug logging for these categories.
   * @returns {Promise<string>} A list of the logging categories that are active.
   */
  logging(params: loggingRequest): Promise<string> {
    return this._client.request('logging', params);
  }
}
