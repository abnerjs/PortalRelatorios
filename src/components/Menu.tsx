import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DatamobIcon from '../assets/DatamobIcon';
import './Menu.css';
import { Icon } from '@iconify/react';
import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material';

import { useAppSelector } from 'src/store';

const menuItens = [
  {
    label: 'Perfis',
    link: '/perfis',
    api: 'Perfis',
  },
  {
    label: 'Usuários',
    link: '/usuarios',
    api: 'Usuarios',
  },
  {
    label: 'Vínculos de Usuários',
    link: '/vinculos-usuarios',
    api: 'VinculosUsuarios',
  },
];

const menuItensRelatorios = [
  {
    label: 'Relatórios',
    link: '/relatorios',
    api: 'Relatorios',
  },
  {
    label: 'Gerenciamento',
    link: '/gerenciamento',
    api: 'Relatorios',
  },
  {
    label: 'Meus Uploads',
    link: '/meusuploads',
    api: 'Relatorios',
  },
  {
    label: 'Tipos de arquivos',
    link: '/tiposarquivos',
    api: 'TiposArquivos',
  },
];

const Menu = () => {
  const objetos = useAppSelector((state) => state.session.objetos);
  const [state, setState] = React.useState(false);
  const [stateRelatorios, setStateRelatorios] = React.useState(false);

  const buildMenu = () => {
    return menuItens.filter((menu) =>
      objetos.find(
        (objeto) => objeto.nomPagina.toLowerCase() === menu.api.toLowerCase()
      )
    );
  };

  const buildMenuRelatorios = () => {
    return menuItensRelatorios.filter((menu) =>
      objetos.find(
        (objeto) => objeto.nomPagina.toLowerCase() === menu.api.toLowerCase()
      )
    );
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState(open);
    };
  const toggleDrawerRelatorios =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setStateRelatorios(open);
    };

  const location = useLocation();

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {buildMenu().map((text, index) => (
          <Link to={text.link} key={`submenu-${index}`} tabIndex={-1}>
            <ListItem button key={text.link}>
              <ListItemText
                primary={text.label}
                className={location.pathname === text.link ? 'active' : ''}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const listRelatorios = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={toggleDrawerRelatorios(false)}
      onClick={toggleDrawerRelatorios(false)}
    >
      <List>
        {buildMenuRelatorios().map((text, index) => (
          <Link to={text.link} key={`submenu-${index}`} tabIndex={-1}>
            <ListItem button key={text.link}>
              <ListItemText
                primary={text.label}
                className={location.pathname === text.link ? 'active' : ''}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="Menu">
      <Link to="/" tabIndex={-1}>
        <div
          className="logo"
          onClick={() => {
            setState(false);
            setStateRelatorios(false);
          }}
        >
          <DatamobIcon width={39} />
        </div>
      </Link>

      <div className="links">
        <Link to="/" tabIndex={-1}>
          <div
            className={
              `menuButton` + (location.pathname === '/' ? ' active' : '')
            }
            onClick={() => () => {
              setState(false);
              setStateRelatorios(false);
            }}
          >
            <Icon icon="fluent:home-16-regular" />
          </div>
        </Link>
        {objetos.findIndex(
          (t) =>
            menuItensRelatorios.findIndex((x) => x.api === t.nomPagina) !== -1
        ) !== -1 && (
          <div
            className={
              `menuButton` +
              (menuItensRelatorios.findIndex(
                (item) => item.link === location.pathname
              ) !== -1
                ? ' active'
                : location.pathname === '/relpreproducao' ||
                  location.pathname === '/relprecombustivel' ||
                  location.pathname === '/relpreextrato' ||
                  location.pathname === '/relprerecurso' ||
                  location.pathname === '/relforcarregamento' ||
                  location.pathname === '/relforpagamento' ||
                  location.pathname === '/relforcanaentregue'
                ? ' active'
                : '')
            }
            onClick={() => {
              setState(false);
              setStateRelatorios((stateRelatorios) => !stateRelatorios);
            }}
          >
            <Icon icon="fluent:document-bullet-list-20-regular" />
          </div>
        )}
        {objetos.findIndex(
          (t) => menuItens.findIndex((x) => x.api === t.nomPagina) !== -1
        ) !== -1 && (
          <div
            className={
              `menuButton` +
              (menuItens.findIndex(
                (item) => item.link === location.pathname
              ) !== -1
                ? ' active'
                : '')
            }
            onClick={() => {
              setState((state) => !state);
              setStateRelatorios(false);
            }}
          >
            <Icon icon="fluent:person-20-regular" />
          </div>
        )}
        {/*
          <Link to="/usuarios">
            <div
              className={`menuButton` + (location.pathname === '/logs' ? ' active' : '')}
              onClick={() => {
                setActive('/usuarios');
              }}
            >
              <Icon icon="fluent:notebook-24-regular" />
            </div>
          </Link>
        */}
      </div>

      <Drawer
        anchor="left"
        open={state}
        onClose={toggleDrawer(false)}
        PaperProps={{ style: { justifyContent: 'flex-start' } }}
      >
        {list()}
      </Drawer>

      <Drawer
        anchor="left"
        open={stateRelatorios}
        onClose={toggleDrawerRelatorios(false)}
        PaperProps={{ style: { justifyContent: 'flex-start' } }}
      >
        {listRelatorios()}
      </Drawer>
    </div>
  );
};

export default Menu;
