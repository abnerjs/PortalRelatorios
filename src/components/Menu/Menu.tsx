import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DatamobIcon from 'src/assets/DatamobIcon';
import './Menu.css';
import { Icon } from '@iconify/react';
import {
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Tooltip,
} from '@mui/material';
import { TipoObjeto, Objeto } from 'src/store/ducks/login/types';
import { useAppSelector } from 'src/store';
import Submenu from './Submenu';
import useResponsivity, {
  useMenuResponsivity,
} from 'src/hooks/useResponsivity';

const menuFromAPI = [
  {
    desTipo: 'Cadastros',
    icon: 'fluent:person-20-regular',
    lstObjetos: [
      {
        nomPagina: 'Perfis',
      },
      {
        nomPagina: 'Usuarios',
      },
      {
        nomPagina: 'VinculosUsuarios',
      },
    ],
  },
  {
    desTipo: 'Relatórios',
    icon: 'fluent:document-bullet-list-20-regular',
    lstObjetos: [
      {
        nomPagina: 'Relatorios',
      },
      {
        nomPagina: 'GerenciarRelatorios',
      },
      {
        nomPagina: 'MeusUploads',
      },
      {
        nomPagina: 'TiposArquivos',
      },
    ],
  },
];

interface MenuButton {
  icon: string;
  listDescription: string;
  list: Objeto[];
  index: number;
}

const Menu = () => {
  const sistemas = useAppSelector((state) => state.session.user);
  const [tiposObjetos, setTiposObjetos] = React.useState<TipoObjeto[]>([]);
  const [submenuIndexActive, setSubmenuIndexActive] = React.useState(-1);
  const [submenuRender, setSubmenuRender] = React.useState<MenuButton[]>([]);
  const [open, setOpen] = React.useState(false);

  const isMobileView = useResponsivity();
  const isMenuExpansive = useMenuResponsivity();

  const location = useLocation();

  const [bottomNavigationDisplay, setBottomNavigationDisplay] =
    useState<string>('/');

  const [listDescriptionActive, setListDescriptionActive] = useState('/');

  useEffect(() => {
    if (location.pathname === '/') setOpen(true);
  }, [location.pathname]);

  useEffect(() => {
    if (sistemas) {
      const found = sistemas?.lstSistemas.find(
        (item) => item.desSistema === 'PORTAL DE RELATÓRIOS'
      );
      if (found) setTiposObjetos(found.lstTiposObjetos);
      let arrAux: MenuButton[] = [];
      menuFromAPI.forEach((item, index) => {
        const objetoFromTipo = tiposObjetos.find(
          (objeto: TipoObjeto) => objeto.desTipo === item.desTipo
        );
        if (objetoFromTipo) {
          let arrSubpages: Objeto[] = [];
          item.lstObjetos.forEach((objeto) => {
            let renderFound = objetoFromTipo.lstObjetos.find(
              (pagina) =>
                objeto.nomPagina === pagina.nomPagina &&
                pagina.flgAcesso === 'A'
            );

            if (renderFound) {
              arrSubpages.push(renderFound);
            }
          });

          arrAux.push({
            icon: item.icon,
            list: arrSubpages,
            index: index,
            listDescription: item.desTipo,
          });
        }
      });

      setSubmenuRender(arrAux);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sistemas, tiposObjetos, submenuIndexActive]);

  useEffect(() => {
    setBottomNavigationDisplay(
      submenuRender
        .map((item) => {
          let str = location.pathname;
          item.list.forEach((item2) => {
            if (
              location.pathname
                .toLowerCase()
                .includes('/' + item2.nomPagina.toLowerCase())
            )
              str = item.listDescription;
          });
          return str;
        })
        .find((element) => element !== location.pathname) || location.pathname
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submenuRender, location.pathname]);

  return (
    <>
      {!isMobileView ? (
        <div className={`Menu${open && isMenuExpansive ? ' expanse' : ''}`}>
          <Link to="/" tabIndex={-1} style={{ width: '100%' }}>
            <div
              className="logo"
              onClick={() => {
                setSubmenuIndexActive(-1);
              }}
            >
              <DatamobIcon width={39} />
            </div>
          </Link>
          <IconButton
            className={`expand-btn${open ? ' expanse' : ''}`}
            onClick={() => setOpen(!open)}
            style={{
              opacity: isMenuExpansive ? 1 : 0,
              visibility: isMenuExpansive ? 'visible' : 'hidden',
            }}
          >
            <Icon icon="fluent:arrow-swap-20-filled" />
          </IconButton>

          <div className="links">
            <Tooltip
              title="Início"
              enterDelay={500}
              placement="right"
              disableHoverListener={open && isMenuExpansive}
            >
              <Link to="/" tabIndex={-1} style={{ textDecoration: 'none' }}>
                <div
                  className={
                    `menuButton` +
                    (location.pathname === '/'
                      ? ' active'
                      : open && isMenuExpansive
                      ? ' expanded'
                      : '')
                  }
                  onClick={() => () => {
                    setSubmenuIndexActive(-1);
                  }}
                >
                  <Icon icon="fluent:home-16-regular" />
                  <div className="textual">Início</div>
                </div>
              </Link>
            </Tooltip>

            {submenuRender.map((item, index) => {
              return (
                <Submenu
                  key={index}
                  icon={item.icon}
                  list={item.list}
                  listDescription={item.listDescription}
                  index={item.index}
                  expanded={open}
                  isMenuExpansive={isMenuExpansive}
                  submenuIndexActive={submenuIndexActive}
                  setSubmenuIndexActive={setSubmenuIndexActive}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <BottomNavigation value={bottomNavigationDisplay}>
            <BottomNavigationAction
              key={0}
              component={Link}
              to="/"
              label="Início"
              value="/"
              icon={<Icon icon="fluent:home-16-regular" />}
              onClick={() => setBottomNavigationDisplay('/')}
            />
            {submenuRender.map((item, index) => {
              return (
                <BottomNavigationAction
                  key={index + 1}
                  icon={<Icon icon={item.icon} />}
                  value={item.listDescription}
                  label={item.listDescription}
                  onClick={() => {
                    setListDescriptionActive(item.listDescription);
                  }}
                />
              );
            })}
          </BottomNavigation>
          {submenuRender.map((item, index) => {
            return (
              <BottomNavigation
                key={index}
                value={location.pathname}
                className={`subMenuBottomAction${
                  listDescriptionActive === item.listDescription
                    ? ' active'
                    : ''
                }`}
                showLabels
              >
                {item.list.map((sublistItem, index) => {
                  return (
                    <BottomNavigationAction
                      key={index}
                      component={Link}
                      to={'/' + sublistItem.nomPagina.toLowerCase()}
                      icon={<Icon icon={item.icon} />}
                      value={'/' + sublistItem.nomPagina.toLowerCase()}
                      label={sublistItem.desObjeto}
                      onClick={(e: any) => {
                        setBottomNavigationDisplay(item.listDescription);
                        setListDescriptionActive('/');
                        e.stopPropagation();
                      }}
                    />
                  );
                })}

                <BottomNavigationAction
                  icon={<Icon icon="fluent:dismiss-12-regular" />}
                  value={'unvalued'}
                  label={''}
                  onClick={(e) => {
                    setListDescriptionActive('/');
                    e.stopPropagation();
                  }}
                />
              </BottomNavigation>
            );
          })}
        </>
      )}
    </>
  );
};

export default Menu;
