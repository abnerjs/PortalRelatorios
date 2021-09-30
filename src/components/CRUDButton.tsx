import { Icon } from '@iconify/react';
import React from 'react';
import './CRUDButton.css';

type Props = {
  setFormOpened: Function;
  isFormOpened: boolean;
  content?: string;
  setNewUserSection: Function;
  newUserSection?: boolean;
};

const CRUDButton = (props: Props) => {
  return (
    <button
      className={`CRUDButton${
        props.isFormOpened && props.newUserSection ? ' active' : ''
      }`}
      onClick={() => {
        props.setFormOpened(true);
        props.setNewUserSection(true);
      }}
    >
      <Icon icon="fluent:add-16-regular" width={25} className="icon" />
      {props.content}
    </button>
  );
};

export default CRUDButton;
