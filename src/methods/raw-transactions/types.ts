/** GetRawTransaction */
export type GetRawTransaction = {
  txid: string;
  verbose?: boolean;
};

/** GetRawTransactionResponse */
export type GetRawTransactionResponse = {
  /** The serialized, hex-encoded data for 'txid' */
  hex: string;
  /** The transaction id (same as provided) */
  txid: string;
  /** The transaction hash (differs from txid for witness transactions) */
  hash: string;
  /** The serialized transaction size */
  size: number;
  /** The virtual transaction size (differs from size for witness transactions) */
  vsize: number;
  /** The version */
  version: number;
  /** The lock time */
  locktime: number;
  vin: GetRawTransactionVin;
  vout: GetRawTransactionVout;
  /** The block hash */
  blockhash: string;
  /** The confirmations */
  confirmations: number;
  /** The transaction time in seconds since epoch (Jan 1 1970 GMT) */
  time: number;
  /** The block time in seconds since epoch (Jan 1 1970 GMT) */
  blocktime: number;
};

/** GetRawTransactionVin */
type GetRawTransactionVin = {
  /** The transaction id */
  txid: string;
  vout: number;
  scriptSig: VinScriptSig;
  /** The script sequence number */
  sequence: number;
  /** hex-encoded witness data (if any) */
  txinwitness: string[];
};

/** VinScriptSig */
type VinScriptSig = {
  /** the asm */
  asm: string;
  /** the hex */
  hex: string;
};

/** GetRawTransactionVout */
type GetRawTransactionVout = {
  /** The value in " + CURRENCY_UNIT + " */
  value: number;
  /** index */
  n: number;
  scriptPubKey: VoutScriptPubKey;
};

/** VoutScriptPubKey */
type VoutScriptPubKey = {
  /** the asm */
  asm: string;
  /** the hex */
  hex: string;
  /** The required sigs */
  reqSigs: number;
  /** The type, eg 'pubkeyhash' */
  type: string;
  /** json array of address strings */
  addresses: string;
};

/** CreateRawTransaction */
export type CreateRawTransaction = {
  inputs: Input[];
  outputs: Outputs;
  /** Default = 0. Raw locktime. Non-0 value also locktime-activates inputs */
  locktime?: number;
};

/** Input */
type Input = {
  /** The transaction id */
  txid: string;
  /** The output number */
  vout: number;
  /** The sequence number */
  sequence?: number;
};

/** Outputs */
type Outputs = {
  /**
   * The destination avian address. Each output must have a different address.
   * The AVN amount
   * e.g. key => 'mjaX9GvK94RuHDHNBnhnyGGKXK1WKjq2Vs': 0.001
   */
  [key: string]: any;
  transfer?: OutputTransfer;
  transferwithmessage?: OutputTransferWithMessage;
  issue?: OutputIssue;
  issue_unique?: OutputIssueUnique;
  reissue?: OutputReissue;
  issue_restricted?: OutputIssueRestricted;
  reissue_restricted?: OutputReissueRestricted;
  issue_qualifier?: OutputIssueQualifier;
  tag_addresses?: OutputTagAddresses;
  untag_addresses?: OutputUntagAddresses;
  freeze_addresses?: OutputFreezeAddresses;
  unfreeze_addresses?: OutputUnfreezeAddresses;
  freeze_asset?: OutputFreezeAsset;
  unfreeze_asset?: OutputUnfreezeAsset;
  /** Hex encoded data */
  data?: string;
};

/**
 * @title OutputTransfer
 * A json object of assets to send
 * The key is the asset name
 * The value is the number of raw units to transfer
 * e.g. key => '#ABC': 10
 */
type OutputTransfer = {
  [key: string]: string | number;
};

/**
 * OutputTransferWithMessage
 * A json object of describing the transfer and message contents to send
 */
type OutputTransferWithMessage = OutputTransfer & {
  /** ipfs hash or a txid hash */
  message: string;
  /** utc time in seconds to expire the message */
  expire_time: number;
};

/**
 * @title OutputIssue
 * A json object describing new assets to issue
 */
type OutputIssue = {
  /** New asset name */
  asset_name: string;
  /** The number of raw units to issue */
  asset_quantity: number;
  /** Display units, between 1 (integral) to 8 (max precision) */
  units: number;
  /** [0-1] 1=reissuable asset */
  reissuable: number;
  /** [0-1] 1=passing ipfs_hash */
  has_ipfs: number;
  /** An ipfs hash for discovering asset metadata */
  ipfs_hash?: string;
};

/**
 * OutputIssueUnique
 * A json object describing new unique assets to issue
 */
type OutputIssueUnique = {
  /** Name of the asset the unique asset(s) */
  root_name: string;
  /** The unique tag for each asset which is to be issued. */
  asset_tags: string[];
  /** Ipfs hashes corresponding to each supplied tag. Should be same size as asset_tags. */
  ipfs_hashes?: string[];
};

/**
 * OutputReissue
 * A json object describing follow-on asset issue
 */
type OutputReissue = {
  /** Name of asset to be reissued */
  asset_name: string;
  /** The number of raw units to issue */
  asset_quantity: number;
  /** [0-1] Default is 1, 1=reissuable asset */
  reissuable?: number;
  /** An ipfs hash for discovering asset metadata. Overrides the current ipfs hash if given */
  ipfs_hash?: string;
  /** The address where the owner token will be sent to. If not given, it will be sent to the output address. */
  owner_change_address?: string;
};

/**
 * OutputIssueRestricted
 * A json object describing how restricted asset to issue
 */
type OutputIssueRestricted = {
  /** New asset name */
  asset_name: string;
  /** The number of raw units to issue */
  asset_quantity: number;
  /** The verifier string to be used for a restricted asset transfer verification */
  verifier_string: string;
  /** [0-8] Display units, between 0 (integral) and 8 (max precision) */
  units: number;
  /** [0-1] 1=reissuable asset */
  reissuable: number;
  /** [0-1] 1=passing ipfs_hash */
  has_ipfs: number;
  /** An ipfs hash for discovering asset metadata */
  ipfs_hash?: string;
  /** The address where the owner token will be sent to. If not given, it will be sent to the output address. */
  owner_change_address?: string;
};

/**
 * OutputReissueRestricted
 * A json object describing follow-on asset issue
 */
type OutputReissueRestricted = {
  /** Name of asset to be reissued */
  asset_name: string;
  /** The number of raw units to issue */
  asset_quantity: number;
  /** [0-1] Default is 1, 1=reissuable asset */
  reissuable?: number;
  /** The verifier string to be used for a restricted asset transfer verification */
  verifier_string?: string;
  /** An ipfs hash for discovering asset metadata. Overrides the current ipfs hash if given */
  ipfs_hash?: string;
  /** The address where the owner token will be sent to. If not given, it will be sent to the output address */
  owner_change_address?: string;
};

/**
 * OutputIssueQualifier
 * A json object describing a new qualifier to issue.
 */
type OutputIssueQualifier = {
  /** A qualifier name (starts with '#') */
  asset_name: string;
  /** Default = 1. The number of units to be issued (1 to 10) */
  asset_quantity?: number;
  /** Default = false. Whether ifps hash is going to be added to the asset */
  has_ipfs?: boolean;
  /** Optional but required if has_ipfs = 1. An ipfs hash or a txid hash once RIP5 is activated */
  ipfs_hash?: string;
  /** Only applies when issuing subqualifiers. The address where the root qualifier will be sent. If not specified, it will be sent to the output address. */
  root_change_address?: string;
  /** Default = 1. The asset change amount */
  change_quantity?: number;
};

/**
 * OutputTagAddresses
 * A json object describing addresses to be tagged. The address in the key will used as the asset change address.
 */
type OutputTagAddresses = {
  /** A qualifier name (starts with '#') */
  qualifier: string;
  /** The addresses to be tagged (up to 10) */
  addresses: string[];
  /** Defaut = 1. The asset change amount */
  change_quantity?: number;
};

/**
 * OutputUntagAddresses
 * A json object describing addresses to be untagged. The address in the key will be used as the asset change address.
 */
type OutputUntagAddresses = {
  /** A qualifier name (starts with '#') */
  qualifier: string;
  /** The addresses to be untagged (up to 10) */
  addresses: string[];
  /** Defaut = 1. The asset change amount */
  change_quantity?: number;
};

/**
 * OutputFreezeAddresses
 * A json object describing addresses to be frozen. The address in the key will used as the owner change address.
 */
type OutputFreezeAddresses = {
  /** A restricted asset name (starts with '$') */
  asset_name: string;
  /** The addresses to be frozen (up to 10) */
  addresses: string[];
};

/**
 * OutputUnfreezeAddresses
 * A json object describing addresses to be frozen. The address in the key will be used as the owner change address
 */
type OutputUnfreezeAddresses = {
  /** A restricted asset name (starts with '$') */
  asset_name: string;
  /** The addresses to be unfrozen (up to 10) */
  addresses: string[];
};

/**
 * OutputFreezeAsset
 * A json object describing an asset to be frozen. The address in the key will used as the owner change address.
 */
type OutputFreezeAsset = {
  /** A restricted asset name (starts with '$') */
  asset_name: string;
};

/**
 * @title OutputUnfreezeAsset
 * A json object describing an asset to be frozen. The address in the key will be used as the owner change address.
 */
type OutputUnfreezeAsset = {
  /** A restricted asset name (starts with '$') */
  asset_name: string;
};

/** DecodeRawTransaction */
export type DecodeRawTransaction = {
  hexstring: string;
};

/** DecodeRawTransactionResponse */
export type DecodeRawTransactionResponse = {
  /** The transaction id */
  txi: string;
  /** The transaction hash (differs from txid for witness transactions) */
  hash: string;
  /** The transaction size */
  size: number;
  /** The virtual transaction size (differs from size for witness transactions) */
  vsize: number;
  /** The version */
  version: number;
  /** The lock time */
  locktime: number;
  vin: DecodeRawTransactionVin[];
  vout: DecodeRawTransactionVout[];
};

/** DecodeRawTransactionVin */
type DecodeRawTransactionVin = {
  /** The transaction id */
  txid: string;
  /** The output number */
  vout: number;
  scriptSig: RawTransactionScriptSig;
  /** hex-encoded witness data (if any) */
  txinwitness?: string[];
  /** The script sequence number */
  sequence: number;
};

/** RawTransactionScriptSig */
type RawTransactionScriptSig = {
  asm: string;
  hex: string;
};

/** DecodeRawTransactionVout */
type DecodeRawTransactionVout = {
  /** The value in " + CURRENCY_UNIT + " */
  value: number;
  /** Index */
  n: number;
  scriptPubKey: DecodeRawTransactionVoutScriptPubKey;
};

/** DecodeRawTransactionVoutScriptPubKey */
type DecodeRawTransactionVoutScriptPubKey = {
  asm: string;
  hex: string;
  /** The required sigs */
  regSigs: number;
  /** The type, eg 'pubkeyhash' */
  type: string;
  asset?: DecodeRawTransactionVoutScriptPubKeyAsset;
  addresses: string[];
};

/** DecodeRawTransactionVoutScriptPubKeyAsset */
type DecodeRawTransactionVoutScriptPubKeyAsset = {
  /** The asset name */
  name: string;
  /** The amount of asset that was sent */
  amount: number;
  /** The message if one was sent */
  message?: string;
  /** The message epoch expiration time if one was set */
  expire_time?: number;
};

/** DecodeScript */
export type DecodeScript = {
  hexstring: string;
};

/** DecodeScriptResponse */
export type DecodeScriptResponse = {
  /** Script public key */
  asm: string;
  /** Hex encoded public key */
  hex: string;
  /** The output type */
  type: string;
  asset: DecodeScriptResponseAsset;
  addresses: string[];
  /**
   * Address of P2SH script wrapping this redeem script (not returned if the script is already a P2SH).
   * The following only appears if the script is an asset script
   */
  p2sh: string;
  /** Name of the asset. */
  asset_name?: string;
  /** The amount of assets interacted with. */
  amount?: number;
  /** (new_asset */
  /** The units of the asset. (Only appears in the type (new_asset)) */
  units?: number;
  /** (new_asset */
  /** If this asset is reissuable. (Only appears in type (new_asset|reissue_asset)) */
  reissuable?: boolean;
  /** (new_asset */
  /** If this asset has an IPFS hash. (Only appears in type (new_asset if hasIPFS is true)) */
  hasIPFS?: boolean;
  /** (new_asset */
  /** The ipfs hash for the new asset. (Only appears in type (new_asset)) */
  ipfs_hash?: string;
  /** If new ipfs hash (Only appears in type. (reissue_asset)) */
  new_ipfs_hash?: string;
};

/** DecodeScriptResponseAsset */
type DecodeScriptResponseAsset = {
  /** The asset name */
  name: string;
  /** The amount of asset that was sent */
  amount: number;
  /** The message if one was sent */
  message?: string;
  /** The message epoch expiration time if one was set */
  expire_time?: number;
};

/** SendRawTransaction */
export type SendRawTransaction = {
  hexstring: string;
  allowhighfees?: boolean;
};

/** CombineRawTransaction */
export type CombineRawTransaction = {
  /** A json array of hex strings of partially signed transactions */
  txs: CombineRawTransactionHexstring[];
};

/** CombineRawTransactionHexstring */
/** A transaction hash */
type CombineRawTransactionHexstring = string;

/** SignRawTransaction */
export type SignRawTransaction = {
  /**
   * The transaction hex string
   * An array of previous dependent transaction outputs
   */
  hexstring: string;
  /**
   * Array of json objects, or 'null' if none provided
   * A json array of base58-encoded private keys for signing
   */
  prevtxs?: SignRawTransactionPrevTxs[];
  /** Array of strings, or 'null' if none provided. Private key in base58-encoding */
  privkeys?: string[];
  sighashtype?:
    | 'ALL'
    | 'NONE'
    | 'SINGLE'
    | 'ALL|ANYONECANPAY'
    | 'NONE|ANYONECANPAY'
    /** Default = ALL. The signature hash type */
    | 'SINGLE|ANYONECANPAY';
};

/** SignRawTransactionPrevTxs */
export type SignRawTransactionPrevTxs = {
  /** The transaction id */
  txid: string;
  /** The output number */
  vout: number;
  /** Script key */
  scriptPubKey: string;
  /** Redeem script. Required for P2SH or P2WSH. */
  redeemScript: string;
  /** The amount spent */
  amount: number;
};

/** SignRawTransactionResponse */
export type SignRawTransactionResponse = {
  /** The hex-encoded raw transaction with signature(s) */
  hex: string;
  /**
   * If the transaction has a complete set of signatures
   * Script verification errors (if there are any)
   */
  complete: boolean;
  errors?: SignRawTransactionErrors[];
};

/** SignRawTransactionErrors */
export type SignRawTransactionErrors = {
  /** The hash of the referenced, previous transaction */
  txid: string;
  /** The index of the output to spent and used as input */
  vout: number;
  /** The hex-encoded signature script */
  scriptSig: string;
  /** Script sequence number */
  sequence: number;
  /** Verification or signing error related to the input */
  error: string;
};

/** TestMempoolAccept */
export type TestMempoolAccept = {
  /** An array of hex strings of raw transactions. Length must be one for now. */
  rawtxs: string[];
  /** Default = false. Allow high fees. */
  allowhighfees?: boolean;
};

/** TestMempoolAcceptResponse */
export type TestMempoolAcceptResponse = AcceptanceTest[];

/** AcceptanceTest */
export type AcceptanceTest = {
  /** The transaction hash in hex */
  txid: string;
  /** If the mempool allows this tx to be inserted */
  allowed: boolean;
  /** Rejection string (only present when 'allowed' is false) */
  'reject-reason': string;
};

/** GetTxOutProof */
export type GetTxOutProof = {
  /**
   * An array of txids to filter
   * A transaction hash
   */
  txids: string[];
  /** If specified, looks for txid in the block with this hash */
  blockhash?: string;
};

/** GetTxOutProofResponse */
export type GetTxOutProofResponse = {
  data: string;
};

/** VerifyTxOutProof */
export type VerifyTxOutProof = {
  proof: string;
};

/** VerifyTxOutProofResponse */
export type VerifyTxOutProofResponse = {
  txid: string[];
};
