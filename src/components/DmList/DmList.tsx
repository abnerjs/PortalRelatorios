import React, { useEffect, useState } from 'react';
import { usePesquisa } from 'src/hooks/usePesquisa';
import { useAppDispatch, useAppSelector } from 'src/store';
import { usuariosGetRequest, usuariosPutRequest } from 'src/store/ducks/usuarios';
import DmCollapseHandler from '../DmCollapseHandler/DmCollapseHandler';
import Row from './Row';

interface Props {
  handleFormOpen: Function,
  handleFormOpen: Function,
}

const DmList = (props: Props) => {
  const getError = useAppSelector((state) => state.usuarios.error);
  const [isGetErrorCollapseOpened, setGetErrorCollapseOpened] = useState(false);
  const loading = useAppSelector((state) => state.usuarios.loading);
  const usuarios = useAppSelector((state) => state.usuarios.data);
  const deleteState = useAppSelector((state) => state.usuarios.deleteState);
  const [isErrorCollapseOpened, setErrorCollapseOpened] = useState(false);
  const [rowSelected, setRowSelected] = useState(-1);
  const [isModalOpen, setModalOpen] = useState(false);
  const { pesquisa, handlePesquisa, handleCustomParameters } = usePesquisa({
    params: [{ key: 'flgTipo', value: 'I' }],
  });

  const dispatch = useAppDispatch();

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

  const handleUpdate = (index: number, flgAtivo: string) => {
    const data = { ...usuarios[index] };
    data.flgAtivo = flgAtivo;

    dispatch(usuariosPutRequest(data));
    dispatch(usuariosGetRequest(pesquisa.toString()));
  };

  useEffect(() => {
    if (deleteState === 'success') {
      if (usuario?.idRelUsuario === usuarios[rowSelected]?.idRelUsuario) {
        props.handleFormOpen(false);
      }

      setModalOpen(false);
      setRowSelected(-1);

      dispatch(usuariosGetRequest(pesquisa.toString()));
    }

    setErrorCollapseOpened(errors !== undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteState]);

  return (
    <>
      <DmCollapseHandler
        error={getError}
        isErrorCollapseOpened={isGetErrorCollapseOpened}
        setErrorCollapseOpened={setGetErrorCollapseOpened}
      />
      <div className="rows" style={{ overflow: loading ? 'hidden' : 'auto' }}>
        {loading
          ? loadingUsersRows()
          : usuarios.map((item, index) => (
              <Row
                key={`usuario-${index}`}
                data={item}
                index={index}
                indexSelected={rowSelected}
                handleFormOpen={props.handleFormOpen}
                handleModalOpen={setModalOpen}
                handleIndexSelected={setRowSelected}
                handleChangeFlgAtivo={handleUpdate}
                isFormOpened={isFormOpened}
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
