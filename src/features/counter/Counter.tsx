import React from 'react'
import { usePersistedState } from '../../common/msg/usePersistedState';
export function Counter() {

  const { value, actions } = usePersistedState<number>('counter', 0);

  return (
    <div className="flex justify-center">
      <div className="flex items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          aria-label="Increment value"
          onClick={() => {
            actions.setState(value + 1);
          }}
        >
          Increment
        </button>
        <span className="px-4">{value}</span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          aria-label="Decrement value"
          onClick={() => {
            actions.setState(value - 1);
          }}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}