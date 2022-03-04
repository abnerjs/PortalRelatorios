import { Icon } from '@iconify/react';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  Modal,
  Skeleton,
  TablePagination,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PesquisaHandler } from 'src/hooks/usePesquisa';
import { useAppDispatch, useAppSelector } from 'src/store';
import { InfoPaginacao, InfoPesquisaProps } from 'src/store/ducks/base/types';
import { ErrorAPI } from 'src/store/ducks/types';
import { Usuario } from 'src/store/ducks/usuarios/types';
import DmCollapseHandler from '../DmCollapseHandler/DmCollapseHandler';
import Row from './Row';

interface Props<T> {
  list: Array<T>;
  object: T;
  getError: ErrorAPI | undefined;
  handleFormOpen: Function;
  isFormOpened: boolean;
  setObject: Function;
  key: string;
  labelKey: string;
  loading: boolean;
  errors: ErrorAPI | undefined;
  deleteState: string | undefined;
  cancelDelete: any;
  deleteRequest: any;
  request: any;
  pesquisa: PesquisaHandler;
  pagination: InfoPaginacao | undefined;
  actions?: boolean;
  switchFunction?: Function;
}

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  if (obj && obj[key]) return obj[key];
  else return '';
}

const DmList = <T extends unknown>(props: Props<T>) => {
  const [isGetErrorCollapseOpened, setGetErrorCollapseOpened] = useState(false);
  const [isErrorCollapseOpened, setErrorCollapseOpened] = useState(false);
  const [rowSelected, setRowSelected] = useState(-1);
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  /*PAGINACAO */
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    props.pesquisa('numPagina', newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    props.pesquisa('itensPorPagina', parseInt(event.target.value));
    props.pesquisa('numPagina', 1);
  };
  /*FIM PAGINACAO */

  useEffect(() => {
    if (props.deleteState === 'success') {
      if (
        getProperty(props.list[rowSelected], props.key as any) ===
        getProperty(props.object, props.key as any)
      ) {
        props.handleFormOpen(false, true);
      }

      setModalOpen(false);
      setRowSelected(-1);

      dispatch(props.request(props.pesquisa.toString()));
    }
    setErrorCollapseOpened(props.errors !== undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.deleteState]);

  return (
    <>
      <DmCollapseHandler
        error={props.getError}
        isErrorCollapseOpened={isGetErrorCollapseOpened}
        setErrorCollapseOpened={setGetErrorCollapseOpened}
      />
      <div
        className="rows"
        style={{ overflow: props.loading ? 'hidden' : 'auto' }}
      >
        {props.loading
          ? loadingUsersRows(props)
          : props.list.map((item, index) => (
              <Row
                key={`objeto-${index}`}
                data={item}
                index={index}
                labelKey={props.labelKey}
                indexSelected={rowSelected}
                actions={props.actions}
                handleFormOpen={props.handleFormOpen}
                handleModalOpen={setModalOpen}
                deleteState={props.deleteState}
                handleIndexSelected={setRowSelected}
                handleChangeFlgAtivo={props.switchFunction}
                isFormOpened={props.isFormOpened}
                setObject={props.setObject}
              />
            ))}
        {rowSelected !== -1 && (
          <Modal
            open={isModalOpen}
            onClose={() => {
              setModalOpen(false);
              setErrorCollapseOpened(false);
              setTimeout(() => {
                dispatch(props.cancelDelete());
              }, 500);
            }}
            closeAfterTransition
            keepMounted
            disablePortal
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
          >
            <Fade in={isModalOpen}>
              <Box className="modal-confirm-delete">
                <DmCollapseHandler
                  error={props.errors}
                  isErrorCollapseOpened={isErrorCollapseOpened}
                  setErrorCollapseOpened={setErrorCollapseOpened}
                />
                <Typography id="transition-modal-title">
                  Tem certeza que quer deletar o perfil?
                </Typography>
                <div className="userInfo">
                  <Typography className="modal-user-info">
                    {getProperty(
                      props.list[rowSelected],
                      props.labelKey as any
                    )}
                  </Typography>
                </div>
                <hr
                  style={{
                    width: '100%',
                    height: 1,
                    border: 'none',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  }}
                />
                <div className="buttons">
                  <Button
                    onClick={() => {
                      setModalOpen(false);
                      setErrorCollapseOpened(false);
                      setTimeout(() => {
                        dispatch(props.cancelDelete());
                      }, 500);
                    }}
                    fullWidth
                    variant="contained"
                    className="secondary"
                  >
                    CANCELAR
                  </Button>
                  <Box sx={{ m: 0, position: 'relative' }}>
                    <Button
                      variant="contained"
                      onClick={() =>
                        dispatch(props.deleteRequest(props.list[rowSelected]))
                      }
                      disabled={props.deleteState === 'request'}
                      type="submit"
                      fullWidth
                      className={
                        props.deleteState === 'request'
                          ? 'errorSecondary'
                          : 'errorColor'
                      }
                    >
                      DELETAR
                    </Button>
                    {props.deleteState === 'request' && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: '#CA4539',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                        }}
                      />
                    )}
                  </Box>
                </div>
              </Box>
            </Fade>
          </Modal>
        )}
      </div>
      <TablePagination
        className="pagination-table"
        component="div"
        count={props.pagination?.totRegistros || 0}
        page={
          props.pagination
            ? props.pagination.numPagina
              ? props.pagination.numPagina - 1
              : 0
            : 0
        }
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Registros por página:"
        labelDisplayedRows={function labelRows({ from, to, count }) {
          return `${from}–${to} de ${count !== -1 ? count : `mais que ${to}`}`;
        }}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default DmList;

const loadingUsersRows = <T extends unknown>(props: Props<T>) => {
  let arr = [];

  for (let i = 0; i < 25; i++) {
    arr.push(
      <div key={`loadingRow-${i}`} className={`row`}>
        <div className="header">
          <Skeleton
            animation="wave"
            variant="circular"
            width={36}
            height={36}
            style={{
              marginRight: '10px',
              display: props.switchFunction ? 'flex' : 'none',
            }}
          />
          <Typography component="div" variant="body1" style={{ flex: 1 }}>
            <Skeleton animation="wave" />
          </Typography>
          <Icon
            icon="fluent:chevron-right-16-filled"
            width={16}
            className="icon"
          />
        </div>
      </div>
    );
  }

  return arr;
};