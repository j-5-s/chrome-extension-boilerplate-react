import React from "react";
import { MsgContext } from "./MsgContext";


type IMessageProvider = {
  connection: chrome.runtime.Port;
  children: React.ReactNode;
}
export const getConnection = (portName: string): chrome.runtime.Port => {
  const connection = chrome.runtime.connect({ name: portName });

  return connection;
}


export const MsgProvider = (props: IMessageProvider) => {

  const { children, connection } = props;
  
  const context = {
    connection
  };

  return (
    <MsgContext.Provider value={context}>
      {children}
    </MsgContext.Provider>
  );
};

