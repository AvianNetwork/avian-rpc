/** FundRawTransaction */
export type FundRawTransaction = {
  hexstring: string;
  options?: FundRawTransactionOptions;
};

/** FundRawTransactionOptions */
export type FundRawTransactionOptions = {
  /** Default pool address. The avian address to receive the change */
  changeAddress?: string;
  /** Default random. The index of the change output */
  changePosition?: number;
  /** Default false. Also select inputs which are watch only */
  includeWatching?: boolean;
  /** Default false. Lock selected unspent outputs */
  lockUnspents?: boolean;
  /** Default not set: makes wallet determine the fee) Set a specific fee rate in " + CURRENCY_UNIT + "/kB */
  feeRate?: number;
  /** A json array of integers.
   * The fee will be equally deducted from the amount of each specified output.
   * The outputs are specified by their zero-based index, before any change output is added.
   * Those recipients will receive less avians than you enter in their corresponding amount field.
   * If no outputs are specified here, the sender pays the fee.
   * [vout_index,...]
   */
  subtractFeeFromOutputs: number[];
  /** Marks this transaction as BIP125 replaceable. */
  /** Allows this transaction to be replaced by a transaction with higher fees */
  replaceable?: boolean;
  /** Confirmation target (in blocks) */
  conf_target?: number;
  /** Default = 'UNSET'. The fee estimate mode, must be one of: */
  estimate_mode: 'UNSET' | 'ECONOMICAL' | 'CONSERVATIVE';
};

/** FundRawTransactionResponse */
export type FundRawTransactionResponse = {
  /** The resulting raw transaction (hex-encoded string) */
  hex: string;
  /** Fee in " + CURRENCY_UNIT + " the resulting transaction pays */
  fee: number;
  /** The position of the added change output, or -1 */
  changepos: number;
};

/** AbandonTransaction */
export type AbandonTransaction = { txid: string };

/** AddMultisigAddress */
export type AddMultisigAddress = {
  nrequired: number;
  keys: string[];
  account?: string;
};

/** AddMultisigAddressResponse */
export type AddMultisigAddressResponse = {
  address: string;
};

/** AddWitnessAddress */
export type AddWitnessAddress = { address: string };

/** AddWitnessAddressResponse */
export type AddWitnessAddressResponse = {
  witnessaddress: string;
};

/** BackupWallet */
export type BackupWallet = { destination: string };

/** BumpFee */
export type BumpFee = { txid: string; options: BumpFeeOptions };

/** BumpFeeOptions */
export type BumpFeeOptions = {
  /** Confirmation target (in blocks) */
  confTarget?: number;
  /**
   * Total fee (NOT feerate) To pay, in satoshis.
   * In rare cases, the actual fee paid might be slightly higher than the specified totalFee if the tx change output has to be removed because it is too close to the dust threshold.
   * */
  totalFee?: number;
  /**
   * Default = true. Whether the new transaction should still be
   * marked bip-125 replaceable. If true, the sequence numbers in the transaction will
   * be left unchanged from the original. If false, any input sequence numbers in the
   * original transaction that were less than 0xfffffffe will be increased to 0xfffffffe
   * so the new transaction will not be explicitly bip-125 replaceable (though it may
   * still be replaceable in practice, for example if it has unconfirmed ancestors which are replaceable).
   */
  replaceable?: boolean;
  /** Default = UNSET. The fee estimate mode, must be one of: */
  estimate_mode?: 'UNSET' | 'ECONOMICAL' | 'CONSERVATIVE';
};

/** BumpFeeResponse */
export type BumpFeeResponse = {
  /** The id of the new transaction */
  txid: string;
  /** Fee of the replaced transaction */
  origfee: number;
  /** Fee of the new transaction */
  fee: number;
  /** Json array of strings. Errors encountered during processing (may be empty) */
  errors: string[];
};

/** DumpPrivKey */
export type DumpPrivKey = { address: string };

/** DumpPrivKeyResponse */
export type DumpPrivKeyResponse = {
  /** The private key */
  key: string;
};

/** DumpWallet */
export type DumpWallet = { filename: string };

/** DumpWalletResponse */
export type DumpWalletResponse = {
  filename: string;
};

/** EncryptWallet */
export type EncryptWallet = { passphrase: string };

/** GetAccountAddress */
export type GetAccountAddress = { account: string };

/** GetAccountAddressResponse */
export type GetAccountAddressResponse = {
  /** The account avian address */
  address: string;
};

/** GetAccount */
export type GetAccount = { address: string };

/** GetAccountResponse */
export type GetAccountResponse = {
  accountname: string;
};

/** GetAddressesByAccount */
export type GetAddressesByAccount = { account: string };

/** GetAddressesByAccountResponse */
export type GetAddressesByAccountResponse = {
  address: string;
};

/** GetBalance */
export type GetBalance = {
  account?: string;
  minconf?: number;
  include_watchonly?: boolean;
};

/** GetBalanceResponse */
export type GetBalanceResponse = {
  account: number;
};

/** GetMasterKeyInfoResponse */
export type GetMasterKeyInfoResponse = {
  /** Extended master private key, */
  bip32_root_private: string;
  /** Extended master public key, */
  bip32_root_public: string;
  /** The derivation path to the account public/private keys */
  account_derivation_path: string;
  /** Extended account private key, */
  account_extended_private_key: string;
  /** Extended account public key, */
  account_extended_public_key: string;
};

/** GetMyWordsResponse */
export type GetMyWordsResponse = {
  /** A string of words separated by spaces */
  word_list: string;
  /** Only show if passphrase was used when creating the wallet */
  passphrase?: string;
};

/** GetNewAddress */
export type GetNewAddress = { account?: string };

/** GetNewAddressResponse */
export type GetNewAddressResponse = {
  /** The new avian address */
  address: string;
};

/** GetRawChangeAddressResponse */
export type GetRawChangeAddressResponse = {
  /** The address */
  address: string;
};

/** GetReceivedByAccount */
export type GetReceivedByAccount = { account: string; minconf?: number };

/** GetReceivedByAccountResponse */
export type GetReceivedByAccountResponse = {
  /** The total amount in " + CURRENCY_UNIT + " received for this account. */
  amount: number;
};

/** GetReceivedByAddress */
export type GetReceivedByAddress = { address: string; minconf?: number };

/** GetReceivedByAddressResponse */
export type GetReceivedByAddressResponse = {
  /** The total amount in " + CURRENCY_UNIT + " received at this address. */
  amount: number;
};

/** GetTransaction */
export type GetTransaction = { txid: string; include_watchonly?: boolean };

/** GetTransactionResponse */
export type GetTransactionResponse = {
  /** The transaction amount in " + CURRENCY_UNIT + " */
  amount: number;
  /** The amount of the fee in " + CURRENCY_UNIT + ". This is negative and only available for the 'send' category of transactions. */
  fee: number;
  /** The number of confirmations */
  confirmations: number;
  /** The block hash */
  blockhash: number;
  /** The index of the transaction in the block that includes it */
  blockindex: number;
  /** The time in seconds since epoch (1 Jan 1970 GMT) */
  blocktime: number;
  /** The transaction id. */
  txid: number;
  /** The transaction time in seconds since epoch (1 Jan 1970 GMT) */
  time: number;
  /** The time received in seconds since epoch (1 Jan 1970 GMT) */
  timereceived: number;
  /** Whether this transaction could be replaced due to BIP125 (replace-by-fee); */
  'bip125-replaceable': 'yes' | 'no' | 'unknown';
  /** May be unknown for unconfirmed transactions not in the mempool */
  details?: GetTransactionResponseDetails[];
  asset_details: GetTransactionResponseAssetDetails[];
  /** Raw data for transaction */
  hex: string;
};

/** GetTransactionResponseDetails */
type GetTransactionResponseDetails = {
  /** DEPRECATED. The account name involved in the transaction, can be \"\" for the default account. */
  account?: string;
  /** The avian address involved in the transaction */
  address: string;
  /** The category, either 'send' or 'receive' */
  category: string;
  /** The amount in " + CURRENCY_UNIT + " */
  amount: number;
  /** A comment for the address/transaction, if any */
  label: string;
  /** The vout value */
  vout: number;
  /** The amount of the fee in " + CURRENCY_UNIT + ". This is negative and only available for the 'send' category of transactions. */
  fee: number;
  /** 'true' if the transaction has been abandoned (inputs are respendable). Only available for the 'send' category of transactions. */
  abandoned: boolean;
};

/** GetTransactionResponseAssetDetails */
type GetTransactionResponseAssetDetails = {
  /** The type of asset transaction */
  asset_type: 'new_asset' | 'transfer_asset' | 'reissue_asset';
  /** The name of the asset */
  asset_name: string;
  /** The amount in " + CURRENCY_UNIT + " */
  amount: number;
  /** The avian address involved in the transaction */
  address: string;
  /** The vout value */
  vout: number;
  /** The category, either 'send' or 'receive' */
  category: 'send' | 'receive';
};

/** GetWalletInfoResponse */
export type GetWalletInfoResponse = {
  /** The wallet name */
  walletname: string;
  /** The wallet version */
  walletversion: number;
  /** The total confirmed balance of the wallet in " + CURRENCY_UNIT + " */
  balance: number;
  /** The total unconfirmed balance of the wallet in " + CURRENCY_UNIT + " */
  unconfirmed_balance: number;
  /** The total immature balance of the wallet in " + CURRENCY_UNIT + " */
  immature_balance: number;
  /** The total number of transactions in the wallet */
  txcount: number;
  /** The timestamp (seconds since Unix epoch) of the oldest pre-generated key in the key pool */
  keypoololdest: number;
  /** How many new keys are pre-generated (only counts external keys) */
  keypoolsize: number;
  /** How many new keys are pre-generated for internal use (used for change outputs, only appears if the wallet is using this feature, otherwise external keys are used) */
  keypoolsize_hd_internal: number;
  /** The timestamp in seconds since epoch (midnight Jan 1 1970 GMT) That the wallet is unlocked for transfers, or 0 if the wallet is locked */
  unlocked_until: number;
  /** The transaction fee configuration, set in " + CURRENCY_UNIT + "/kB */
  paytxfee: number;
  /** The Hash160 of the HD seed (only present when HD is enabled) */
  hdseedid?: string;
  /** Alias for hdseedid retained for backwards-compatibility. Will be removed in V0.18. */
  hdmasterkeyid?: string;
};

/** ImportMulti */
export type ImportMulti = {
  requests: ImportMultiRequests[];
  options?: ImportMultiOptions;
};

/** ImportMultiRequests */
type ImportMultiRequests = {
  /** { \"address\":\"<address>\" } Type of scriptPubKey (string for script, json for address) */
  scriptPubKey: string;
  /**
   * Creation time of the key in seconds since epoch (Jan 1 1970 GMT),
   * or the string \"now\" to substitute the current synced blockchain time. The timestamp of the oldest
   * key will determine how far back blockchain rescans need to begin for missing wallet transactions.
   * \"now\" can be specified to bypass scanning, for keys which are known to never have been used, and
   * 0 can be specified to scan the entire blockchain. Blocks up to 2 hours before the earliest key
   * creation time of all keys being imported by the importmulti call will be scanned.
   */
  timestamp: number;
  /** Allowed only if the scriptPubKey is a P2SH address or a P2SH scriptPubKey */
  redeemscript?: string;
  /** Array of strings giving pubkeys that must occur in the output or redeemscript */
  pubkeys?: string[];
  /** Array of strings giving private keys whose corresponding public keys must occur in the output or redeemscript */
  keys?: string[];
  /** Default = false. Stating whether matching outputs should be treated as not incoming payments */
  internal?: boolean;
  /** Default = false. Stating whether matching outputs should be considered watched even when they're not spendable, only allowed if keys are empty */
  watchonly?: boolean;
  /** Label to assign to the address (aka account name, for now), only allowed with internal=false */
  label?: string;
};

/** ImportMultiOptions */
export type ImportMultiOptions = {
  /** Default = true. Stating if should rescan the blockchain after all imports */
  rescan?: boolean;
};

/** ImportMultiResponse */
export type ImportMultiResponse = {
  success: boolean;
  error?: {
    code: number;
    message: string;
  };
};

/** ImportPrivKey */
export type ImportPrivKey = {
  privkey: string;
  label?: string;
  rescan?: boolean;
};

/** ImportWallet */
export type ImportWallet = { filename: string };

/** ImportAddress */
export type ImportAddress = {
  script: string;
  label?: string;
  rescan?: boolean;
  p2sh?: boolean;
};

/** ImportPrunedFunds */
export type ImportPrunedFunds = { rawtransaction: string; txoutproof: string };

/** ImportPubKey */
export type ImportPubKey = { pubkey: string; label?: string; rescan?: boolean };

/** KeypoolRefill */
export type KeypoolRefill = { newsize?: number };

/** ListAccounts */
export type ListAccounts = { minconf?: number; include_watchonly?: boolean };

/** ListAccountsResponse */
export type ListAccountsResponse = {
  /** The property name is the account name, and the value is the total balance for the account. */
  [key: string]: number;
};

/** ListAddressGroupingsResponse */
export type ListAddressGroupingsResponse = {
  /** The avian address and the amount in " + CURRENCY_UNIT + " OR DEPRECATED. The account */
  [key: string]: number | string;
};

/** ListLockUnspentResponse */
export type ListLockUnspentResponse = {
  /** The transaction id locked */
  txid: string;
  /** The vout value */
  vout: number;
};

/** ListReceivedByAccount */
export type ListReceivedByAccount = {
  minconf?: number;
  include_empty?: boolean;
  include_watchonly?: boolean;
};

/** ListReceivedByAccountResponse */
export type ListReceivedByAccountResponse = {
  /** Only returned if imported addresses were involved in transaction */
  involvesWatchonly: boolean;
  /** The account name of the receiving account */
  account: string;
  /** The total amount received by addresses with this account */
  amount: number;
  /** The number of confirmations of the most recent transaction included */
  confirmations: number;
  /** A comment for the address/transaction, if any */
  label: string;
};

/** ListReceivedByAddress */
export type ListReceivedByAddress = {
  minconf?: number;
  include_empty?: boolean;
  include_watchonly?: boolean;
};

/** ListReceivedByAddressResponse */
export type ListReceivedByAddressResponse = {
  /** Only returned if imported addresses were involved in transaction */
  involvesWatchonly: boolean;
  /** The receiving address */
  address: string;
  /** DEPRECATED. The account of the receiving address. The default account is \"\". */
  account?: string;
  /** The total amount in " + CURRENCY_UNIT + " received by the address */
  amount: number;
  /** The number of confirmations of the most recent transaction included */
  confirmations: number;
  /** A comment for the address/transaction, if any */
  label: string;
  /** Array of transaction ids received with the address */
  txids: string[];
};

/** ListSinceBlock */
export type ListSinceBlock = {
  blockhash?: string;
  target_confirmations?: number;
  include_watchonly?: boolean;
  include_removed?: boolean;
};

/** ListSinceBlockResponse */
export type ListSinceBlockResponse = {
  transactions: ListSinceBlockResponseTransaction[];
  /** <structure is the same as \"transactions\" above, only present if include_removed=true>. Note: transactions that were readded in the active chain will appear as-is in this array, and may thus have a positive confirmation count. */
  removed: ListSinceBlockResponseTransaction[];
  /** The hash of the block (target_confirmations-1) from the best block on the main chain. This is typically used to feed back into listsinceblock the next time you call it. So you would generally use a target_confirmations of say 6, so you will be continually re-notified of transactions until they've reached 6 confirmations plus any new ones */
  lastblock: string;
};

/** ListSinceBlockResponseTransaction */
type ListSinceBlockResponseTransaction = {
  /** DEPRECATED. The account name associated with the transaction. Will be \"\" for the default account. */
  account?: string;
  /** The avian address of the transaction. Not present for move transactions (category = move). */
  address: string;
  /** The transaction category. 'send' has negative amounts, 'receive' has positive amounts. */
  category: string;
  /** The amount in " + CURRENCY_UNIT + ". This is negative for the 'send' category, and for the 'move' category for moves outbound. It is positive for the 'receive' category, and for the 'move' category for inbound funds. */
  amount: number;
  /** The vout value */
  vout: number;
  /** The amount of the fee in " + CURRENCY_UNIT + ". This is negative and only available for the 'send' category of transactions. */
  fee: number;
  /** The number of confirmations for the transaction. Available for 'send' and 'receive' category of transactions. When it's < 0, it means the transaction conflicted that many blocks ago. */
  confirmations: number;
  /** The block hash containing the transaction. Available for 'send' and 'receive' category of transactions. */
  blockhash: number;
  /** The index of the transaction in the block that includes it. Available for 'send' and 'receive' category of transactions. */
  blockindex: number;
  /** The block time in seconds since epoch (1 Jan 1970 GMT). */
  blocktime: number;
  /** The transaction id. Available for 'send' and 'receive' category of transactions. */
  txid: string;
  /** The transaction time in seconds since epoch (Jan 1 1970 GMT). */
  time: number;
  /** The time received in seconds since epoch (Jan 1 1970 GMT). Available for 'send' and 'receive' category of transactions. */
  timereceived: number;
  /** Whether this transaction could be replaced due to BIP125 (replace-by-fee); may be unknown for unconfirmed transactions not in the mempool */
  'bip125-replaceable': 'yes' | 'no' | 'unknown';
  /** 'true' if the transaction has been abandoned (inputs are respendable). Only available for the 'send' category of transactions. */
  abandoned: boolean;
  /** If a comment is associated with the transaction. */
  comment: string;
  /** A comment for the address/transaction, if any */
  label: string;
  /** If a comment to is associated with the transaction. */
  to: string;
};

/** ListTransactions */
export type ListTransactions = {
  account?: string;
  count?: number;
  skip?: number;
  include_watchonly?: boolean;
};

/** ListTransactionsResponse */
export type ListTransactionsResponse = {
  /** DEPRECATED. The account name associated with the transaction. It will be \"\" for the default account. */
  account?: string;
  /** The avian address of the transaction. Not present for move transactions (category = move). */
  address: string;
  /** The transaction category. 'move' is a local (off blockchain) Transaction between accounts, and not associated with an address, transaction id or block. 'send' and 'receive' transactions are associated with an address, transaction id and block details */
  category: string;
  /** The amount in " + CURRENCY_UNIT + ". This is negative for the 'send' category, and for the 'move' category for moves outbound. It is positive for the 'receive' category, and for the 'move' category for inbound funds. */
  amount: number;
  /** A comment for the address/transaction, if any */
  label: string;
  /** The vout value */
  vout: number;
  /** The amount of the fee in " + CURRENCY_UNIT + ". This is negative and only available for the 'send' category of transactions. */
  fee: number;
  /** The number of confirmations for the transaction. Available for 'send' and 'receive' category of transactions. Negative confirmations indicate the transaction conflicts with the block chain */
  confirmations: number;
  /** Whether we consider the outputs of this unconfirmed transaction safe to spend. */
  trusted: boolean;
  /** The block hash containing the transaction. Available for 'send' and 'receive' category of transactions. */
  blockhash: number;
  /** The index of the transaction in the block that includes it. Available for 'send' and 'receive' category of transactions. */
  blockindex: number;
  /** The block time in seconds since epoch (1 Jan 1970 GMT). */
  blocktime: number;
  /** The transaction id. Available for 'send' and 'receive' category of transactions. */
  txid: number;
  /** The transaction time in seconds since epoch (midnight Jan 1 1970 GMT). */
  time: number;
  /** The time received in seconds since epoch (midnight Jan 1 1970 GMT). Available for 'send' and 'receive' category of transactions. */
  timereceived: number;
  /** If a comment is associated with the transaction. */
  comment: string;
  /** DEPRECATED. For the 'move' category of transactions, the account the funds came from (for receiving funds, positive amounts), or went to (for sending funds, negative amounts). */
  otheraccount?: string;
  /** Whether this transaction could be replaced due to BIP125 (replace-by-fee); may be unknown for unconfirmed transactions not in the mempool */
  'bip125-replaceable': 'yes' | 'no' | 'unknown';
  /** 'true' if the transaction has been abandoned (inputs are respendable). Only available for the 'send' category of transactions. */
  abandoned: boolean;
};

/** ListUnspent */
export type ListUnspent = {
  minconf?: number;
  maxconf?: number;
  addresses: string[];
  include_unsafe?: boolean;
  query_options?: ListUnspentQueryOptions;
};

/** ListUnspentQueryOptions */
export type ListUnspentQueryOptions = {
  /** Default = 0. Minimum value of each UTXO in " + CURRENCY_UNIT + " */
  minimumAmount: string | number;
  /** Default = unlimited. Maximum value of each UTXO in " + CURRENCY_UNIT + " */
  maximumAmount: string | number;
  /** Default = unlimited. Maximum number of UTXOs */
  maximumCount: string | number;
  /** Default = unlimited. Minimum sum value of all UTXOs in " + CURRENCY_UNIT + " */
  minimumSumAmount: string | number;
};

/** ListUnspentResponse */
export type ListUnspentResponse = {
  /** The transaction id */
  txid: string;
  /** The vout value */
  vout: number;
  /** The avian address */
  address: string;
  /** DEPRECATED. The associated account, or \"\" for the default account */
  account?: string;
  /** The script key */
  scriptPubKey: string;
  /** The transaction output amount in " + CURRENCY_UNIT + " */
  amount: number;
  /** The number of confirmations */
  confirmations: number;
  /** The redeemScript if scriptPubKey is P2SH */
  redeemScript: string;
  /** Whether we have the private keys to spend this output */
  spendable: boolean;
  /** Whether we know how to spend this output, ignoring the lack of keys */
  solvable: boolean;
  /** Whether this output is considered safe to spend. Unconfirmed transactions from outside keys and unconfirmed replacement transactions are considered unsafe and are not eligible for spending by fundrawtransaction and sendtoaddress. */
  safe: boolean;
};

/** LockUnspent */
export type LockUnspent = {
  unlock: boolean;
  transactions: LockUnspentTransaction[];
};

/** LockUnspentTransaction */
type LockUnspentTransaction = {
  /** The transaction id */
  txid: string;
  /** The output number */
  vout: number;
};

/** MoveCmd */
export type MoveCmd = {
  fromaccount: string;
  toaccount: string;
  amount: number;
  dummy?: number;
  comment?: string;
};

/** SendFrom */
export type SendFrom = {
  fromaccount: string;
  toaddress: string;
  amount: string | number;
  minconf?: number;
  comment?: string;
  comment_to?: string;
};

/** SendMany */
export type SendMany = {
  fromaccount: string;
  amounts: SendManyAmounts;
  minconf?: number;
  comment?: string;
  subtractfeefrom?: string[];
  conf_target?: number;
  estimate_mode: 'UNSET' | 'ECONOMICAL' | 'CONSERVATIVE';
};

/** SendManyAmounts */
type SendManyAmounts = {
  [key: string]: string | number;
};

/** SendToAddress */
export type SendToAddress = {
  address: string;
  amount: string | number;
  comment?: string;
  comment_to?: string;
  subtractfeefromamount?: boolean;
  conf_target?: number;
  estimate_mode?: 'UNSET' | 'ECONOMICAL' | 'CONSERVATIVE';
};

/** SendFromAddress */
export type SendFromAddress = {
  from_address: string;
  to_address: string;
  amount: number | string;
  comment?: string;
  comment_to?: string;
  subtractfeefromamount?: boolean;
  conf_target?: number;
  estimate_mode?: string;
};

/** SetAccount */
export type SetAccount = { address: string; account: string };

/** SetTxFee */
export type SetTxFee = { amount: string | number };

/** SignMessage */
export type SignMessage = { address: string; message: string };

/** WalletPassphraseChange */
export type WalletPassphraseChange = {
  oldpassphrase: string;
  newpassphrase: string;
};

/** WalletPassphrase */
export type WalletPassphrase = { passphrase: string; timeout: number };

/** RemovePrunedFunds */
export type RemovePrunedFunds = { txid: string };

/** RescanBlockchain */
export type RescanBlockchain = { start_height?: number; stop_height?: number };

/** RescanBlockchainResponse */
export type RescanBlockchainResponse = {
  /** The block height where the rescan has started. If omitted, rescan started from the genesis block. */
  start_height: number;
  /** The height of the last rescanned block. If omitted, rescan stopped at the chain tip. */
  stop_height: number;
};

/** Generate */
export type Generate = { nblocks: number; maxtries?: number };
