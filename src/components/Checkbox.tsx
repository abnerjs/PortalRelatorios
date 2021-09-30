import React from 'react';
import './Checkbox.css';

type Props = {
  content: string;
  id: string;
  flexEnd?: any;
  medium?: any;
  uppercase?: any;
};

const Checkbox = (props: Props) => {
  return (
    <div
      className="Checkbox"
      style={{
        justifyContent: props.flexEnd ? 'flex-end' : 'flex-start',
        fontWeight: props.medium ? 500 : 400,
        textTransform: props.uppercase ? 'uppercase' : 'initial',
      }}
    >
      <input
        id={props.id}
        type="checkbox"
        className="check"
        value="rememberme"
      />
      <label htmlFor={props.id} className="checkbox-label">
        <span className="icon"></span> {props.content}
      </label>
    </div>
  );
};

export default Checkbox;
