import { Icon } from '@iconify/react';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useResponsivity from 'src/hooks/useResponsivity';
import ModalUpload from 'src/pages/Relatorios/Components/ModalUpload';
import { useAppDispatch, useAppSelector } from 'src/store';
import { arquivosDeleteRequest, arquivosDownloadRequest } from 'src/store/ducks/relatoriosUpload';
import { ArquivoUploadReceiveFormat } from 'src/store/ducks/relatoriosUpload/types';
import { dateFormatter } from 'src/utils/StringUtils';
import ModalDelete from './ModalDelete';
import './Row.css';

interface Props {
  arrArquivo: Array<ArquivoUploadReceiveFormat> | undefined;
  doc: ArquivoUploadReceiveFormat;
  tableIndex: number;
  rowIndex: number;
  fullView?: boolean;
  userUploadInfo?: boolean;
}

const Row = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isConfirmDeleteView, showConfirmDelete] = useState(false);
  const [isErrorView, showErrorView] = useState(false);
  const [isDownloading, setDownloading] = useState(false);
  const dispatch = useAppDispatch();
  const deleteState = useAppSelector((state) => state.arquivoUpload.deleteState);
  const downloadError = useAppSelector((state) => state.arquivoUpload.downloadError);
  const [open, setOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const isMobileView = useResponsivity();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openedMobileMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (deleteState === 's') {
      showConfirmDelete(false);
    }
  }, [deleteState]);

  useEffect(() => {
    setHeaderHeight(
      document
        .getElementsByClassName('filesTypes')[0]
        .getElementsByClassName('Table')
        [props.tableIndex].getElementsByClassName('header')[props.rowIndex].clientHeight
    );
  });

  useEffect(() => {
    if (
      downloadError &&
      downloadError?.find((item) => item?.table === props.tableIndex && item?.line === props.rowIndex)
    ) {
      showErrorView(true);
    }
  }, [downloadError]);

  let descDateRef = '';

  if (props.doc.codMes && props.doc.codAno) {
    descDateRef = ('00' + props.doc.codMes.toString()).slice(-2) + '/' + props.doc.codAno;
  } else if (props.doc.codAno) {
    descDateRef = props.doc.codAno.toString();
  } else if (props.doc.dtaIni && props.doc.dtaFim) {
    descDateRef =
      dateFormatter(props.doc.dtaIni, 'pt-BR').slice(0, 10) +
      ' - ' +
      dateFormatter(props.doc.dtaFim, 'pt-BR').slice(0, 10);
  } else if (props.doc.dtaIni) {
    descDateRef = dateFormatter(props.doc.dtaIni, 'pt-BR').slice(0, 10);
  } else descDateRef = '';

  return (
    <div
      className={`row${props.fullView ? ' fullView' : ' collapsable'}${collapsed ? ' collapsed' : ''}`}
      style={{
        height: !collapsed ? headerHeight + 'px' : '100%',
      }}
      key={props.doc.idRelArquivo}
      onClick={() => {
        setCollapsed(!collapsed);
      }}
    >
      <div className="header">
        <div className={`textual${props.fullView ? ' fullView' : ''}`}>
          <div className="regname">{props.doc.nomArquivo}</div>
          <div
            className={`refdate${
              descDateRef === undefined || descDateRef === null || descDateRef.trim() === '' ? ' semiVisible' : ''
            }`}
            style={{
              textAlign: !props.fullView ? 'right' : 'left',
            }}
          >
            {descDateRef}
          </div>
          <div
            className={`description${
              !props.fullView ||
              props.doc.desObs === undefined ||
              props.doc.desObs === null ||
              props.doc.desObs.trim() === ''
                ? ' semiVisible'
                : ''
            }`}
            style={{
              display: props.fullView ? 'block' : 'none',
            }}
          >
            {props.doc.desObs}
          </div>
          <div
            className="date"
            style={{
              display: props.fullView ? 'block' : 'none',
            }}
          >
            {props.fullView
              ? props.doc.desNomeUsuarioUpload + ' - ' + dateFormatter(props.doc.dtaUpload, 'pt-BR')
              : dateFormatter(props.doc.dtaUpload, 'pt-BR')}
          </div>
        </div>
        <div className="buttons">
          {props.fullView ? (
            isMobileView ? (
              <>
                <IconButton
                  id="basic-button"
                  aria-controls={openedMobileMenu ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openedMobileMenu ? 'true' : undefined}
                  onClick={handleClick}
                  className="iconbutton more"
                >
                  <Icon icon="fluent:more-vertical-32-filled" width={18} className="icon edit" />
                </IconButton>
                <Menu
                  id="basic-menu"
                  className="menuMore"
                  anchorEl={anchorEl}
                  open={openedMobileMenu}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem
                    onClick={(e) => {
                      setAnchorEl(null);
                      dispatch(arquivosDownloadRequest([props.doc.idRelArquivo, props.tableIndex, props.rowIndex]));
                      setDownloading(true);
                      e.stopPropagation();
                    }}
                  >
                    BAIXAR
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      setAnchorEl(null);
                      setOpen(true);
                    }}
                  >
                    EDITAR
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      setAnchorEl(null);
                      showConfirmDelete(true);
                      setCollapsed(false);
                      e.stopPropagation();
                    }}
                  >
                    DELETAR
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  fullWidth
                  className="reg"
                  onClick={(e) => {
                    dispatch(arquivosDownloadRequest([props.doc.idRelArquivo, props.tableIndex, props.rowIndex]));
                    setDownloading(true);
                    e.stopPropagation();
                  }}
                >
                  BAIXAR
                </Button>
                <IconButton
                  aria-label="edit"
                  size="small"
                  className="iconbutton edit"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <Icon icon="fluent:edit-24-regular" width={18} className="icon edit" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  className="iconbutton delete"
                  onClick={(e) => {
                    showConfirmDelete(true);
                    setCollapsed(false);
                    e.stopPropagation();
                  }}
                >
                  <Icon icon="fluent:delete-16-regular" width={18} className="icon delete" />
                </IconButton>
              </>
            )
          ) : (
            <Button
              variant="contained"
              fullWidth
              className="reg"
              onClick={(e) => {
                dispatch(arquivosDownloadRequest([props.doc.idRelArquivo, props.tableIndex, props.rowIndex]));
                setDownloading(true);
                e.stopPropagation();
              }}
            >
              BAIXAR
            </Button>
          )}
          {props.fullView && <ModalUpload doc={props.doc} open={open} setOpen={setOpen} />}
        </div>
      </div>
      <div
        className={`confirmdelete${isConfirmDeleteView && !isMobileView ? ' confirm' : ''}`}
        style={{
          height: !collapsed ? headerHeight + 'px' : '50%',
        }}
      >
        <div className="message">Deseja realmente apagar o registro?</div>
        <div className="buttons">
          <IconButton
            aria-label="edit"
            size="small"
            className="iconbutton"
            onClick={() => dispatch(arquivosDeleteRequest(props.doc))}
          >
            <Icon icon="fluent:checkmark-24-regular" width={28} className="icon edit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            className="iconbutton"
            onClick={(e) => {
              showConfirmDelete(false);
              e.stopPropagation();
            }}
          >
            <Icon icon="fluent:dismiss-24-filled" width={25} className="icon delete" />
          </IconButton>
        </div>
      </div>
      <ModalDelete doc={props.doc} open={isConfirmDeleteView && isMobileView} setOpen={showConfirmDelete} />
      <div
        className={`errorPanel${isErrorView && isDownloading ? ' confirm' : ''}${
          !props.fullView && collapsed ? ' fullHeight' : ''
        }`}
      >
        <div className="message">
          {
            downloadError?.find((item) => item?.table === props.tableIndex && item?.line === props.rowIndex)?.error
              ?.mensagem
          }
        </div>
        <div className="buttons">
          <IconButton
            aria-label="delete"
            size="small"
            className="iconbutton"
            onClick={(e) => {
              showErrorView(false);
              setDownloading(false);
              e.stopPropagation();
            }}
          >
            <Icon icon="fluent:dismiss-24-filled" width={25} className="icon delete" />
          </IconButton>
        </div>
      </div>
      <div
        className="info"
        style={{
          display: props.fullView ? 'none' : 'flex',
        }}
      >
        <div className="row">
          <span>Data do upload:&nbsp;</span>
          {dateFormatter(props.doc.dtaUpload, 'pt-BR')}
        </div>
        <div className="row">
          <span>Observações:&nbsp;</span>
          {props.doc.desObs || 'Nenhuma observação'}
        </div>
        <div
          className="row"
          style={{
            display: props.userUploadInfo ? 'block' : 'none',
          }}
        >
          <span>Submetido por:&nbsp;</span>
          {props.doc.desNomeUsuarioUpload}
        </div>
      </div>
    </div>
  );
};

export default Row;
