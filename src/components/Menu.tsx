import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DatamobIcon from '../assets/DatamobIcon';
import './Menu.css';
import { Icon } from '@iconify/react';
import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material';

const menuItens = [
  {
    label: 'Perfis',
    link: '/perfis',
  },
  {
    label: 'Usuários',
    link: '/usuarios',
  },
  {
    label: 'Atrelamento',
    link: '/atrelamento',
  },
]

const Menu = () => {
  const [state, setState] = React.useState(false);

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        )
          return;

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
        {menuItens.map((text, index) => (
          <Link to={text.link}>
            <ListItem button key={text.link} >
              <ListItemText primary={text.label} className={location.pathname === text.link ? 'active' : ''} />
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
            className={`menuButton` + (location.pathname === '/' ? ' active' : '')}
            onClick={() => setState(false)}
          >
            <Icon icon="fluent:home-16-regular" />
          </div>
        </Link>
        <Link to="/relatorios">
          <div
            className={
              `menuButton` + (location.pathname === '/relatorios' ? ' active' : '')
            }
            onClick={() => setState(false)}
          >
            <Icon icon="fluent:document-bullet-list-20-regular" />
          </div>
        </Link>
        <div
          className={`menuButton` + (menuItens.findIndex(item => item.link === location.pathname) !== -1 ? ' active' : '')}
          onClick={() => setState(state => !state)}
        >
          <Icon icon="fluent:person-20-regular" />
        </div>
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
        PaperProps={{
          style: { justifyContent: 'flex-start' }
        }}
      >
        {list()}
      </Drawer>

    </div>
  );
};

export default Menu;
