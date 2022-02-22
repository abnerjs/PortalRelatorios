import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DatamobIcon from 'src/assets/DatamobIcon';
import './Menu.css';
import { Icon } from '@iconify/react';
import { IconButton, Tooltip } from '@mui/material';
import { TipoObjeto, Objeto } from 'src/store/ducks/login/types';
import { useAppSelector } from 'src/store';
import Submenu from './Submenu';

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

  const location = useLocation();
  useEffect(() => {
    if(location.pathname === '/') setOpen(true);
  }, [location.pathname])
  

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

  return (
    <>
      <IconButton
        className={`expand-btn${open ? ' expanse' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <Icon icon="fluent:arrow-swap-20-filled" />
      </IconButton>
      <div className={`Menu${open ? ' expanse' : ''}`}>
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

        <div className="links">
          <Tooltip
            title="Início"
            enterDelay={500}
            placement="right"
            disableHoverListener={open}
          >
            <Link to="/" tabIndex={-1} style={{ textDecoration: 'none' }}>
              <div
                className={
                  `menuButton` +
                  (location.pathname === '/'
                    ? ' active'
                    : '' + (open ? ' expanded' : ''))
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

          {submenuRender.map((item) => {
            return (
              <Submenu
                icon={item.icon}
                list={item.list}
                listDescription={item.listDescription}
                index={item.index}
                expanded={open}
                submenuIndexActive={submenuIndexActive}
                setSubmenuIndexActive={setSubmenuIndexActive}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Menu;
