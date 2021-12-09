import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';

import React from 'react';
import { Icon } from '@iconify/react';
import { Avatar, Button } from '@mui/material';

import { useAppSelector } from 'src/store';
import { Usuario } from 'src/store/ducks/usuarios/types';
import { getInitialsFromString } from 'src/utils/StringUtils';
import DmIconifiedSwitch from 'src/components/DmIconifiedSwitch/DmIconifiedSwitch';

interface RowProps {
  data: Usuario;
  index: number;
  indexSelected: number;
  handleFormOpen: Function;
  handleModalOpen: Function;
  handleIndexSelected: Function;
  handleChangeFlgAtivo: Function;
  isFormOpened: boolean;
}

const Row: React.FC<RowProps> = ({
  data,
  index,
  indexSelected,
  handleFormOpen,
  handleModalOpen,
  handleIndexSelected,
  handleChangeFlgAtivo,
  isFormOpened,
}: RowProps) => {
  const objetos = useAppSelector((state) => state.session.objetos);
  const loggedUser = useAppSelector((state) => state.session.user);
  const flgAcesso =
    objetos.find((x) => x.nomPagina.toLowerCase() === 'usuarios')?.flgAcesso ||
    'N';

  return (
    <div
      className={`row${indexSelected === index ? ' selected' : ''}`}
      key={data.codColaborador}
      id={'linha' + index}
    >
      <div
        onClick={() =>
          handleIndexSelected(indexSelected !== index ? index : -1)
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
          children={getInitialsFromString(data.desNome)}
        />
        <div className="textual">
          <div className="nome">{data.desNome}</div>
          <div className="email">{data.desEmail}</div>
        </div>
        <DmIconifiedSwitch
          noIcon
          value={data.flgAtivo === 'S' ? 'N' : 'S'}
          checked={data.flgAtivo === 'S'}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handleChangeFlgAtivo(index, e.target.value)}
          disabled={isFormOpened || loggedUser?.desLogin === data.desLogin}
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
          onClick={() => handleFormOpen(true, false)}
          disabled={flgAcesso !== 'A'}
          tabIndex={indexSelected === index ? 0 : -1}
          variant="contained"
        >
          ALTERAR
        </Button>
        <Button
          onClick={() => handleModalOpen(true)}
          disabled={flgAcesso !== 'A'}
          tabIndex={indexSelected === index ? 0 : -1}
          variant="contained"
          className="errorColor"
          style={{
            display: loggedUser?.desLogin === data.desLogin ? 'none' : 'block',
          }}
        >
          DELETAR
        </Button>
      </div>
    </div>
  );
};

export default Row;
