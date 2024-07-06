/** GetNetworkHashPs */
export type GetNetworkHashPs = {
  nblocks?: number;
  height?: number;
};

/** GetMiningInfoResponse */
export type GetMiningInfoResponse = {
  /** The current block */
  blocks: number;
  /** The last block weight */
  currentblockweight: number;
  /** The last block transaction */
  currentblocktx: number;
  /** The current difficulty */
  difficulty: number;
  /** The network hashes per second */
  networkhashps: number;
  /** The hashes per second of built-in miner */
  hashespersec: number;
  /** The size of the mempool */
  pooledtx: number;
  /** current network name as defined in BIP70 (main, test, regtest) */
  chain: string;
  /** any network and blockchain warnings */
  warnings: string;
  /** DEPRECATED. Same as warnings. Only shown when aviand is started with -deprecatedrpc=getmininginfo */
  errors?: string;
};

/** PrioritiseTransaction */
export type PrioritiseTransaction = {
  txid: string;
  dummy?: number;
  fee_delta: number;
};

/** GetBlockTemplate */
export type GetBlockTemplate = {
  template_request?: GetBlockTemplateTemplateRequest;
};

/** GetBlockTemplateTemplateRequest */
type GetBlockTemplateTemplateRequest = {
  template?: string;
  capabilities?: string[];
  rules?: string[];
};

/** GetBlockTemplateResponse */
export type GetBlockTemplateResponse = {
  capabilities?: string[];
  /** The preferred block version */
  version: number;
  /** Specific block rules that are to be enforced */
  rules: string[];
  vbavailable: {
    // Set of pending, supported versionbit (BIP 9) softfork deployments
    // Identifies the bit number as indicating acceptance and readiness for the named softfork rule
    [key: number]: number;
  };
  /** Bit mask of versionbits the server requires set in submissions */
  vbrequired: number;
  /** The hash of current highest block */
  previousblockhash: string;
  /** Contents of non-coinbase transactions that should be included in the next block */
  transactions: GetBlockTemplateResponseTransaction[];
  coinbaseaux: {
    // Data that should be included in the coinbase's scriptSig content
    /** Key name is to be ignored, and value included in scriptSig */
    flags: string;
  };
  /** Maximum allowable input to coinbase transaction, including the generation award and transaction fees (in satoshis) */
  coinbasevalue: number;
  longpollid?: string;
  /** Information for coinbase transaction */
  coinbasetxn: any;
  /** The hash target */
  target: string;
  /** The minimum timestamp appropriate for next block time in seconds since epoch (Jan 1 1970 GMT) */
  mintime: number;
  // List of ways the block template may be changed
  /** A way the block template may be changed, e.g. 'time', 'transactions', 'prevblock' */
  mutable: string[];
  /**  A range of valid nonces */
  noncerange: string;
  /** Limit of sigops in blocks */
  sigoplimit: number;
  /** Limit of block size */
  sizelimit: number;
  /** Limit of block weight */
  weightlimit: number;
  /** Current timestamp in seconds since epoch (Jan 1 1970 GMT) */
  curtime: number;
  /** Compressed target of next block */
  bits: string;
  /** The height of the next block */
  height: number;
  default_witness_commitment?: string;
  pprpcheader?: string;
  pprpcepoch?: number;
};

/** GetBlockTemplateResponseTransaction */
type GetBlockTemplateResponseTransaction = {
  /** Transaction data encoded in hexadecimal (byte-for-byte) */
  data: string;
  /** Transaction id encoded in little-endian hexadecimal */
  txid: string;
  /** Hash encoded in little-endian hexadecimal (including witness data) */
  hash: string;
  /** Transactions before this one (by 1-based index in 'transactions' list) that must be present in the final block if this one is */
  depends: number[];
  /** Difference in value between transaction inputs and outputs (in satoshis); for coinbase transactions, this is a negative Number of the total collected block fees (ie, not including the block subsidy); if key is not present, fee is unknown and clients MUST NOT assume there isn't one */
  fee: number;
  /** Total SigOps cost, as counted for purposes of block limits; if key is not present, sigop cost is unknown and clients MUST NOT assume it is zero */
  sigops: number;
  /** Total transaction weight, as counted for purposes of block limits */
  weight: number;
  /** If provided and true, this transaction must be in the final block */
  required: boolean;
};

/** SubmitBlock */
export type SubmitBlock = {
  hexdata: string;
  dummy?: string;
};

/** Pprpcsb */
export type Pprpcsb = {
  header_hash: string;
  mix_hash: string;
  nonce: string;
};

/** GetKawpowHash */
export type GetKawpowHash = {
  header_hash: string;
  mix_hash: string;
  nonce: string;
  height: number;
  target?: string;
};

/** GetKawpowHashResponse */
export type GetKawpowHashResponse = {
  result: boolean;
  digest: string;
  mix_hash: string;
  info: string;
  meets_target?: boolean;
};

/** SetGenerate */
export type SetGenerate = {
  generate: boolean;
  genproclimit?: number;
};

/** GenerateToAddress */
export type GenerateToAddress = {
  nblocks: number;
  address: string;
  maxtries?: number;
};

/** EstimateFee */
export type EstimateFee = {
  nblocks: number;
};

/** EstimateSmartFee */
export type EstimateSmartFee = {
  conf_target: number;
  estimate_mode?: 'CONSERVATIVE' | 'UNSET' | 'ECONOMICAL';
};

/** EstimateSmartFeeResponse */
export type EstimateSmartFeeResponse = {
  /** Estimate fee rate in " + CURRENCY_UNIT + "/kB */
  feerate?: number;
  /** Array of strings. Errors encountered during processing */
  errors?: string[];
  /** Block number where estimate was found */
  blocks: number;
};

/** EstimateRawFee */
export type EstimateRawFee = {
  conf_target: number;
  threshold?: number;
};

/** EstimateRawFeeResponse */
export type EstimateRawFeeResponse = {
  /** Estimate for short time horizon */
  short?: EstimateRawFeeResponseShort;
  /** Dstimate for medium time horizon */
  medium?: any;
  /** Dstimate for long time horizon */
  long: any;
};

/** EstimateRawFeeResponseShort */
type EstimateRawFeeResponseShort = {
  /** Estimate fee rate in " + CURRENCY_UNIT + "/kB */
  feerate?: number;
  /** Exponential decay (per block) for historical moving average of confirmation data */
  decay: number;
  /** The resolution of confirmation targets at this time horizon */
  scale: number;
  /** Information about the lowest range of feerates to succeed in meeting the threshold */
  pass?: EstimateRawFeeResponseShortPass;
  /** Information about the highest range of feerates to fail to meet the threshold */
  fail?: any;
  /** Array of strings. Errors encountered during processing */
  errors?: string[];
};

/** EstimateRawFeeResponseShortPass */
type EstimateRawFeeResponseShortPass = {
  /** Start of feerate range */
  startrange: number;
  /** End of feerate range */
  endrange: number;
  /** Number of txs over history horizon in the feerate range that were confirmed within target */
  withintarget: number;
  /** Number of txs over history horizon in the feerate range that were confirmed at any point */
  totalconfirmed: number;
  /** Current number of txs in mempool in the feerate range unconfirmed for at least target blocks */
  inmempool: number;
  /** Number of txs over history horizon in the feerate range that left mempool unconfirmed after target */
  leftmempool: number;
};
