import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';

import React from 'react';
import { Icon } from '@iconify/react';
import Button from '@mui/material/Button';
import { useAppSelector } from 'src/store';
import { TipoArquivo } from 'src/store/ducks/tipoArquivo/types';

interface RowProps {
  data: TipoArquivo;
  index: number;
  indexSelected: number;
  handleFormOpen: Function;
  handleModalOpen: Function;
  handleIndexSelected: Function;
}

const Row: React.FC<RowProps> = ({
  data,
  index,
  indexSelected,
  handleFormOpen,
  handleModalOpen,
  handleIndexSelected,
}: RowProps) => {
  const objetos = useAppSelector((state) => state.session.objetos);
  const flgAcesso =
    objetos.find((x) => x.nomPagina.toLowerCase() === 'perfis')?.flgAcesso ||
    'N';

  return (
    <div className={`row${indexSelected === index ? ' selected' : ''}`}>
      <div
        onClick={() =>
          handleIndexSelected(indexSelected !== index ? index : -1)
        }
        className="header"
      >
        <div className="textual">
          <div className="nome">{data.desTpArquivo}</div>
        </div>
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
          variant="contained"
          tabIndex={indexSelected === index ? 0 : -1}
        >
          ALTERAR
        </Button>
        <Button
          onClick={() => handleModalOpen(true)}
          disabled={flgAcesso !== 'A'}
          tabIndex={indexSelected === index ? 0 : -1}
          variant="contained"
          className="errorColor"
        >
          DELETAR
        </Button>
      </div>
    </div>
  );
};

export default Row;
