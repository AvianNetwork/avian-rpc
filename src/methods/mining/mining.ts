import { IClient } from '@/types';
import {
  EstimateFee,
  EstimateRawFee,
  EstimateRawFeeResponse,
  EstimateSmartFee,
  EstimateSmartFeeResponse,
  GenerateToAddress,
  GetBlockTemplate,
  GetBlockTemplateResponse,
  GetKawpowHash,
  GetKawpowHashResponse,
  GetMiningInfoResponse,
  GetNetworkHashPs,
  Pprpcsb,
  PrioritiseTransaction,
  SetGenerate,
  SubmitBlock,
} from './types';

/**
 * @class Mining
 * @subcategory Client
 */
export class Mining {
  private _client: IClient;

  constructor(client: IClient) {
    this._client = client;
  }

  /**
   * Returns the estimated network hashes per second based on the last n blocks.
   *
   * Pass in [blocks] to override # of blocks, -1 specifies since last difficulty change.
   *
   * Pass in [height] to estimate the network speed at the time when a certain block was found.
   * @param params
   * @param {number=} [params.nblocks=120] The number of blocks, or -1 for blocks since last difficulty change.
   * @param {number=} [params.height=1] To estimate at the time of the given height.
   * @returns {Promise} Hashes per second estimated
   */
  async getNetworkHashPs(params: GetNetworkHashPs): Promise<number> {
    params = params || {};
    params.nblocks = params.nblocks ?? 120;
    params.height = params.height ?? 1;
    return await this._client.request('getnetworkhashps', params);
  }

  /**
   * Returns a json object containing mining-related information.
   * @returns {Promise}
   */
  async getMiningInfo(): Promise<GetMiningInfoResponse> {
    return await this._client.request('getmininginfo');
  }

  /**
   * Accepts the transaction into mined blocks at a higher (or lower) priority
   * @param params
   * @param {string} params.txid The transaction id.
   * @param {number=} params.dummy API-Compatibility for previous API. Must be zero or null. DEPRECATED. For forward compatibility use named arguments and omit this parameter.
   * @param {number} params.fee_delta The fee value (in satoshis) to add (or subtract, if negative). The fee is not actually paid, only the algorithm for selecting transactions into a block considers the transaction as it would have paid a higher (or lower) fee.
   * @returns {Promise} Returns true
   */
  async prioritiseTransaction(params: PrioritiseTransaction): Promise<boolean> {
    return await this._client.request('prioritisetransaction', params);
  }

  /**
   * getBlockTemplate params.template_request
   * @typedef {Object} TemplateRequest
   * @property {string=} template - This must be set to \"template\", \"proposal\" (see BIP 23), or omitted
   * @property {Array=} capabilities - A list of strings. Client side supported feature: 'longpoll', 'coinbasetxn', 'coinbasevalue', 'proposal', 'serverlist', 'workid'
   * @property {Array=} rules - A list of strings. Client side supported softfork deployment.
   */

  /**
   * If the request parameters include a 'mode' key, that is used to explicitly select between the default 'template' request or a 'proposal'.
   *
   * It returns data needed to construct a block to work on.
   *
   * For full specification, see BIPs 22, 23, 9, and 145:
   *  * https://github.com/raven/bips/blob/master/bip-0022.mediawiki
   *  * https://github.com/raven/bips/blob/master/bip-0023.mediawiki
   *  * https://github.com/raven/bips/blob/master/bip-0009.mediawiki#getblocktemplate_changes
   *  * https://github.com/raven/bips/blob/master/bip-0145.mediawiki
   * @param params
   * @param {TemplateRequest} params.template_request
   * @returns {Promise}
   */
  async getBlockTemplate(
    params: GetBlockTemplate
  ): Promise<GetBlockTemplateResponse> {
    return await this._client.request('getblocktemplate', params);
  }

  /**
   * Attempts to submit new block to network.
   *
   * See https://en.bitcoin.it/wiki/BIP_0022 for full specification.
   * @param params
   * @param {string} params.hexdata The hex-encoded block data to submit
   * @param {string=} params.dummy Dummy value, for compatibility with BIP22. This value is ignored.
   * @returns {Promise}
   */
  async submitBlock(params: SubmitBlock): Promise<null | string> {
    return await this._client.request('submitblock', params);
  }

  /**
   * Attempts to submit new block to network mined by kawpow gpu miner via rpc.
   * @param params
   * @param {string} params.header_hash The prow_pow header hash that was given to the gpu miner from this rpc client
   * @param {string} params.mix_hash The mix hash that was mined by the gpu miner via rpc
   * @param {string} params.nonce The nonce of the block that hashed the valid block
   * @returns {Promise}
   */
  async pprpcsb(params: Pprpcsb): Promise<null | string> {
    return await this._client.request('pprpcsb', params);
  }

  /**
   * Get the kawpow hash for a block given its block data
   * @param params
   * @param {string} params.header_hash The prow_pow header hash that was given to the gpu miner from this rpc client
   * @param {string} params.mix_hash The mix hash that was mined by the gpu miner via rpc
   * @param {string} params.nonce The hex nonce of the block that hashed the valid block
   * @param {number} params.height The height of the block data that is being hashed
   * @param {string=} params.target The target of the block that is hash is trying to meet
   * @returns {Promise}
   */
  async getKawpowHash(params: GetKawpowHash): Promise<GetKawpowHashResponse> {
    return await this._client.request('getkawpowhash', params);
  }

  /**
   * Return if the server is set to generate coins or not. The default is false.
   *
   * It is set with the command line argument -gen (or " + std::string(RAVEN_CONF_FILENAME) + " setting gen)
   *
   * It can also be set with the setgenerate call.
   * @returns {Promise} If the server is set to generate coins or not
   */
  async getGenerate(): Promise<boolean> {
    return await this._client.request('getgenerate');
  }

  /**
   * Set 'generate' true or false to turn generation on or off.
   *
   * Generation is limited to 'genproclimit' processors, -1 is unlimited.
   *
   * See the getgenerate call for the current setting.
   * @param params
   * @param {boolean} params.generate Set to true to turn on generation, false to turn off.
   * @param {number=} params.genproclimit Set the processor limit for when generation is on. Can be -1 for unlimited.
   * @returns {Promise}
   */

  async setGenerate(params: SetGenerate): Promise<string> {
    return await this._client.request('setgenerate', params);
  }

  /**
   * Mine blocks immediately to a specified address (before the RPC call returns)
   * @param params
   * @param {number} params.nblocks How many blocks are generated immediately.
   * @param {string} params.address The address to send the newly generated raven to.
   * @param {number=} params.maxtries How many iterations to try (default = 1000000).
   * @returns {Promise} Array of hashes of blocks generated
   */
  async generateToAddress(params: GenerateToAddress): Promise<string[]> {
    return await this._client.request('generatetoaddress', params);
  }

  /**
   * DEPRECATED. Please use estimatesmartfee for more intelligent estimates.
   *
   * Estimates the approximate fee per kilobyte needed for a transaction to begin confirmation within nblocks blocks.
   *
   * Uses virtual transaction size of transaction as defined in BIP 141 (witness data is discounted).
   * @deprecated
   * @param params
   * @param {number} params.nblocks
   * @returns {Promise} Estimated fee-per-kilobyte.
   *
   * A negative value is returned if not enough transactions and blocks have been observed to make an estimate.
   *
   * -1 is always returned for nblocks == 1 as it is impossible to calculate a fee that is high enough to get reliably included in the next block.
   */
  async estimateFee(params: EstimateFee): Promise<number> {
    return await this._client.request('estimatefee', params);
  }

  /**
   * Estimates the approximate fee per kilobyte needed for a transaction to begin confirmation within conf_target blocks if possible and return the number of blocks for which the estimate is valid. Uses virtual transaction size as defined in BIP 141 (witness data is discounted).
   * @param params
   * @param {number} params.conf_target Confirmation target in blocks (1 - 1008)
   * @param {string=} [params.estimate_mode='CONSERVATIVE'] Default = CONSERVATIVE. The fee estimate mode.
   * Whether to return a more conservative estimate which also satisfies a longer history.
   *
   * A conservative estimate potentially returns a higher feerate and is more likely to be sufficient for the desired target, but is not as responsive to short term drops in the prevailing fee market.
   *
   * Must be one of: "UNSET", "ECONOMICAL", "CONSERVATIVE"
   * @returns {Promise}
   */
  async estimateSmartFee(
    params: EstimateSmartFee
  ): Promise<EstimateSmartFeeResponse> {
    return await this._client.request('estimatesmartfee', params);
  }

  /**
   * WARNING: This interface is unstable and may disappear or change!
   *
   * WARNING: This is an advanced API call that is tightly coupled to the specific implementation of fee estimation.
   *
   * The parameters it can be called with and the results it returns will change if the internal implementation changes.
   *
   * Estimates the approximate fee per kilobyte needed for a transaction to begin confirmation within conf_target blocks if possible.
   *
   * Uses virtual transaction size as defined in BIP 141 (witness data is discounted).
   * @param params
   * @param {number} params.conf_target  Confirmation target in blocks (1 - 1008)
   * @param {number=} [params.threshold=0.95] The proportion of transactions in a given feerate range that must have been confirmed within conf_target in order to consider those feerates as high enough and proceed to check lower buckets.  Default: 0.95
   * @returns {Promise} Results are returned for any horizon which tracks blocks up to the confirmation target.
   */
  async estimateRawFee(
    params: EstimateRawFee
  ): Promise<EstimateRawFeeResponse> {
    return await this._client.request('estimaterawfee', params);
  }
}
