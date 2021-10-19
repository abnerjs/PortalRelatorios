import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';

import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from '@mui/material';

import Header from 'src/components/Header';
import Form from 'src/pages/Cadastros/Perfis/Components/Form';
import Row from 'src/pages/Cadastros/Perfis/Components/Row';

import { usePesquisa } from 'src/hooks/usePesquisa';
import { useAppDispatch, useAppSelector } from 'src/store';
import { perfisGetRequest, perfisDeleteRequest } from 'src/store/ducks/perfis';
import { Perfil } from 'src/store/ducks/perfis/types';

const Perfis = () => {
  const objetos = useAppSelector((state) => state.session.objetos);
  const flgAcesso =
    objetos.find((x) => x.nomPagina.toLowerCase() === 'perfis')?.flgAcesso ||
    'N';

  const [rowSelected, setRowSelected] = useState(-1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFormOpened, setFormOpened] = useState(false);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [isNewUserSection, setNewUserSection] = useState(false);

  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const { pesquisa, handlePesquisa } = usePesquisa();

  const dispatch = useAppDispatch();
  const perfis = useAppSelector((state) => state.perfis.data);

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePesquisa('filtroPadrao', event.target.value);
  };

  const handleFormOpen = (open: boolean, newUser: boolean) => {
    if (newUser) {
      setRowSelected(-1);
    }

    setPerfil(newUser ? null : perfis[rowSelected]);
    setFormOpened(open);
    setNewUserSection(newUser);

    setTimeout(() => {
      global.window.document.getElementById('desPerfil')?.focus();
    }, 400);
  };

  const handleDelete = () => {
    if (perfil?.idRelPerfil === perfis[rowSelected]?.idRelPerfil) {
      setFormOpened(false);
    }

    setModalOpen(false);
    setRowSelected(-1);

    dispatch(perfisDeleteRequest(perfis[rowSelected]));
    dispatch(perfisGetRequest(pesquisa.toString()));
  };

  const onSuccess = () => {
    setPerfil(null);
    setRowSelected(-1);
    setFormOpened(false);
    setNewUserSection(false);

    dispatch(perfisGetRequest(pesquisa.toString()));
  };

  const onCancel = () => {
    setPerfil(null);
    setRowSelected(-1);
    setFormOpened(false);
    setNewUserSection(false);
  };

  useEffect(() => {
    dispatch(perfisGetRequest(pesquisa.toString()));
  }, [pesquisa, dispatch]);

  return (
    <div className="Usuarios">
      <div className="content">
        <div className="head">
          <Header title="Perfis" />
          <Typography variant="subtitle1">
            Todos os perfis do sistema
          </Typography>
        </div>
        <div className="row">
          <div className={`SectionizedTable${isFormOpened ? '' : ' formInvi'}`}>
            <div className="search">
              <Icon
                icon="fluent:search-12-regular"
                width={25}
                className={`icon${isSearchFocused ? ' active' : ''}`}
              />
              <TextField
                id="searchbar"
                value={pesquisa.filtroPadrao}
                onChange={handleChangeSearch}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                autoComplete="off"
                fullWidth
                color="primary"
                label="Descrição do perfil"
                margin="normal"
                variant="filled"
                className="iconified"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </div>
            <Button
              onClick={() => handleFormOpen(true, true)}
              disabled={flgAcesso !== 'A'}
              variant="contained"
              className={`tertiary${
                isFormOpened && isNewUserSection ? ' active' : ''
              }`}
              startIcon={
                <Icon
                  icon="fluent:add-16-regular"
                  width={25}
                  className="icon"
                />
              }
            >
              NOVO PERFIL
            </Button>
            <div className="rows">
              {perfis.map((item, index) => (
                <Row
                  key={`perfil-${index}`}
                  data={item}
                  index={index}
                  indexSelected={rowSelected}
                  handleFormOpen={handleFormOpen}
                  handleModalOpen={setModalOpen}
                  handleIndexSelected={setRowSelected}
                />
              ))}
            </div>
            {rowSelected !== -1 && (
              <Modal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
              >
                <Fade in={isModalOpen}>
                  <Box className="modal-confirm-delete">
                    <Typography id="transition-modal-title">
                      Tem certeza que quer deletar o perfil?
                    </Typography>
                    <div className="userInfo">
                      <Typography className="modal-user-info">
                        {perfis[rowSelected]?.desPerfil}
                      </Typography>
                    </div>
                    <hr
                      style={{
                        width: '100%',
                        height: 1,
                        border: 'none',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                      }}
                    />
                    <div className="buttons">
                      <Button
                        onClick={() => setModalOpen(false)}
                        variant="contained"
                        className="secondary"
                      >
                        CANCELAR
                      </Button>
                      <Button
                        onClick={handleDelete}
                        variant="contained"
                        className="errorColor"
                      >
                        DELETAR
                      </Button>
                    </div>
                  </Box>
                </Fade>
              </Modal>
            )}
          </div>
          <Form
            data={perfil}
            isFormOpened={isFormOpened}
            onSuccess={onSuccess}
            onCancel={onCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default Perfis;
