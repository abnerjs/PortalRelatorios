import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';

import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Tab, Tabs, TextField, Typography } from '@mui/material';

import Header from 'src/components/Header';
import { usePesquisa } from 'src/hooks/usePesquisa';
import Form from 'src/pages/Cadastros/VinculosUsuarios/Components/Form';
import Row from 'src/pages/Cadastros/VinculosUsuarios/Components/Row';
import { useAppDispatch, useAppSelector } from 'src/store';
import { usuariosGetRequest } from 'src/store/ducks/usuarios';
import { Usuario } from 'src/store/ducks/usuarios/types';

const VinculosUsuarios = () => {
  const [flgTipo, setFlgTipo] = useState('I');
  const [rowSelected, setRowSelected] = useState(-1);
  const [isFormOpened, setFormOpened] = useState(false);
  const [isSearchFocused, setSearchFocused] = useState(false);

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const { pesquisa, handlePesquisa, handleCustomParameters } = usePesquisa({
    params: [{ key: 'flgTipo', value: 'I' }],
  });

  const dispatch = useAppDispatch();
  const usuarios = useAppSelector((state) => state.usuarios.data);

  const handleChangeFlgTipo = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setFlgTipo(newValue);
    handleCustomParameters({ key: 'flgTipo', value: newValue });
  };

  const handleIndexSelected = (value: number) => {
    setUsuario(value !== -1 ? usuarios[value] : null);
    setFormOpened(value !== -1 ? true : false);
    setRowSelected(value);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePesquisa('filtroPadrao', event.target.value);
  };

  const onSuccess = () => {
    setUsuario(null);
    setRowSelected(-1);
    setFormOpened(false);

    dispatch(usuariosGetRequest(pesquisa.toString()));
  };

  const onCancel = () => {
    setUsuario(null);
    setRowSelected(-1);
    setFormOpened(false);
  };

  useEffect(() => {
    setRowSelected(-1);
    dispatch(usuariosGetRequest(pesquisa.toString()));
  }, [pesquisa, dispatch]);

  return (
    <div className="Usuarios">
      <div className="content">
        <div className="head">
          <Header title="Usuários x Fornecedores/Prestadores" />
          <Typography variant="subtitle1">
            Usuários do sistema e seus vínculos
          </Typography>
        </div>
        <div className="row">
          <div
            className={`SectionizedTable fornprestadores${
              isFormOpened ? '' : ' formInvi'
            }`}
          >
            <Tabs
              value={flgTipo}
              onChange={handleChangeFlgTipo}
              className={`tabs${isFormOpened ? '' : ' middle'}`}
              aria-label="Form section controller"
            >
              <Tab disableRipple value="I" label="INTERNO" />
              <Tab disableRipple value="E" label="EXTERNO" />
            </Tabs>
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
                label={
                  flgTipo === 'I'
                    ? 'Nome, matrícula, CPF ou e-mail'
                    : 'Nome, CPF/CNPJ ou e-mail'
                }
                margin="normal"
                variant="filled"
                className="iconified"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </div>
            <div className="rows forprestadores">
              {usuarios.map((item, index) => (
                <Row
                  key={`usuario-${index}`}
                  data={item}
                  index={index}
                  indexSelected={rowSelected}
                  handleIndexSelected={handleIndexSelected}
                />
              ))}
            </div>
          </div>
          <Form
            data={usuario}
            isFormOpened={isFormOpened}
            onSuccess={onSuccess}
            onCancel={onCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default VinculosUsuarios;
