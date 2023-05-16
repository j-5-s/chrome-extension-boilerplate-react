export type Message = {
  type: string;
  value: any;
  key: string;
  ack?: boolean;
}