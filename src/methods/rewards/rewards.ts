// https://github.com/AvianNetwork/Avian/blob/master/src/rpc/rewards.cpp

import { IClient } from '@/types';
import {
  CancelSnapshotRequest,
  CancelSnapshotRequestResponse,
  DistributeReward,
  DistributeRewardResponse,
  GetDistributeStatus,
  GetDistributeStatusResponse,
  GetSnapshotRequest,
  GetSnapshotRequestResponse,
  ListSnapshotRequests,
  ListSnapshotRequestsResponse,
  RequestSnapshot,
  RequestSnapshotResponse,
} from './types';

/**
 * @class Rewards
 * @subcategory Methods
 */
export class Rewards {
  private _client: IClient;

  constructor(client: IClient) {
    this._client = client;
  }

  /**
   * Schedules a snapshot of the specified asset at the specified block height.
   * @param params
   * @param {string} params.asset_name   The asset name for which the snapshot will be taken
   * @param {number} params.block_height The block height at which the snapshot will be take
   * @returns {Promise} Object - { request_status: 'Added' }
   */
  requestSnapshot({
    asset_name,
    block_height,
  }: RequestSnapshot): Promise<RequestSnapshotResponse> {
    const data = [asset_name, block_height];
    return this._client.request('requestsnapshot', data);
  }

  /**
   * Retrieves the specified snapshot request details.
   * @param params
   * @param {string} params.asset_name   The asset name for which the snapshot will be taken
   * @param {number} params.block_height The block height at which the snapshot will be take
   * @returns {Promise} Returns the asset_name and block_height
   */
  getSnapshotRequest({
    asset_name,
    block_height,
  }: GetSnapshotRequest): Promise<GetSnapshotRequestResponse> {
    const data = [asset_name, block_height];
    return this._client.request('getsnapshotrequest', data);
  }

  /**
   * List snapshot request details.
   * @param params
   * @param {string=} params.asset_name   List only requests for a specific asset (default is \"\" for ALL)
   * @param {number=} params.block_height List only requests for a particular block height (default is 0 for ALL)
   * @returns {Promise} Array of objects containing asset_name and block_height
   */
  listSnapshotRequests({
    asset_name,
    block_height,
  }: ListSnapshotRequests): Promise<ListSnapshotRequestsResponse[]> {
    const data = [];
    if (asset_name) {
      data.push(block_height);
    }
    if (block_height) {
      if (!asset_name) {
        throw new Error('missing asset_name');
      }
      data.push(block_height ?? 0);
    }
    return this._client.request('listsnapshotrequests', data);
  }

  /**
   * Cancels the specified snapshot request.
   * @param params
   * @param {string} params.asset_name   The asset name for which the snapshot will be taken
   * @param {number} params.block_height The block height at which the snapshot will be take
   * @returns {Promise} Returns the request status
   */
  cancelSnapshotRequest({
    asset_name,
    block_height,
  }: CancelSnapshotRequest): Promise<CancelSnapshotRequestResponse> {
    const data = [asset_name, block_height];
    return this._client.request('cancelsnapshotrequest', data);
  }

  /**
   * Splits the specified amount of the distribution asset to all owners of asset_name that are not in the optional exclusion_addresses
   * @param params
   * @param {string}  params.asset_name                The reward will be distributed all owners of this asset
   * @param {number}  params.snapshot_height           The block height of the ownership snapshot
   * @param {string}  params.distribution_asset_name   The name of the asset that will be distributed, or AVN
   * @param {number}  params.gross_distribution_amount The amount of the distribution asset that will be split amongst all owners
   * @param {string=} params.exception_addresses       Ownership addresses that should be excluded
   * @param {string=} params.change_address            If the rewards can't be fully distributed. The change will be sent to this address
   * @returns {Promise}
   */
  distributeReward({
    asset_name,
    snapshot_height,
    distribution_asset_name,
    gross_distribution_amount,
    exception_addresses,
    change_address,
  }: DistributeReward): Promise<DistributeRewardResponse> {
    const data = [
      asset_name,
      snapshot_height,
      distribution_asset_name,
      gross_distribution_amount,
    ];
    if (exception_addresses) {
      data.push(exception_addresses);
    }
    if (change_address) {
      if (!exception_addresses) {
        throw new Error('missing exception_addresses');
      }
      data.push(change_address);
    }
    return this._client.request('distributereward', data);
  }

  /**
   * Give information about the status of the distribution
   * @param params
   * @param {string}  parasm.asset_name                The reward will be distributed all owners of this asset\n"
   * @param {number}  parasm.snapshot_height           The block height of the ownership snapshot\n"
   * @param {string}  parasm.distribution_asset_name   The name of the asset that will be distributed, or AVN\n"
   * @param {number}  parasm.gross_distribution_amount The amount of the distribution asset that will be split amongst all owners\n"
   * @param {string=} parasm.exception_addresses       Ownership addresses that should be excluded\n"
   * @returns {Promise}
   */
  getDistributeStatus({
    asset_name,
    snapshot_height,
    distribution_asset_name,
    gross_distribution_amount,
    exception_addresses,
  }: GetDistributeStatus): Promise<string | GetDistributeStatusResponse> {
    const data = [
      asset_name,
      snapshot_height,
      distribution_asset_name,
      gross_distribution_amount,
    ];
    if (exception_addresses) {
      data.push(exception_addresses);
    }
    return this._client.request('getdistributestatus', data);
  }
}
