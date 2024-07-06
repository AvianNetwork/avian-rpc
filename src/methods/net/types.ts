/** GetPeerInfoResponse */
export type GetPeerInfoResponse = {
  /** Peer index */
  id: number;
  /** The IP address and port of the peer */
  addr: string;
  /** Bind address of the connection to the peer */
  addrbind: string;
  /** Local address as reported by the peer */
  addrlocal: string;
  /** The services offered */
  services: string;
  /** Whether peer has asked us to relay transactions to it */
  relaytxes: boolean;
  /** The time in seconds since epoch (Jan 1 1970 GMT) of the last send */
  lastsend: number;
  /** The time in seconds since epoch (Jan 1 1970 GMT) of the last receive */
  lastrecv: number;
  /** The total bytes sent */
  bytessent: number;
  /** The total bytes received */
  bytesrecv: number;
  /** The connection time in seconds since epoch (Jan 1 1970 GMT) */
  conntime: number;
  /** The time offset in seconds */
  timeoffset: number;
  /** Ping time (if available) */
  pingtime: number;
  /** Minimum observed ping time (if any at all) */
  minping: number;
  /** Ping wait (if non-zero) */
  pingwait: number;
  /** The peer version, such as 7001 */
  version: number;
  /** The string version */
  subver: string;
  /** Inbound (true) or Outbound (false) */
  inbound: boolean;
  /** Whether connection was due to addnode/-connect or if it was an automatic/inbound connection */
  addnode: boolean;
  /** The starting height (block) of the peer */
  startingheight: number;
  /** The ban score */
  banscore: number;
  /** The last header we have in common with this peer */
  synced_headers: number;
  /** The last block we have in common with this peer */
  synced_blocks: number;
  /** The heights of blocks we're currently asking from this peer */
  inflight: number[];
  /** Whether the peer is whitelisted */
  whitelisted: boolean;
  bytessent_per_msg: {
    /** The total bytes sent aggregated by message type */
    addr: number;
  };
  bytesrecv_per_msg: {
    /** The total bytes received aggregated by message type */
    addr: number;
  };
};

export type Ping = {
  result?: null | unknown;
  error?: null | unknown;
  id?: number;
};

/** AddNode */
export type AddNode = {
  node: string;
  command: 'add' | 'remove' | 'onetry';
};

/** DisconnectNode */
export type DisconnectNode = {
  address?: string;
  nodeid?: number;
};

/** GetAddedNodeInfo */
export type GetAddedNodeInfo = {
  node?: string;
};

/** GetAddedNodeInfoResponse */
export type GetAddedNodeInfoResponse = {
  /** The node IP address or name (as provided to addnode) */
  addednode: string;
  /** If connected */
  connected: boolean;
  /** Only when connected = true */
  addresses?: GetAddedNodeInfoResponseAddress[];
};

/** GetAddedNodeInfoResponseAddress */
type GetAddedNodeInfoResponseAddress = {
  /** The avian server IP and port we're connected to */
  address: string;
  /** connection, inbound or outbound */
  connected: string;
};

/** GetNetTotalsresponse */
export type GetNetTotalsresponse = {
  /** Total bytes received */
  totalbytesrecv: number;
  /** Total bytes sent */
  totalbytessent: number;
  /** Current UNIX time in milliseconds */
  timemillis: number;
  uploadtarget: GetNetTotalsresponseUploadTarget;
};

/** GetNetTotalsresponseUploadTarget */
export type GetNetTotalsresponseUploadTarget = {
  /** Length of the measuring timeframe in seconds */
  timeframe: number;
  /** Target in bytes */
  target: number;
  /** True if target is reached */
  target_reached: boolean;
  /** True if serving historical blocks */
  serve_historical_blocks: boolean;
  /** Bytes left in current time cycle */
  bytes_left_in_cycle: number;
  /** Seconds left in current time cycle */
  time_left_in_cycle: number;
};

/** GetNetworkInfoResponse */
export type GetNetworkInfoResponse = {
  /** The server version */
  version: number;
  /** Satoshi:x.x.the server subversion string */
  subversion: string;
  /** The protocol version */
  protocolversion: number;
  /** The services we offer to the network */
  localservices: string;
  /** True if transaction relay is requested from peers */
  localrelay: boolean;
  /** The time offset */
  timeoffset: number;
  /** The number of connections */
  connections: number;
  /** Whether p2p networking is enabled */
  networkactive?: boolean;
  /** Information per network */
  networks: GetNetworkInfoResponseNetwork[];
  /** Minimum relay fee for transactions in " + CURRENCY_UNIT + "/kB */
  relayfee: number;
  /** Minimum fee increment for mempool limiting or BIP 125 replacement in " + CURRENCY_UNIT + "/kB */
  incrementalfee: number;
  /** List of local addresses */
  localaddresses: GetNetworkInfoResponseLocalAddress[];
  /** Any network and blockchain warnings */
  warnings: string;
};

/** GetNetworkInfoResponseNetwork */
type GetNetworkInfoResponseNetwork = {
  /** Network (ipv4, ipv6 or onion) */
  name: string;
  /** Is the network limited using -onlynet? */
  limited: boolean;
  /** Is the network reachable? */
  reachable: boolean;
  /** The proxy that is used for this network, or empty if none */
  proxy: string;
  /** Whether randomized credentials are used */
  proxy_randomize_credentials: boolean;
};

/** GetNetworkInfoResponseLocalAddress */
type GetNetworkInfoResponseLocalAddress = {
  /** Network address */
  address: string;
  /** Network port */
  port: number;
  /** Relative score */
  score: number;
};

/** SetBan */
export type SetBan = {
  subnet: string;
  command: string;
  bantime?: number;
  absolute?: boolean;
};

/** ListBannedResponse */
export type ListBannedResponse = {
  address: string;
  banned_until: number;
  ban_created: number;
  ban_reason: string;
};

/** SetNetworkActive */
export type SetNetworkActive = {
  state: boolean;
};
