export type IMessage = {
  type: string;
  value: any;
  key: string;
  ack?: boolean;
}