export type Issue = {
  asset_name: string;
  qty?: number;
  to_address?: string;
  change_address?: string;
  units?: number;
  reissuable?: boolean;
  has_ipfs?: boolean;
  ipfs_hash?: string;
};

export type IssueUnique = {
  root_name: string;
  asset_tags: string[];
  ipfs_hashes?: string[];
  to_address?: string;
  change_address?: string;
};

export type ListMyAssets = {
  asset?: string;
  verbose?: boolean;
  count?: number;
  start?: number;
  confs?: number;
};

export type ListAssetBalanceByAddress = {
  address: string;
  onlytotal?: boolean;
  count?: number;
  start?: number;
};

export type GetAssetData = {
  asset_name: string;
};

export type GetAssetDataResponse = {
  name: string;
  amount: number;
  units: number;
  reissuable: number;
  has_ipfs: number;
  ipfs_hash?: string;
  txid_hash?: string;
  verifier_string: string;
};

export type ListAddressesByAsset = {
  asset_name: string;
  onlytotal?: boolean;
  count?: number;
  start?: number;
};

export type TransferFromAddress = {
  asset_name: string;
  from_addresses: string;
  qty: number;
  to_address: string;
  message?: string;
  expire_time?: number;
  avn_change_address?: string;
  asset_change_address?: string;
};

export type TransferFromAddresses = {
  asset_name: string;
  from_addresses: string[];
  qty: number;
  to_address: string;
  message?: string;
  expire_time?: number;
  avn_change_address?: string;
  asset_change_address?: string;
};

export type Transfer = {
  asset_name: string;
  qty: number;
  to_address: string;
  message?: string;
  expire_time?: number;
  change_address?: string;
  asset_change_address?: string;
};

export type Reissue = {
  asset_name: string;
  qty: number;
  to_address: string;
  change_address?: string;
  reissuable?: boolean;
  new_units?: number;
  new_ipfs?: string;
};

export type ListAssets = {
  asset?: string;
  verbose?: boolean;
  count?: number;
  start?: number;
};

export type ListAssetsResponse = {
  name: string;
  amount: number;
  units: number;
  reissuable: number;
  has_ipfs: number;
  block_height: number;
  blockhash: string;
};

export type GetCacheInfoResponse = {
  'uxto cache size': number;
  'asset total (exclude dirty)': number;
  'reissue tracking (memory only)': number;
  'asset data': {
    'asset address balance': number;
    'reissue data': number;
  };
  'asset metadata map': number;
  'asset metadata list (est)': number;
  'dirty cache (est)': number;
  'dirty cache V2 (est)': number;
};

export type TransferQualifier = {
  qualifier_name: string;
  qty: number;
  to_address: string;
  change_address?: string;
  message?: string;
  expire_time?: number;
};

export type IssueRestrictedAsset = {
  asset_name: string;
  qty: number;
  verifier: string;
  to_address: string;
  change_address?: string;
  units?: number;
  reissuable?: boolean;
  has_ipfs?: boolean;
  ipfs_hash?: string;
};

export type IssueQualifierAsset = {
  asset_name: string;
  qty?: number;
  to_address?: string;
  change_address?: string;
  has_ipfs?: boolean;
  ipfs_hash?: string;
};

export type ReissueRestrictedAsset = {
  asset_name: string;
  qty: number;
  to_address: string;
  change_verifier?: boolean;
  new_verifier?: string;
  change_address?: string;
  new_units?: number;
  reissuable?: boolean;
  new_ipfs?: string;
};

export type AddTagToAddress = {
  tag_name: string;
  to_address: string;
  change_address?: string;
  asset_data?: string;
};

export type RemoveTagFromAddress = {
  tag_name: string;
  to_address: string;
  change_address?: string;
  asset_data?: string;
};

export type FreezeAddress = {
  asset_name: string;
  address: string;
  change_address?: string;
  asset_data?: string;
};

export type UnfreezeAddress = {
  asset_name: string;
  address: string;
  change_address?: string;
  asset_data?: string;
};

export type FreezeRestrictedAsset = {
  asset_name: string;
  change_address?: string;
  asset_data?: string;
};

export type UnfreezeRestrictedAsset = {
  asset_name: string;
  change_address?: string;
  asset_data?: string;
};

export type ListAddressesForTag = {
  tag_name: string;
};

export type ListTagsForAddress = {
  address: string;
};

export type ListAddressRestrictions = {
  address: string;
};

export type GetVerifierString = {
  restricted_name: string;
};

export type CheckAddressTag = {
  address: string;
  tag_name: string;
};

export type CheckAddressRestriction = {
  address: string;
  restricted_name: string;
};

export type CheckGlobalRestriction = {
  restricted_name: string;
};

export type IsValidVerifierString = {
  verifier_string: string;
};

export type GetSnapshot = {
  asset_name: string;
  block_height: number;
};

export type GetSnapshotResponse = {
  name: string;
  height: number;
  owners: SnapshotOwner[];
};

export type SnapshotOwner = {
  address: string;
  amount_owned: number;
};

export type PurgeSnapshot = {
  asset_name: string;
  block_height: number;
};

export type PurgeSnapshotResponse = {
  name: string;
  height: number;
};
