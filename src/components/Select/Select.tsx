import { Icon } from '@iconify/react';
import { Button } from '@mui/material';
import React, { useRef, useState } from 'react';
import { ReactNode } from 'react';
import useOutsideClick from 'src/hooks/useOutsideClick';
import './Select.css';

type Props = {
  options?: string[];
  placeholder: string;
  children: React.ReactChild[];
  selected: string;
  setSelected: Function;
  tabIndex: number;
};

function makeOptions(
  s: string[],
  setPlaceholder: Function,
  setActive: Function,
  placeholder: string,
  defaultPlaceholder: string
) {
  let arr: ReactNode[] = [];

  if (placeholder !== '') {
    arr.push(
      <div
        className="option default"
        onClick={() => {
          setPlaceholder('');
          setActive(false);
        }}
      >
        {defaultPlaceholder}
      </div>
    );
  }

  for (let index = 0; index < s.length; index++) {
    arr.push(
      <div
        className="option"
        onClick={() => {
          setPlaceholder(s[index]);
          setActive(false);
        }}
      >
        {s[index]}
      </div>
    );
  }

  return arr;
}

const Select: React.FC<Props> = (props: Props) => {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const [formActive, setFormActive] = useState(false);

  useOutsideClick(ref, () => {
    setActive(false);
    setFormActive(false);
  });

  return (
    <div
      className={`Select${active ? ' active' : ''}`}
      onFocus={() => {
        setActive(true);
      }}
      onBlur={() => {
        if (!formActive) setActive(false);
      }}
      ref={ref}
    >
      <div className="cardsController">
        <div className={`mainSection${formActive ? ' inactive' : ''}`}>
          <div className="controller">
            <div
              className={`header${active ? ' active' : ''}`}
              onClick={(e: any) => {
                setActive(!active);
                e.stopPropagation();
              }}
            >
              <div className={`placeholder${props.selected !== '' ? ' selected' : ''}`}>
                {props.selected !== '' ? props.selected : props.placeholder}
              </div>
              <Icon
                icon="fluent:chevron-right-16-filled"
                width={25}
                className={`SelectWrapper${active ? ' active' : ''}`}
              />
            </div>

            <div className="newprofile">
              <Button
                onClick={
                  active
                    ? () => {
                        setFormActive(true);
                      }
                    : () => {}
                }
                variant="contained"
                className={`tertiary`}
                startIcon={<Icon icon="fluent:add-16-regular" width={25} className="icon" />}
              >
                NOVO PERFIL
              </Button>
            </div>
          </div>
          <div
            className="options"
            style={{
              height: (props.children.length - 1) * 29 + 70 + 'px',
            }}
          >
            {props.options
              ? makeOptions(props.options, props.setSelected, setActive, props.selected, props.placeholder)
              : ''}
          </div>
        </div>

        <div className="form">
          {props.children}

          <div className="buttons">
            <Button tabIndex={active && formActive ? 0 : -1} variant="contained" onClick={() => setFormActive(false)}>
              SALVAR
            </Button>
            <Button
              tabIndex={active && formActive ? 0 : -1}
              variant="contained"
              onClick={() => setFormActive(false)}
              className="secondary"
            >
              CANCELAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
