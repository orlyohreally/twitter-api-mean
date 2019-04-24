import { TwitterChannel } from './twitter-channel';

export class ChannelSubscription {
  _id: string;
  channel: TwitterChannel;
  follow: boolean;
}
