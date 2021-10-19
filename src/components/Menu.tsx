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
    label: 'Atrelamento',
    link: '/atrelamento',
    api: 'Atrelamento',
  },
];

const Menu = () => {
  const objetos = useAppSelector((state) => state.session.objetos);
  const [state, setState] = React.useState(false);

  const buildMenu = () => {
    return menuItens.filter((menu) =>
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
          <Link to={text.link} key={`submenu-${index}`}>
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
      <Link to="/">
        <div className="logo" onClick={() => setState(false)}>
          <DatamobIcon width={39} />
        </div>
      </Link>

      <div className="links">
        <Link to="/">
          <div
            className={
              `menuButton` + (location.pathname === '/' ? ' active' : '')
            }
            onClick={() => setState(false)}
          >
            <Icon icon="fluent:home-16-regular" />
          </div>
        </Link>
        {objetos.findIndex(
          (objeto) => objeto.nomPagina.toLowerCase() === 'relatorios'
        ) !== -1 && (
          <Link to="/relatorios">
            <div
              className={
                `menuButton` +
                (location.pathname === '/relatorios' ? ' active' : '')
              }
              onClick={() => setState(false)}
            >
              <Icon icon="fluent:document-bullet-list-20-regular" />
            </div>
          </Link>
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
            onClick={() => setState((state) => !state)}
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
    </div>
  );
};

export default Menu;
