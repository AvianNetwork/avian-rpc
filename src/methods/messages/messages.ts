import { IClient } from '@/types';
import {
  SendMessage,
  SubscribeToChannel,
  UnsubscribeFromChannel,
  ViewAllMessageChannelsResponse,
  ViewAllMessagesResponse,
  ViewMyRestrictedAddressesResponse,
  ViewMyTaggedAddressesResponse,
} from './types';

/**
 * @class Messages
 * @subcategory Client
 */
export class Messages {
  private _client: IClient;

  constructor(client: IClient) {
    this._client = client;
  }

  /**
   * View all messages that the wallet contains
   * @returns {Promise}
   */
  async viewAllMessages(): Promise<ViewAllMessagesResponse> {
    return await this._client.request('viewallmessages');
  }

  /**
   * View all message channels the wallet is subscribed to
   * @returns {Promise}
   */
  async viewAllMessageChannels(): Promise<ViewAllMessageChannelsResponse> {
    return await this._client.request('viewallmessagechannels');
  }

  /**
   * Subscribe to a certain message channel
   * @example
   * client.messages.subscribeToChannel({channel_name: 'MU3GOZ2FMGHJLM5TTAJDQ5SNAHHRBC!'})
   * @param params
   * @param {string} params.channel_name The channel name to subscribe to, it must end with '!' or have an '~' in the name
   * @returns {Promise}
   */
  async subscribeToChannel(params: SubscribeToChannel): Promise<string> {
    return await this._client.request('subscribetochannel', params);
  }

  /**
   * Unsubscribe from a certain message channel
   * @example
   * client.messages.unsubscribeFromChannel({channel_name: 'MU3GOZ2FMGHJLM5TTAJDQ5SNAHHRBC!'})
   * @param params
   * @param {string} params.channel_name The channel name to unsubscribe from, must end with '!' or have an '~' in the name
   * @returns {Promise}
   */
  async unsubscribeFromChannel(params: UnsubscribeFromChannel): Promise<string> {
    return await this._client.request('unsubscribefromchannel', params);
  }

  /**
   * Creates and broadcasts a message transaction to the network for a channel this wallet owns
   * @example
   * client.messages.sendMessage({
      channel: 'MU3GOZ2FMGHJLM5TTAJDQ5SNAHHRBC!',
      ipfs_hash: 'QmTqu3Lk3gmTsQVtjU7rYYM37EAW4xNmbuEAp2Mjr4AV7E',
      expire_time: 60
    })
   * @param params
   * @param {string} params.channel Name of the channel that you want to send a message with (message channel, administrator asset), if a non administrator asset name is given, the administrator '!' will be added to it
   * @param {string} params.ipfs_hash    The IPFS hash of the message
   * @param {number=} params.expire_time UTC timestamp of when the message expires
   * @returns {Promise} Array of a transaction id
   */
  async sendMessage(params: SendMessage): Promise<string[]> {
    return await this._client.request('sendmessage', params);
  }

  /**
   * View all addresses this wallet owns that have been tagged
   * @returns {Promise}
   */
  async viewMyTaggedAddresses(): Promise<ViewMyTaggedAddressesResponse> {
    return await this._client.request('viewmytaggedaddresses');
  }

  /**
   * View all addresses this wallet owns that have been restricted
   * @returns {Promise}
   */
  async viewMyRestrictedAddresses(): Promise<ViewMyRestrictedAddressesResponse> {
    return await this._client.request('viewmyrestrictedaddresses');
  }

  /**
   * Delete current database of messages
   * @param params
   * @returns {Promise}
   */
  async clearMessages(): Promise<string> {
    return await this._client.request('clearmessages');
  }
}