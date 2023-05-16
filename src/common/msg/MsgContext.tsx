import { createContext } from 'react';

type IMsgContext = {
  connection:chrome.runtime.Port
}
  
export const MsgContext = createContext<IMsgContext>({} as IMsgContext);  