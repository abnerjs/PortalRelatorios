import { Icon } from '@iconify/react';
import { Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ModalUpload from 'src/pages/Relatorios/Components/ModalUpload';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  arquivosDeleteIdle,
  arquivosDeleteRequest,
  arquivosDownloadRequest,
  arquivosGetRequest,
} from 'src/store/ducks/relatoriosUpload';
import { ArquivoUploadReceiveFormat } from 'src/store/ducks/relatoriosUpload/types';
import { dateFormatter } from 'src/utils/StringUtils';
import './Row.css';

interface Props {
  arrArquivo: Array<ArquivoUploadReceiveFormat> | undefined;
  doc: ArquivoUploadReceiveFormat;
  fullView?: boolean;
}

const Row = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isConfirmDeleteView, showConfirmDelete] = useState(false);
  const dispatch = useAppDispatch();
  const deleteState = useAppSelector(
    (state) => state.arquivoUpload.deleteState
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (deleteState === 's') {
      showConfirmDelete(false);

      dispatch(arquivosGetRequest());
      dispatch(arquivosDeleteIdle());
    }

    //setErrorCollapseOpened(errors !== undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteState]);

  let descDateRef = '';

  if (props.doc.codMes && props.doc.codAno) {
    descDateRef =
      ('00' + props.doc.codMes.toString()).slice(-2) + '/' + props.doc.codAno;
  } else if (props.doc.codAno) {
    descDateRef = props.doc.codAno.toString();
  } else if (props.doc.dtaIni && props.doc.dtaFim) {
    descDateRef =
      dateFormatter(props.doc.dtaIni, 'pt-BR').slice(0, 10) +
      ' - ' +
      dateFormatter(props.doc.dtaFim, 'pt-BR').slice(0, 10);
  } else if (props.doc.dtaFim) {
    descDateRef = dateFormatter(props.doc.dtaFim, 'pt-BR');
  } else descDateRef = '';

  return (
    <div
      className={`row${props.fullView ? ' fullView' : ' collapsable'}${
        collapsed ? ' collapsed' : ''
      }`}
      key={props.doc.idRelArquivo}
      onClick={() => {
        if (!props.fullView) setCollapsed(!collapsed);
      }}
    >
      <div className="header">
        <div className="textual">
          <div className="regname">{props.doc.nomArquivo}</div>
          <div
            className={`refdate${
              descDateRef === undefined ||
              descDateRef === null ||
              descDateRef.trim() === ''
                ? ' semiVisible'
                : ''
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
              ? props.doc.desNomeUsuarioUpload +
                ' - ' +
                dateFormatter(props.doc.dtaUpload, 'pt-BR')
              : dateFormatter(props.doc.dtaUpload, 'pt-BR')}
          </div>
        </div>
        <div className="buttons">
          <Button
            variant="contained"
            fullWidth
            className="reg"
            onClick={(e) => {
              dispatch(arquivosDownloadRequest(props.doc.idRelArquivo));
              e.stopPropagation();
            }}
          >
            BAIXAR
          </Button>
          {props.fullView && (
            <>
              <IconButton
                aria-label="edit"
                size="small"
                className="iconbutton edit"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <Icon
                  icon="fluent:edit-24-regular"
                  width={18}
                  className="icon edit"
                />
              </IconButton>
              <ModalUpload doc={props.doc} open={open} setOpen={setOpen} />
              <IconButton
                aria-label="delete"
                size="small"
                className="iconbutton delete"
                onClick={(e) => {
                  showConfirmDelete(true);
                  e.stopPropagation();
                }}
              >
                <Icon
                  icon="fluent:delete-16-regular"
                  width={18}
                  className="icon delete"
                />
              </IconButton>
            </>
          )}
        </div>
      </div>
      <div className={`confirmdelete${isConfirmDeleteView ? ' confirm' : ''}`}>
        <div className="message">Deseja realmente apagar o registro?</div>
        <div className="buttons">
          <IconButton
            aria-label="edit"
            size="small"
            className="iconbutton"
            onClick={() => dispatch(arquivosDeleteRequest(props.doc))}
          >
            <Icon
              icon="fluent:checkmark-24-regular"
              width={28}
              className="icon edit"
            />
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
            <Icon
              icon="fluent:dismiss-24-filled"
              width={25}
              className="icon delete"
            />
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
      </div>
    </div>
  );
};

export default Row;
