import { Icon } from '@iconify/react';
import React from 'react';
import './SelectButton.css';

type Props = {
  content: string;
  active: boolean;
  onclick: Function;
};

const SelectButton = (props: Props) => {
  return (
    <button
      className={`SelectButton${props.active ? ' visible' : ''}`}
      onMouseDown={() => props.onclick(true)}
    >
      <Icon icon="fluent:add-16-regular" width={25} className="icon" />
      {props.content}
    </button>
  );
};

export default SelectButton;
