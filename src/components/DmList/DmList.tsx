import { Icon } from '@iconify/react';
import { Skeleton, TablePagination, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { usePesquisa } from 'src/hooks/usePesquisa';
import { useAppDispatch, useAppSelector } from 'src/store';
import { usuariosGetRequest, usuariosPutRequest } from 'src/store/ducks/usuarios';
import { Usuario } from 'src/store/ducks/usuarios/types';
import DmCollapseHandler from '../DmCollapseHandler/DmCollapseHandler';
import Row from './Row';

interface Props<T> {
  handleFormOpen: Function,
  isFormOpened: boolean,
  list: Array<T>;
  loading: boolean;
  switchFunction?: Function;
}

const DmList = <T extends unknown>(props: Props<T>) => {
  const getError = useAppSelector((state) => state.usuarios.error);
  const errors = useAppSelector((state) => state.usuarios.deleteError);
  const [isGetErrorCollapseOpened, setGetErrorCollapseOpened] = useState(false);
  const deleteState = useAppSelector((state) => state.usuarios.deleteState);
  const [isErrorCollapseOpened, setErrorCollapseOpened] = useState(false);
  const [rowSelected, setRowSelected] = useState(-1);
  const [isModalOpen, setModalOpen] = useState(false);
  const { pesquisa, handlePesquisa, handleCustomParameters } = usePesquisa({
    params: [{ key: 'flgTipo', value: 'I' }],
  });

  /*PAGINACAO */
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  /*FIM PAGINACAO */

  return (
    <>
      <DmCollapseHandler
        error={getError}
        isErrorCollapseOpened={isGetErrorCollapseOpened}
        setErrorCollapseOpened={setGetErrorCollapseOpened}
      />
      <div className="rows" style={{ overflow: props.loading ? 'hidden' : 'auto' }}>
        {props.loading
          ? loadingUsersRows()
          : props.list.map((item, index) => (
              <Row
                key={`usuario-${index}`}
                data={item}
                index={index}
                indexSelected={rowSelected}
                handleFormOpen={props.handleFormOpen}
                handleModalOpen={setModalOpen}
                handleIndexSelected={setRowSelected}
                handleChangeFlgAtivo={props.switchFunction}
                isFormOpened={props.isFormOpened}
              />
            ))}
      </div>
      <TablePagination
        className="pagination-table"
        component="div"
        count={100}
        page={page}
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

const loadingUsersRows = () => {
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
            style={{ marginRight: '10px' }}
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
