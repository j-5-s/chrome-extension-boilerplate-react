import { useState, useEffect, useContext } from 'react'
import { MsgContext } from './MsgContext';


export function usePersistedState<T>(key: string, initialValue?: T) {
  const [state, setState] = useState({
    loading: true,
    key,
    initialValue,
    value: initialValue,
  });
  const msgContext = useContext(MsgContext);

  const listener = (msg: any) => {

    setState((existing) => ({
      ...existing,
      loading: false,
      value: msg.value
    }));
  }

  useEffect(() => {
    msgContext.connection.onMessage.addListener(listener);
    return () => {
      msgContext.connection.onMessage.removeListener(listener);
    }
  }, [msgContext.connection.onMessage]);

  const actions = {
    setState: (value: any) => {
      setState((existing) => ({...existing, loading: true }));
      msgContext.connection.postMessage({ type: 'setState', key, value });
    },
  }

  useEffect(() => {
    msgContext.connection.postMessage({ type: 'initialState', key, initialValue });
  },[key, msgContext.connection, initialValue]);

  return {
    actions,
    loading: state.loading,
    value: state.value as T
  }
};
