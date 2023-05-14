import React from 'react';

interface Props {
  title: string;
}

const Newtab: React.FC<Props> = ({ title }: Props) => {
  return (
    <div className="text-center">
      hello world
    </div>
  );
};


export default Newtab;
