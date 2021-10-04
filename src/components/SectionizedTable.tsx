import { Icon } from '@iconify/react';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { getInitialsFromString } from 'src/utils/StringUtils';
import CRUDButton from './CRUDButton';
import './SectionizedTable.css';
import jsonFile from 'src/testing/fakeData/users.json';

function rows(
  rowsNum: number,
  searchText: string,
  setFormOpened: Function,
  indexSelected: number,
  setIndexSelected: Function,
  setOpen: Function,
  setUsuarioSelecionado: Function,
  lstUsuarios: Array<Usuario>
) {
  let arr: any[] = [];

  lstUsuarios.map((user, index) => {
    arr.push(
      <div
        className={`row${indexSelected === index ? ' selected' : ''}`}
        onClick={() => {
          if (indexSelected !== index) setIndexSelected(index);
          if (indexSelected !== index) setUsuarioSelecionado(user);
        }}
      >
        <div className="header">
          <Avatar
            sx={{ bgcolor: '#1878a1' }}
            children={getInitialsFromString(user.desNome)}
            style={{
              width: '33px',
              height: '33px',
              margin: '0 10px 0 0',
              fontWeight: 400,
              fontSize: '12pt',
            }}
          />
          <div className="nome">{user.desNome}</div>
          <div className="matricula">{user.codColaborador}</div>
          <div className="email">{user.desEmail}</div>
          <Icon
            icon="fluent:chevron-right-16-filled"
            width={16}
            className="icon"
          />
        </div>
        <div className="buttons">
          <Button
            tabIndex={indexSelected === index ? 0 : -1}
            variant="contained"
            onClick={() => {
              setFormOpened(true);
            }}
          >
            ALTERAR
          </Button>
          <Button
            tabIndex={indexSelected === index ? 0 : -1}
            variant="contained"
            className="errorColor"
            onClick={() => setOpen(true)}
          >
            DELETAR
          </Button>
        </div>
      </div>
    );
  });

  return arr;
}

function cleanForm() {
}

interface Usuario {
  idRelUsuario: number;
  idRelPerfil: number;
  desNome: string;
  desEmail: string;
  desLogin: string;
  desSenha: string;
  desCpfCnpj: string;
  codColaborador: string;
  flgTipo: string;
  flgAtivo: string;
}

type Props = {
  setFormOpened: Function;
  isFormOpened: boolean;
  setUserSelected: Function;
  userSelected?: any;
  setNewUserSection: Function;
  newUserSection?: boolean;
  tipoUsuario: string;
  setTipoUsuario: Function;
};

const SectionizedTable = (props: Props) => {
  const [searchText, setSearchText] = useState('');
  const [focused, setFocused] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario>();

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  return (
    <div className={`SectionizedTable${props.isFormOpened ? '' : ' formInvi'}`}>
      <div className={`tabs${props.isFormOpened ? '' : ' middle'}`}>
        <div
          className={`option${
            props.tipoUsuario === 'interno' ? ' active' : ''
          }`}
          onClick={() => {
            props.setTipoUsuario('interno');
            cleanForm();
          }}
        >
          INTERNO
        </div>
        <div
          className={`option${
            props.tipoUsuario === 'externo' ? ' active' : ''
          }`}
          onClick={() => {
            props.setTipoUsuario('externo');
            cleanForm();
          }}
        >
          EXTERNO
        </div>
        <div
          className={`selector${
            props.tipoUsuario === 'externo' ? ' active' : ''
          }`}
        ></div>
      </div>
      <div className="search">
        <Icon
          icon="fluent:search-12-regular"
          width={25}
          className={`icon${focused ? ' active' : ''}`}
        />
        <TextField
          id="searchbar"
          autoComplete="none"
          onChange={handleChangeSearch}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          fullWidth
          className="iconified"
          color="primary"
          label={
            props.tipoUsuario === 'interno'
              ? 'Nome, matrícula ou e-mail'
              : 'Nome, CPF, CPNJ ou e-mail'
          }
          InputProps={{
            disableUnderline: true,
          }}
          variant="filled"
          margin="normal"
        />
      </div>
      <CRUDButton
        newUserSection={props.newUserSection}
        setNewUserSection={props.setNewUserSection}
        setFormOpened={props.setFormOpened}
        isFormOpened={props.isFormOpened}
        content="novo usuário"
      />
      <div className="rows">
        {rows(
          25,
          searchText,
          props.setFormOpened,
          props.userSelected,
          props.setUserSelected,
          setOpen,
          setUsuarioSelecionado,
          jsonFile
        )}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className="modal-confirm-delete">
            <Typography id="transition-modal-title">
              Tem certeza que quer deletar o usuário?
            </Typography>
            <Avatar
              sx={{ bgcolor: '#1878a1' }}
              children={getInitialsFromString(
                usuarioSelecionado?.desNome || ''
              )}
              style={{
                width: '80px',
                height: '80px',
                fontWeight: 400,
                fontSize: '26pt',
                marginBottom: '20px',
              }}
            />
            <div className="userInfo">
              <Typography className="modal-user-info">
                {usuarioSelecionado?.desNome}
              </Typography>
              <Typography className="modal-user-info">
                {usuarioSelecionado?.codColaborador}
              </Typography>
              <Typography className="modal-user-info">
                {usuarioSelecionado?.desEmail}
              </Typography>
            </div>
            <hr
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                width: '100%',
                height: 1,
                border: 'none',
              }}
            />
            <div className="buttons">
              <Button
                variant="contained"
                onClick={() => setOpen(false)}
                className="secondary"
              >
                CANCELAR
              </Button>
              <Button
                variant="contained"
                onClick={() => setOpen(false)}
                className="errorColor"
              >
                DELETAR
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default SectionizedTable;
