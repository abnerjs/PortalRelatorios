import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Icon } from '@iconify/react';
import { Objeto } from 'src/store/ducks/login/types';
import './Menu.css';

type Props = {
  icon: string;
  list: any;
  index: number;
  submenuIndexActive: number;
  setSubmenuIndexActive: any;
  active?: boolean;
};

const Submenu = (props: Props) => {
  const [state, setState] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if(props.submenuIndexActive !== props.index) setState(false)
  }, [props.submenuIndexActive, props.index])
  

  useEffect(() => {
    if (state) props.setSubmenuIndexActive(props.index);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const list = (array: Array<Objeto>) => (
    <Box
      sx={{ width: 250 }}
      component="div"
      role="presentation"
      onClick={() => setState(false)}
      onKeyDown={() => setState(false)}
    >
      <List>
        {array.map((obj, index) => (
          <Link
            to={obj.nomPagina.toLowerCase()}
            key={`submenu-${index}`}
            tabIndex={-1}
          >
            <ListItem button key={obj.nomPagina.toLowerCase()}>
              <ListItemText
                primary={obj.desObjeto}
                className={
                  location.pathname === obj.nomPagina.toLowerCase()
                    ? 'active'
                    : ''
                }
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const isActiveClassName = (list: Array<Objeto>) => {
    let aux = false;

    list.forEach((item) => {
      if(location.pathname.toLowerCase().includes(item.nomPagina.toLowerCase())) aux = true;
    })

    return (aux) ? 'menuButton active' : 'menuButton';
  }

  return (
    <>
      <div
        onClick={() => {
          setState(!state);
        }}
        className={isActiveClassName(props.list)}
      >
        <Icon icon={props.icon} />
      </div>
      <Drawer
        anchor="left"
        open={state}
        onClose={() => setState(false)}
        PaperProps={{ style: { justifyContent: 'flex-start' } }}
      >
        {list(props.list)}
      </Drawer>
    </>
  );
};

export default Submenu;
