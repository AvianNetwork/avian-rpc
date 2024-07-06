// https://github.com/AvianNetwork/Avian/blob/master/src/rpc/rawtransaction.cpp

import { IClient } from '@/types';
import {
  CombineRawTransaction,
  CreateRawTransaction,
  DecodeRawTransaction,
  DecodeRawTransactionResponse,
  DecodeScript,
  DecodeScriptResponse,
  GetRawTransaction,
  GetRawTransactionResponse,
  GetTxOutProof,
  GetTxOutProofResponse,
  SendRawTransaction,
  SignRawTransaction,
  SignRawTransactionResponse,
  TestMempoolAccept,
  TestMempoolAcceptResponse,
  VerifyTxOutProof,
  VerifyTxOutProofResponse,
} from './types';

/**
 * @class RawTransactions
 * @subcategory Methods
 */
export class RawTransactions {
  private _client: IClient;

  constructor(client: IClient) {
    this._client = client;
  }

  /**
   * @deprecated
   * NOTE: By default this function only works for mempool transactions. If the -txindex option is enabled, it also works for blockchain transactions.
   *
   * DEPRECATED: for now, it also works for transactions with unspent outputs.
   *
   * Return the raw transaction data.
   *
   * If verbose is 'true', returns an Object with information about 'txid'.
   *
   * If verbose is 'false' or omitted, returns a string that is serialized, hex-encoded data for 'txid'.
   * @param params
   * @param {string}   params.txid            The transaction id
   * @param {boolean=} [params.verbose=false] If false, return a string, otherwise return a json object
   * @returns {Promise<string | GetRawTransactionResponse>} The serialized, hex-encoded data for 'txid' or verbose txid
   */
  getRawTransaction({
    txid,
    verbose,
  }: GetRawTransaction): Promise<string | GetRawTransactionResponse> {
    const data = [txid, verbose ?? false];
    return this._client.request('getrawtransaction', data);
  }

  /**
   * Create a transaction spending the given inputs and creating new outputs.
   * 
   * Outputs are addresses (paired with a AVN amount, data or object specifying an asset operation) or data.
   * 
   * Returns hex-encoded raw transaction.
   * 
   * Note that the transaction's inputs are not signed, and it is not stored in the wallet or transmitted to the network.
   * 
   * Paying for Asset Operations: Some operations require an amount of AVN to be sent to a burn address.
   * 
   * Paying for Asset Operations: Some operations require an amount of AVN to be sent to a burn address:
   *
   * * Operation: Amount + Burn Address
   *   * transfer:                 0
   *   * transferwithmessage:      0
   *   * issue:                    " + i64tostr(GetBurnAmount(AssetType::ROOT) / COIN) + " to " + GetBurnAddress(AssetType::ROOT) + 
   *   * issue (subasset):         " + i64tostr(GetBurnAmount(AssetType::SUB) / COIN) + " to " + GetBurnAddress(AssetType::SUB) + 
   *   * issue_unique:             " + i64tostr(GetBurnAmount(AssetType::UNIQUE) / COIN) + " to " + GetBurnAddress(AssetType::UNIQUE) + 
   *   * reissue:                  " + i64tostr(GetBurnAmount(AssetType::REISSUE) / COIN) + " to " + GetBurnAddress(AssetType::REISSUE) + 
   *   * issue_restricted:         " + i64tostr(GetBurnAmount(AssetType::RESTRICTED) / COIN) + " to " + GetBurnAddress(AssetType::RESTRICTED) + 
   *   * reissue_restricted:       " + i64tostr(GetBurnAmount(AssetType::REISSUE) / COIN) + " to " + GetBurnAddress(AssetType::REISSUE) + 
   *   * issue_qualifier:          " + i64tostr(GetBurnAmount(AssetType::QUALIFIER) / COIN) + " to " + GetBurnAddress(AssetType::QUALIFIER) + 
   *   * issue_qualifier (sub):    " + i64tostr(GetBurnAmount(AssetType::SUB_QUALIFIER) / COIN) + " to " + GetBurnAddress(AssetType::SUB_QUALIFIER) +
   *   * tag_addresses:            " + "0.1 to " + GetBurnAddress(AssetType::NULL_ADD_QUALIFIER) + " (per address)
   *   * untag_addresses:          " + "0.1 to " + GetBurnAddress(AssetType::NULL_ADD_QUALIFIER) + " (per address)
   *   * freeze_addresses:         0
   *   * unfreeze_addresses:       0
   *   * freeze_asset:             0
   *   * unfreeze_asset:           0

   * Assets For Authorization: These operations require a specific asset input for authorization:
   * * Root Owner Token:
   *   * reissue
   *   * issue_unique
   *   * issue_restricted
   *   * reissue_restricted
   *   * freeze_addresses
   *   * unfreeze_addresses
   *   * freeze_asset
   *   * unfreeze_asset
   *   * Root Qualifier Token:
   *      * issue_qualifier (when issuing subqualifier)
   *   * Qualifier Token:
   *     * tag_addresses
   *     * untag_addresses
   *
   * Output Ordering: Asset operations require the following:
   *
   * 1. All coin outputs come first (including the burn output).
   * 2. The owner token change output comes next (if required).
   * 3. An issue, reissue, or any number of transfers comes last
   *    * (different types can't be mixed in a single transaction).
   * @param params 
   * @param {Array} params.inputs
   * @param {Array} params.outputs
   * @param {number=} [params.locktime=0]
   * @returns {Promise<string>} transaction - hex string of the transaction
   */
  createRawTransaction({
    inputs,
    outputs,
    locktime,
  }: CreateRawTransaction): Promise<string> {
    const data = [inputs, outputs, locktime ?? 0];
    return this._client.request('createrawtransaction', data);
  }

  /**
   * Return a JSON object representing the serialized, hex-encoded transaction.
   * @param params
   * @param {string} hexstring The transaction hex string
   * @returns {Promise<DecodeRawTransactionResponse>} Parsed transaction
   */
  decodeRawTransaction({
    hexstring,
  }: DecodeRawTransaction): Promise<DecodeRawTransactionResponse> {
    return this._client.request('decoderawtransaction', [hexstring]);
  }

  /**
   * Decode a hex-encoded script.
   * @param params
   * @param {string} params.hexstring // the hex encoded script
   * @returns {Promise<DecodeScriptResponse>}
   */
  decodeScript({ hexstring }: DecodeScript): Promise<DecodeScriptResponse> {
    return this._client.request('decodescript', [hexstring]);
  }

  /**
   * Submits raw transaction (serialized, hex-encoded) to local node and network.
   *
   * Also see createrawtransaction and signrawtransaction calls.
   * @param params
   * @param {string} params.hexstring The hex string of the raw transaction)
   * @param {boolean=} [params.allowhighfees=false]  Allow high fees
   * @returns {Promise<string>} The transaction hash in hex
   */
  sendRawTransaction({
    hexstring,
    allowhighfees,
  }: SendRawTransaction): Promise<string> {
    const data = [hexstring, allowhighfees ?? false];
    return this._client.request('sendrawtransaction', data);
  }

  /**
   * Combine multiple partially signed transactions into one transaction.
   *
   * The combined transaction may be another partially signed transaction or a fully signed transaction.
   * @param params
   * @param {Array} params.txs A json array of hex strings of partially signed transactions
   * @returns {Promise<string>} The hex-encoded raw transaction with signature(s)
   */
  combineRawTransaction({ txs }: CombineRawTransaction): Promise<string> {
    return this._client.request('combinerawtransaction', [txs]);
  }

  /**
   * Sign inputs for raw transaction (serialized, hex-encoded).
   *
   * The second optional argument (may be null) is an array of previous transaction outputs that this transaction depends on but may not yet be in the block chain.
   *
   * The third optional argument (may be null) is an array of base58-encoded private keys that, if given, will be the only keys used to sign the transaction.
   * @param params
   * @param {string} params.hexstring The transaction hex string
   * @param {Array=} params.prevtxs Array of json objects, or 'null' if none provided
   * @param {Array=} params.privkeys Array of strings, or 'null' if none provided. Private key in base58-encoding
   * @param {string=} params.sighashtype 'ALL' | 'NONE' | 'SINGLE' | 'ALL|ANYONECANPAY' | 'NONE|ANYONECANPAY' | 'SINGLE|ANYONECANPAY'. Default = ALL. The signature hash type
   * @returns {Promise<SignRawTransactionResponse>}
   */
  signRawTransaction({
    hexstring,
    prevtxs,
    privkeys,
    sighashtype,
  }: SignRawTransaction): Promise<SignRawTransactionResponse> {
    const data = [
      hexstring,
      prevtxs ?? null,
      privkeys ?? null,
      sighashtype ?? 'SIGHASH_ALL',
    ];
    return this._client.request('signrawtransaction', data);
  }

  /**
   * Returns if raw transaction (serialized, hex-encoded) would be accepted by mempool.
   *
   * This checks if the transaction violates the consensus or policy rules.
   *
   * See sendrawtransaction call.
   * @param params
   * @param {Array} params.rawtxs An array of hex strings of raw transactions. Length must be one for now.
   * @param {boolean=} [parasm.allowhighfees=false] Default = false. Allow high fees.
   * @returns {Promise<TestMempoolAcceptResponse>} The result of the mempool acceptance test for each raw transaction in the input array. Length is exactly one for now.
   */
  testMempoolAccept({
    rawtxs,
    allowhighfees,
  }: TestMempoolAccept): Promise<TestMempoolAcceptResponse> {
    const data = [rawtxs, allowhighfees ?? false];
    return this._client.request('testmempoolaccept', data);
  }

  /**
   * Returns a hex-encoded proof that \"txid\" was included in a block.
   *
   * NOTE: By default this function only works sometimes. This is when there is an unspent output in the utxo for this transaction. To make it always work, you need to maintain a transaction index, using the -txindex command line option or specify the block in which the transaction is included manually (by blockhash).
   * @param params
   * @param {Array} params.txids An array of transaction hashes
   * @param {string=} params.blockhash If specified, looks for txid in the block with this hash
   * @returns {Promise<GetTxOutProofResponse>} A string that is a serialized, hex-encoded data for the proof.
   */
  getTxOutProof({
    txids,
    blockhash,
  }: GetTxOutProof): Promise<GetTxOutProofResponse> {
    const data: (string | string[])[] = [txids];
    if (blockhash) {
      data.push(blockhash);
    }
    return this._client.request('gettxoutproof', data);
  }

  /**
   * Verifies that a proof points to a transaction in a block, returning the transaction it commits to and throwing an RPC error if the block is not in our best chain
   * @param params
   * @param {string} params.proof The hex-encoded proof generated by gettxoutproof
   * @returns {Promise<VerifyTxOutProofResponse>} Array of the txid(s) which the proof commits to, or empty array if the proof is invalid
   */
  verifyTxOutProof({
    proof,
  }: VerifyTxOutProof): Promise<VerifyTxOutProofResponse> {
    return this._client.request('verifytxoutproof', [proof]);
  }
}
