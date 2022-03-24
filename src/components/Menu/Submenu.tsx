import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { Objeto } from 'src/store/ducks/login/types';
import './Menu.css';

type Props = {
  icon: string;
  listDescription: string;
  expanded: boolean;
  isMenuExpansive: boolean;
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
    if (props.submenuIndexActive !== props.index) setState(false);
  }, [props.submenuIndexActive, props.index]);

  useEffect(() => {
    if (props.expanded) setState(false);
  }, [props.expanded]);

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
            to={'/' + obj.nomPagina.toLowerCase()}
            key={`submenu-${index}`}
            tabIndex={-1}
          >
            <ListItem button key={obj.nomPagina.toLowerCase()}>
              <ListItemText
                primary={obj.desObjeto}
                className={
                  location.pathname
                    .toLowerCase()
                    .includes('/' + obj.nomPagina.toLowerCase())
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

  const fullWidthList = (array: Array<Objeto>, expanded: boolean) => {
    return (
      <Collapse
        in={expanded && props.isMenuExpansive}
        className="fullWidthList"
      >
        <List component="div" disablePadding>
          {array.map((obj, index) => (
            <Link
              to={'/' + obj.nomPagina.toLowerCase()}
              key={`submenu-${index}`}
              tabIndex={-1}
              style={{ textDecoration: 'none' }}
            >
              <ListItem
                button
                key={obj.nomPagina.toLowerCase()}
                className={`itemlist-btn${
                  location.pathname
                    .toLowerCase()
                    .includes(obj.nomPagina.toLowerCase())
                    ? ' active'
                    : ''
                }`}
              >
                <ListItemText
                  primary={obj.desObjeto}
                  className={
                    location.pathname
                      .toLowerCase()
                      .includes('/' + obj.nomPagina.toLowerCase())
                      ? 'itemlist active'
                      : 'itemlist'
                  }
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Collapse>
    );
  };

  const isActiveClassName = (list: Array<Objeto>, expanded: boolean) => {
    let aux = false;
    let str = 'menuButton';

    list.forEach((item) => {
      if (
        location.pathname
          .toLowerCase()
          .includes('/' + item.nomPagina.toLowerCase())
      )
        aux = true;
    });
    if (aux) str += ' active';
    if (expanded && props.isMenuExpansive) str += ' expanded';
    return str;
  };

  return (
    <>
      <Tooltip
        title={props.listDescription}
        enterDelay={500}
        placement="right"
        disableHoverListener={props.expanded && props.isMenuExpansive}
      >
        <div
          onClick={() => {
            if (!props.expanded || (!props.isMenuExpansive && props.expanded))
              setState(!state);
          }}
          className={isActiveClassName(props.list, props.expanded)}
        >
          <Icon icon={props.icon} />
          <div className="textual">{props.listDescription}</div>
        </div>
      </Tooltip>
      <div className="items">{fullWidthList(props.list, props.expanded)}</div>
      <Drawer
        anchor="left"
        open={
          state &&
          (!props.expanded || (!props.isMenuExpansive && props.expanded))
        }
        onClose={() => setState(false)}
        PaperProps={{ style: { justifyContent: 'flex-start' } }}
      >
        {list(props.list)}
      </Drawer>
    </>
  );
};

export default Submenu;
