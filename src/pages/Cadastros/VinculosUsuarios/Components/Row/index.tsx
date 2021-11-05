import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';

import React from 'react';
import { Avatar } from '@mui/material';

import { Usuario } from 'src/store/ducks/usuarios/types';
import { getInitialsFromString } from 'src/utils/StringUtils';

interface RowProps {
  data: Usuario;
  index: number;
  indexSelected: number;
  handleIndexSelected: Function;
}

const Row: React.FC<RowProps> = ({
  data,
  index,
  indexSelected,
  handleIndexSelected,
}: RowProps) => {
  return (
    <div
      className={`row forprestadores${
        indexSelected === index ? ' selected' : ''
      }`}
    >
      <div
        className="header"
        onClick={() =>
          handleIndexSelected(indexSelected !== index ? index : -1)
        }
      >
        <Avatar
          sx={{ bgcolor: '#1878a1' }}
          children={getInitialsFromString(data.desNome)}
          style={{
            width: '33px',
            height: '33px',
            margin: '0 10px 0 0',
            fontWeight: 400,
            fontSize: '12pt',
          }}
        />
        <div className="textual">
          <div className="nome">{data.desNome}</div>
          <div className="email">{data.desEmail}</div>
        </div>
      </div>
    </div>
  );
};

export default Row;
