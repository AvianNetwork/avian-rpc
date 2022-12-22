import { IClient } from '@/types';
import {
  AddNode,
  DisconnectNode,
  GetAddedNodeInfo,
  GetAddedNodeInfoResponse,
  GetNetTotalsresponse,
  GetNetworkInfoResponse,
  GetPeerInfoResponse,
  ListBannedResponse,
  Ping,
  SetBan,
  SetNetworkActive,
} from './types';

/**
 * @class Net
 * @subcategory Methods
 */
export class Net {
  private _client: IClient;

  constructor(client: IClient) {
    this._client = client;
  }

  /**
   * Returns the number of connections to other nodes.
   * @returns {Promise<number>} The connection count
   */
  getConnectionCount(): Promise<number> {
    return this._client.request('getconnectioncount');
  }

  /**
   * Requests that a ping be sent to all other nodes, to measure ping time.
   *
   * Results provided in getpeerinfo, pingtime and pingwait fields are decimal seconds.
   *
   * Ping command is handled in queue with all other commands, so it measures processing backlog, not just network ping.
   * @returns {Promise<Ping>}
   */
  ping(): Promise<Ping> {
    return this._client.request('ping');
  }

  /**
   * Returns data about each connected network node as a json array of objects.
   * @returns {Promise<GetPeerInfoResponse[]>}
   */
  getPeerInfo(): Promise<GetPeerInfoResponse[]> {
    return this._client.request('getpeerinfo');
  }

  /**
   * Attempts to add or remove a node from the addnode list.
   *
   * Or try a connection to a node once.
   *
   * Nodes added using addnode (or -connect) are protected from DoS disconnection and are not required to be full nodes/support SegWit as other outbound peers are (though such peers will not be synced from).
   * @param params
   * @param {string} params.node The node (see getpeerinfo for nodes)
   * @param {string} params.command 'add' to add a node to the list, 'remove' to remove a node from the list, 'onetry' to try a connection to the node once
   * @returns {Promise<null>}
   */
  addNode({ node, command }: AddNode): Promise<null> {
    const data = [node, command];
    return this._client.request('addnode', data);
  }

  /**
   * Immediately disconnects from the specified peer node.
   *
   * Strictly one out of 'address' and 'nodeid' can be provided to identify the node.
   *
   * To disconnect by nodeid, either set 'address' to the empty string, or call using the named 'nodeid' argument only.
   * @param params
   * @param {string=} params.address The IP address/port of the node
   * @param {number=} params.nodeid The node ID (see getpeerinfo for node IDs)
   * @returns {Promise<null>}
   */
  disconnectNode({ address, nodeid }: DisconnectNode = {}): Promise<null> {
    const data = [address ?? null, nodeid ?? null];
    return this._client.request('disconnectnode', data);
  }

  /**
   * Returns information about the given added node, or all added nodes (note that onetry addnodes are not listed here)
   * @param params
   * @param {string=} params.node If provided, return information about this specific node, otherwise all nodes are returned.
   * @returns {Promise<GetAddedNodeInfoResponse[]>}
   */
  getAddedNodeInfo({
    node,
  }: GetAddedNodeInfo): Promise<GetAddedNodeInfoResponse[]> {
    return this._client.request('getaddednodeinfo', [node ?? null]);
  }

  /**
   * Returns information about network traffic, including bytes in, bytes out, and current time.
   * @returns {Promise<GetNetTotalsresponse>}
   */
  getNetTotals(): Promise<GetNetTotalsresponse> {
    return this._client.request('getnettotals');
  }

  /**
   * Returns an object containing various state info regarding P2P networking.
   * @returns {Promise<GetNetworkInfoResponse>}
   */
  getNetworkInfo(): Promise<GetNetworkInfoResponse> {
    return this._client.request('getnetworkinfo');
  }

  /**
   * Attempts to add or remove an IP/Subnet from the banned list.
   * @param params
   * @param {string} params.subnet     The IP/Subnet (see getpeerinfo for nodes IP) with an optional netmask (default is /32 = single IP)
   * @param {string} params.command    'add' to add an IP/Subnet to the list, 'remove' to remove an IP/Subnet from the list
   * @param {number=} params.bantime   Time in seconds how long (or until when if [absolute] is set) the IP is banned (0 or empty means using the default time of 24h which can also be overwritten by the -bantime startup argument)
   * @param {boolean=} params.absolute If set, the bantime must be an absolute timestamp in seconds since epoch (Jan 1 1970 GMT)
   * @returns {Promise<null>}
   */
  setBan({ subnet, command, bantime, absolute }: SetBan): Promise<null> {
    const data = [subnet, command, bantime ?? null, absolute ?? false];
    return this._client.request('setban', data);
  }

  /**
   * List all banned IPs/Subnets.
   * @returns {Promise<ListBannedResponse[]>}
   */
  listBanned(): Promise<ListBannedResponse[]> {
    return this._client.request('listbanned');
  }

  /**
   * Clear all banned IPs.
   * @param params
   * @returns {Promise<null>}
   */
  clearBanned(): Promise<null> {
    return this._client.request('clearbanned');
  }

  /**
   * Disable/enable all p2p network activity.
   * @param params
   * @param {boolean} param.state True to enable networking, false to disable
   * @returns {Promise<boolean>}
   */
  setNetworkActive({ state }: SetNetworkActive): Promise<boolean> {
    return this._client.request('setnetworkactive', [state]);
  }

  /**
   * Helper RPC CALL, dont use
   * @returns {Promise<null>}
   */
  testGetAssetData(): Promise<null> {
    return this._client.request('testgetassetdata');
  }
}
