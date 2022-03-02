import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';
import 'src/pages/ModalDelete.css';

import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import { Avatar, Button } from '@mui/material';

import { useAppSelector } from 'src/store';
import { getInitialsFromString } from 'src/utils/StringUtils';
import DmIconifiedSwitch from 'src/components/DmIconifiedSwitch/DmIconifiedSwitch';

interface RowProps<T> {
  data: T;
  index: number;
  indexSelected: number;
  handleFormOpen: Function;
  handleModalOpen: Function;
  handleIndexSelected: Function;
  isFormOpened: boolean;
  labelKey: string;
  actions?: boolean;
  handleChangeFlgAtivo?: Function;
}

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

const Row = <T extends unknown>(props: RowProps<T>) => {
  const objetos = useAppSelector((state) => state.session.objetos);
  const loggedUser = useAppSelector((state) => state.session.user);
  const flgAcesso =
    objetos.find((x) => x.nomPagina.toLowerCase() === 'usuarios')?.flgAcesso ||
    'N';

  return (
    <div
      className={`row${props.indexSelected === props.index ? ' selected' : ''}`}
      id={'linha' + props.index}
    >
      <div
        onClick={() =>
          props.handleIndexSelected(
            props.indexSelected !== props.index ? props.index : -1
          )
        }
        className="header"
      >
        <Avatar
          sx={{ bgcolor: '#1878a1' }}
          style={{
            width: '36px',
            height: '36px',
            margin: '0 10px 0 0',
            fontWeight: 400,
            fontSize: '12pt',
            display: getProperty(props.data, 'desLogin' as any)
              ? 'flex'
              : 'none',
          }}
          children={getInitialsFromString('teste')}
        />
        <div className="textual">
          <div className="nome">
            {getProperty(props.data, props.labelKey as any)}
          </div>
          <div className="email">
            {getProperty(props.data, 'desEmail' as any)}
          </div>
        </div>
        {props.handleChangeFlgAtivo ? <DmIconifiedSwitch
          noIcon
          value={getProperty(props.data, 'flgAtivo' as any) === 'S' ? 'N' : 'S'}
          checked={getProperty(props.data, 'flgAtivo' as any) === 'S'}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            if (props.handleChangeFlgAtivo)
              props.handleChangeFlgAtivo(props.index, e.target.value);
          }}
          disabled={
            props.isFormOpened ||
            loggedUser?.desLogin ===
              getProperty(props.data, 'desLogin' as any) ||
            props.handleChangeFlgAtivo === undefined
          }
          tabIndex={-1}
        /> : ''}
        <Icon
          icon="fluent:chevron-right-16-filled"
          width={16}
          className="icon"
        />
      </div>
      <div className="buttons">
        <Button
          onClick={() => props.handleFormOpen(true, false)}
          disabled={flgAcesso !== 'A'}
          tabIndex={props.indexSelected === props.index ? 0 : -1}
          variant="contained"
          fullWidth
        >
          ALTERAR
        </Button>
        <Button
          onClick={() => props.handleModalOpen(true)}
          disabled={flgAcesso !== 'A'}
          tabIndex={props.indexSelected === props.index ? 0 : -1}
          variant="contained"
          className="errorColor"
          style={{
            display:
              loggedUser?.desLogin ===
              getProperty(props.data, 'desLogin' as any)
                ? 'none'
                : 'block',
          }}
          fullWidth
        >
          DELETAR
        </Button>
      </div>
    </div>
  );
};

export default Row;
