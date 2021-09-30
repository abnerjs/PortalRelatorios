import React, { useState } from 'react';
import './MultivaloredInput.css';
type Props = {
  type?: string;
  secondary?: any;
  error?: any;
  height?: number;
  placeholder?: string;
  iconified?: any;
  onchange?: Function;
  changeSearch?: Function;
  tabIndex?: number;
  id: string;
  autoFocus?: any;
};

const MultivaloredInput = (props: Props) => {
  const [focused, setFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.classList.remove('error');
    setFocused(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value !== '' ? setHasContent(true) : setHasContent(false);
    if (props.changeSearch) {
      props.changeSearch(e.target.value);
    }
  };

  return (
    <div className="form-group">
      <label className="group">
        <div
          className={`label${props.iconified ? ' iconified' : ''}${
            focused ? ' focused' : ''
          }${hasContent ? ' hasContent' : ''}`}
        >
          {props.placeholder}
        </div>
        <input
          autoFocus={props.autoFocus ? true : false}
          id={props.id}
          name={props.id}
          tabIndex={props.tabIndex}
          type={props.type ? props.type : 'text'}
          className={`MultivaloredInput${props.secondary ? ' secondary' : ''}${
            props.error ? ' error' : ''
          }`}
          style={{
            height: props.height ? props.height : 50 + 'px',
            padding: props.iconified ? '0 25px 0 45px' : '0 25px',
            width: props.iconified ? 'calc(100% - 70px)' : 'calc(100% - 50px)',
          }}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={() => setFocused(false)}
        />
      </label>
    </div>
  );
};

export default MultivaloredInput;
