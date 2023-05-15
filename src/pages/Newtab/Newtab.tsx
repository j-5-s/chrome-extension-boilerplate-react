import React from 'react';
import { Counter } from '../../features/counter/Counter';

interface Props {
  title: string;
}

const Newtab: React.FC<Props> = ({ title }: Props) => {
  return (
  <div className="text-center">
    hello world
    <Counter />   
    </div>
  );
};

export default Newtab;
