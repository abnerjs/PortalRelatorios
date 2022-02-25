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
  handleChangeFlgAtivo?: Function;
}

const Row = <T extends unknown, K extends keyof T>(props: RowProps<T>, key: K) => {
  const objetos = useAppSelector((state) => state.session.objetos);
  const loggedUser = useAppSelector((state) => state.session.user);
  const flgAcesso =
    objetos.find((x) => x.nomPagina.toLowerCase() === 'usuarios')?.flgAcesso ||
    'N';

    const ref = useRef();

  return (
    <div
      className={`row${props.indexSelected === props.index ? ' selected' : ''}`}
      id={'linha' + props.index}
    >
      <div
        onClick={() =>
          props.handleIndexSelected(props.indexSelected !== props.index ? props.index : -1)
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
          }}
          children={getInitialsFromString('teste')}
        />
        <div className="textual">
          <div className="nome">{props.data.desNome}</div>
          <div className="email">{props.data.desEmail}</div>
        </div>
        <DmIconifiedSwitch
          noIcon
          value={props.data.flgAtivo === 'S' ? 'N' : 'S'}
          checked={props.data.flgAtivo === 'S'}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => props.handleChangeFlgAtivo(props.index, e.target.value)}
          disabled={props.isFormOpened || loggedUser?.desLogin === props.data.desLogin}
          tabIndex={-1}
        />
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
            display: loggedUser?.desLogin === props.data.desLogin ? 'none' : 'block',
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
