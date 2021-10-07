import { Icon } from '@iconify/react';
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Header from 'src/components/Header';
import Title from 'src/components/Title';
import './Usuarios.css';
import './FormUser.css';
import './SectionizedTable.css';

function rows(
  searchText: string,
  setFormOpened: Function,
  indexSelected: number,
  setIndexSelected: Function,
  setOpen: Function
) {
  let arr: any[] = [];

  for (let index = 0; index < 5; index++) {
    arr.push(
      <div className={`row${indexSelected === index ? ' selected' : ''}`}>
        <div
          className="header"
          onClick={() => {
            if (indexSelected !== index) setIndexSelected(index);
            else setIndexSelected(-1);
          }}
        >
          <div className="nome">Descrição do perfil</div>
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
  }

  return arr;
}

const Perfis = () => {
  const [isFormOpened, setFormOpened] = useState(false);
  const [rowSelected, setRowSelected] = useState(-1);
  const [newUserSection, setNewUserSection] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [focused, setFocused] = useState(false);

  const handleOpenForm = (value: boolean) => {
    setFormOpened(value);
    setTimeout(() => {
      document.getElementById('descricao')?.focus();
    }, 301);
  };

  function handleSubmit(e: any) {
    e.preventDefault();
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  return (
    <div className="Usuarios">
      <div className="content">
        <div className="head">
          <Header title="Perfis" />
          <Typography variant="subtitle1">Todos os perfis do sistema</Typography>
        </div>

        <div className="row">
          <div className={`SectionizedTable${isFormOpened ? '' : ' formInvi'}`}>
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
                label="Descrição do perfil"
                InputProps={{
                  disableUnderline: true,
                }}
                variant="filled"
                margin="normal"
              />
            </div>
            <Button
              variant="contained"
              onClick={() => {
                handleOpenForm(true);
                setNewUserSection(true);
                setRowSelected(-1);
              }}
              className={`tertiary${
                isFormOpened && newUserSection ? ' active' : ''
              }`}
              startIcon={
                <Icon
                  icon="fluent:add-16-regular"
                  width={25}
                  className={`icon${focused ? ' active' : ''}`}
                />
              }
            >
              NOVO PERFIL
            </Button>
            <div className="rows">
              {rows(
                searchText,
                setFormOpened,
                rowSelected,
                setRowSelected,
                setOpen
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
                    Tem certeza que quer deletar o perfil?
                  </Typography>
                  <div className="userInfo">
                    <Typography className="modal-user-info">
                      Descrição do perfil
                    </Typography>

                    <FormControlLabel
                      control={<Checkbox tabIndex={isFormOpened ? 0 : -1} />}
                      label={'Cadastro de usuários'.toUpperCase()}
                      tabIndex={isFormOpened ? 0 : -1}
                      checked
                      disabled
                    />
                    <FormControlLabel
                      control={<Checkbox tabIndex={isFormOpened ? 0 : -1} />}
                      label={'Acesso aos logs'.toUpperCase()}
                      tabIndex={isFormOpened ? 0 : -1}
                      disabled
                    />
                    <FormControlLabel
                      control={<Checkbox tabIndex={isFormOpened ? 0 : -1} />}
                      label={'Upload de arquivos'.toUpperCase()}
                      tabIndex={isFormOpened ? 0 : -1}
                      checked
                      disabled
                    />
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
                      onClick={() => {
                        setOpen(false);
                      }}
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
          <form
            className={`FormUser${isFormOpened ? '' : ' invi'}`}
            onSubmit={handleSubmit}
          >
            <TextField
              id="descricao"
              fullWidth
              color="primary"
              label="Descrição do perfil"
              autoComplete="none"
              type="text"
              InputProps={{
                disableUnderline: true,
                inputProps: { tabIndex: isFormOpened ? 0 : -1 },
              }}
              variant="filled"
            />
            <FormControlLabel
              control={<Checkbox tabIndex={isFormOpened ? 0 : -1} />}
              label={'Cadastro de usuários'.toUpperCase()}
              tabIndex={isFormOpened ? 0 : -1}
            />
            <FormControlLabel
              control={<Checkbox tabIndex={isFormOpened ? 0 : -1} />}
              label={'Acesso aos logs'.toUpperCase()}
              tabIndex={isFormOpened ? 0 : -1}
            />
            <FormControlLabel
              control={<Checkbox tabIndex={isFormOpened ? 0 : -1} />}
              label={'Upload de arquivos'.toUpperCase()}
              tabIndex={isFormOpened ? 0 : -1}
            />
            <Title width={18} content="Tipos de arquivos" />
            <div className="buttons">
              <Button
                tabIndex={isFormOpened ? 0 : -1}
                variant="contained"
                onClick={() => {
                  setRowSelected(-1);
                  setFormOpened(false);
                  setNewUserSection(false);
                }}
                className="secondary"
              >
                CANCELAR
              </Button>
              <Button
                tabIndex={isFormOpened ? 0 : -1}
                variant="contained"
                onClick={() => {
                  setRowSelected(-1);
                  setFormOpened(false);
                  setNewUserSection(false);
                }}
              >
                SALVAR
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Perfis;
