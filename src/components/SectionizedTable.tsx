import { Icon } from '@iconify/react';
import { Avatar, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { getInitialsFromString, stringToColor } from 'src/utils/StringUtils';
import CRUDButton from './CRUDButton';
import './SectionizedTable.css';

function rows(
  rowsNum: number,
  searchText: string,
  setFormOpened: Function,
  indexSelected: number,
  setIndexSelected: Function
) {
  let arr: any[] = [];

  for (let index = 0; index < rowsNum; index++) {
    arr.push(
      <div
        className={`row${indexSelected === index ? ' selected' : ''}`}
        onClick={() => {
          if (indexSelected !== index) setIndexSelected(index);
        }}
      >
        <div className="header">
          <Avatar
            sx={{ bgcolor: stringToColor('Abner José da Silva') }}
            children={getInitialsFromString('Abner José da Silva')}
            style={{
              width: '33px',
              height: '33px',
              margin: '0 10px 0 0',
              fontWeight: 400,
            }}
          />
          <div className="nome">Abner José da Silva</div>
          <div className="matricula">1020305</div>
          <div className="email">abner@datamob.com.br</div>
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
            onClick={() => {
              //some function
            }}
          >
            DELETAR
          </Button>
        </div>
      </div>
    );
  }

  return arr;
}

type Props = {
  setFormOpened: Function;
  isFormOpened: boolean;
  setUserSelected: Function;
  userSelected?: any;
  setNewUserSection: Function;
  newUserSection?: boolean;
};

const SectionizedTable = (props: Props) => {
  const [tipoUsuario, setTipoUsuario] = useState('interno');
  const [searchText, setSearchText] = useState('');
  const [focused, setFocused] = useState(false);

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div className={`SectionizedTable${props.isFormOpened ? '' : ' formInvi'}`}>
      <div className={`tabs${props.isFormOpened ? '' : ' middle'}`}>
        <div
          className={`option${tipoUsuario === 'interno' ? ' active' : ''}`}
          onClick={() => setTipoUsuario('interno')}
        >
          INTERNO
        </div>
        <div
          className={`option${tipoUsuario === 'externo' ? ' active' : ''}`}
          onClick={() => setTipoUsuario('externo')}
        >
          EXTERNO
        </div>
        <div
          className={`selector${tipoUsuario === 'externo' ? ' active' : ''}`}
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
            tipoUsuario === 'interno'
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
          props.setUserSelected
        )}
      </div>
    </div>
  );
};

export default SectionizedTable;
