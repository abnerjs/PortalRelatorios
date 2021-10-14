import { Icon } from '@iconify/react';
import {
  Autocomplete,
  Avatar,
  Backdrop,
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  Modal,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Header from 'src/components/Header';
import Select from 'src/components/Select';
import Title from 'src/components/Title';
import { getInitialsFromString } from 'src/utils/StringUtils';
import './Usuarios.css';
import './FormUser.css';
import './SectionizedTable.css';
import jsonFile from 'src/testing/fakeData/users.json';
import DmIconifiedSwitch from 'src/components/DmIconifiedSwitch/DmIconifiedSwitch';

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

function rows(
  searchText: string,
  setFormOpened: Function,
  indexSelected: number,
  setIndexSelected: Function,
  setUsuarioSelecionado: Function,
  lstUsuarios: Array<Usuario>
) {
  let arr: any[] = [];

  lstUsuarios.forEach((user, index) => {
    arr.push(
      <div
        className={`row forprestadores${
          indexSelected === index ? ' selected' : ''
        }`}
      >
        <div
          className="header"
          onClick={() => {
            if (indexSelected !== index) {
              setIndexSelected(index);
              setUsuarioSelecionado(user);
              setFormOpened(true);
            } else {
              setIndexSelected(-1);
              setFormOpened(false);
            }
          }}
        >
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

          <DmIconifiedSwitch
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    );
  });

  return arr;
}

const Atrelamento = () => {
  const [isFormOpened, setFormOpened] = useState(false);
  const [rowSelected, setRowSelected] = useState(-1);
  const [tipoUsuario, setTipoUsuario] = useState('interno');
  const [selected, setSelected] = useState('');
  const [searchText, setSearchText] = useState('');
  const [focused, setFocused] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario>();

  const [tabsForm, setTabsForm] = React.useState('forn');

  const handleChangeFormTabsFornecedoresPrestadores = (event: React.SyntheticEvent, newValue: string) => {
    setTabsForm(newValue);
  };

  const handleChangeInternoExterno = (event: React.SyntheticEvent, newValue: string) => {
    setTipoUsuario(newValue);
  };

  const handleOpenForm = (value: boolean) => {
    setFormOpened(value);
    setTimeout(() => {
      document.getElementById('nome')?.focus();
    }, 400);
  };

  const arr: string[] = ['teste1', 'teste2', 'teste3', 'teste4'];

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
          <Header title="Usuários x Fornecedores/Prestadores" />
          <Typography variant="subtitle1">
            Todos os usuários do sistema
          </Typography>
        </div>

        <div className="row">
          <div
            className={`SectionizedTable fornprestadores${
              isFormOpened ? '' : ' formInvi'
            }`}
          >
            <Tabs
              className={`tabs${isFormOpened ? '' : ' middle'}`}
              value={tipoUsuario}
              onChange={handleChangeInternoExterno}
              aria-label="Form section controller"
            >
              <Tab disableRipple value="interno" label="interno" />
              <Tab disableRipple value="externo" label="externo" />
            </Tabs>
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
            <div className="rows forprestadores">
              {rows(
                searchText,
                handleOpenForm,
                rowSelected,
                setRowSelected,
                setUsuarioSelecionado,
                jsonFile
              )}
            </div>
          </div>

          <form
            className={`FormUser flexGrow${isFormOpened ? '' : ' invi'}`}
            onSubmit={handleSubmit}
          >
            <Tabs
              value={tabsForm}
              onChange={handleChangeFormTabsFornecedoresPrestadores}
              aria-label="Form section controller"
            >
              <Tab disableRipple value="forn" label="Fornecedores" />
              <Tab disableRipple value="prest" label="Prestadores" />
            </Tabs>

            <Autocomplete
              multiple
              open={true}
              disableListWrap={true}
              disablePortal
              fullWidth
              clearOnBlur
              selectOnFocus
              handleHomeEndKeys
              disableCloseOnSelect
              limitTags={1}
              options={top100Films}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label="Fornecedores"
                  variant="filled"
                  InputProps={{ ...params.InputProps, disableUnderline: true }}
                />
              )}
            />

            <div className="buttons">
              <Button
                tabIndex={isFormOpened ? 0 : -1}
                variant="contained"
                onClick={() => {
                  setSelected('');
                  setRowSelected(-1);
                  setFormOpened(false);
                }}
                className="secondary"
              >
                CANCELAR
              </Button>
              <Button
                tabIndex={isFormOpened ? 0 : -1}
                variant="contained"
                onClick={() => {
                  setSelected('');
                  setRowSelected(-1);
                  setFormOpened(false);
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

export default Atrelamento;

function AutocompleteCustomTags(
  selectedMovies: { title: string; year: number }[]
) {
  let arr: Array<any> = [];
  top100Films.map((movie, index) => {
    arr.push(
      <FormControlLabel
        label={movie.title}
        control={<Checkbox checked={selectedMovies.includes(movie)} />}
      />
    );
  });

  return <div className="AutocompleteCustomTags">{arr}</div>;
}

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  {
    title:
      'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  {
    title: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  {
    title: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];
