import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatamobIcon from '../assets/DatamobIcon';
import './Menu.css';
import { Icon } from '@iconify/react';
import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material';

const Menu = () => {
  const [active, setActive] = useState(window.location.pathname);
  const [state, setState] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      )
        return;

      setState(open);
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Usuários', 'Empresas', 'Perfis', 'Atrelamento'].map(
          (text, index) => (
            <Link
              to={
                '/' +
                text
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
              }
            >
              <ListItem
                button
                key={text}
                onClick={() =>
                  setActive(
                    '/' +
                      text
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                  )
                }
              >
                <ListItemText
                  primary={text}
                  className={
                    active ===
                    '/' +
                      text
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                      ? 'active'
                      : ''
                  }
                />
              </ListItem>
            </Link>
          )
        )}
      </List>
    </Box>
  );

  return (
    <div className="Menu">
      <Link to="/">
        <div className="logo">
          <DatamobIcon width={39} />
        </div>
      </Link>

      <div className="links">
        <Link to="/">
          <div
            className={
              `menuButton` + (window.location.pathname === '/' ? ' active' : '')
            }
            onClick={() => setState(false)}
          >
            <Icon icon="fluent:home-16-regular" />
          </div>
        </Link>
        <Link to="/documentos">
          <div
            className={
              `menuButton` +
              (window.location.pathname === '/documentos' ||
              window.location.pathname == '/demonstrativo'
                ? ' active'
                : '')
            }
            onClick={() => setState(false)}
          >
            <Icon icon="fluent:document-bullet-list-20-regular" />
          </div>
        </Link>
        <div
          className={
            `menuButton` +
            (window.location.pathname === '/usuarios' ||
            window.location.pathname === '/perfis' ||
            window.location.pathname === '/empresas' ||
            window.location.pathname === '/atrelamento'
              ? ' active'
              : '')
          }
          onClick={() => setState(!state)}
        >
          <Icon icon="fluent:person-20-regular" />
        </div>
        <Link to="/usuarios">
          <div
            className={
              `menuButton` +
              (window.location.pathname === '/logs' ? ' active' : '')
            }
            onClick={() => {
              setState(false);
            }}
          >
            <Icon icon="fluent:notebook-24-regular" />
          </div>
        </Link>
      </div>

      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default Menu;
