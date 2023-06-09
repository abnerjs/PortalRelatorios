import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';
import 'src/pages/ModalDelete.css';

import { Icon } from '@iconify/react';
import { Avatar, Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'src/store';
import { getInitialsFromString } from 'src/utils/StringUtils';
import DmIconifiedSwitch from 'src/components/DmIconifiedSwitch/DmIconifiedSwitch';
import { changePasswordFromAdminRequest } from 'src/store/ducks/usuarios';

interface RowProps<T> {
  data: T;
  index: number;
  indexSelected: number;
  handleFormOpen: Function;
  handleModalOpen: Function;
  handleIndexSelected: Function;
  isFormOpened: boolean;
  labelKey: string;
  setObject: Function;
  deleteState: string | undefined;
  noAction?: boolean;
  handleChangeFlgAtivo?: Function;
}

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

const Row = <T extends unknown>(props: RowProps<T>) => {
  const dispatch = useAppDispatch();
  const objetos = useAppSelector((state) => state.session.objetos);
  const loggedUser = useAppSelector((state) => state.session.user);
  const flgAcesso = objetos.find((x) => x.nomPagina.toLowerCase() === 'usuarios')?.flgAcesso || 'N';

  return (
    <div
      className={`row${props.indexSelected === props.index ? ' selected' : ''}${props.noAction ? ' noAction' : ''}`}
      id={'linha' + props.index}
    >
      <div
        onClick={() => {
          props.handleIndexSelected(props.indexSelected !== props.index ? props.index : -1);
          if (props.noAction) {
            props.handleFormOpen(true, false);
            props.setObject(props.data);
          }
        }}
        className={getProperty(props.data, 'desLogin' as any) ? 'header user' : 'header'}
      >
        <Avatar
          sx={{ bgcolor: '#1878a1' }}
          style={{
            width: '36px',
            height: '36px',
            margin: '0 10px 0 0',
            fontWeight: 400,
            fontSize: '12pt',
            display: getProperty(props.data, 'desLogin' as any) ? 'flex' : 'none',
          }}
          children={getInitialsFromString(getProperty(props.data, props.labelKey as any))}
        />
        <div className="textual">
          <div className="nome">{getProperty(props.data, props.labelKey as any)}</div>
          <div className="email">{getProperty(props.data, 'desEmail' as any)}</div>
        </div>
        {props.handleChangeFlgAtivo ? (
          <DmIconifiedSwitch
            noIcon
            value={getProperty(props.data, 'flgAtivo' as any) === 'S' ? 'N' : 'S'}
            checked={getProperty(props.data, 'flgAtivo' as any) === 'S'}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              if (props.handleChangeFlgAtivo) props.handleChangeFlgAtivo(props.index);
            }}
            disabled={
              props.isFormOpened ||
              loggedUser?.desLogin === getProperty(props.data, 'desLogin' as any) ||
              props.handleChangeFlgAtivo === undefined
            }
            tabIndex={-1}
          />
        ) : (
          ''
        )}
        <Icon icon="fluent:chevron-right-16-filled" width={16} className="icon" />
      </div>
      <div className="buttons">
        <Button
          onClick={() => {
            dispatch(changePasswordFromAdminRequest({ IdRelUsuario: getProperty(props.data, 'idRelUsuario' as any)}));
          }}
          style={{
            display: props.isFormOpened ||
              loggedUser?.desLogin === getProperty(props.data, 'desLogin' as any) ||
              flgAcesso !== 'A'? "none" : "flex",
          }}
          className="btnRecovery"
          tabIndex={props.indexSelected === props.index ? 0 : -1}
          variant="contained"
          fullWidth
        >
          RECUPERAR SENHA
        </Button>
        <Button
          onClick={() => {
            props.handleFormOpen(true, false);
            props.setObject(props.data);
          }}
          disabled={flgAcesso !== 'A'}
          tabIndex={props.indexSelected === props.index ? 0 : -1}
          variant="contained"
          fullWidth
        >
          ALTERAR
        </Button>
        <Button
          onClick={() => {
            props.handleModalOpen(true);
          }}
          disabled={flgAcesso !== 'A'}
          tabIndex={props.indexSelected === props.index ? 0 : -1}
          variant="contained"
          className="errorColor"
          style={{
            display: loggedUser?.desLogin === getProperty(props.data, 'desLogin' as any) ? 'none' : 'block',
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
