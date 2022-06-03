import { Box, Backdrop, Button, CircularProgress, Fade, Modal, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { arquivosDeleteRequest } from 'src/store/ducks/relatoriosUpload';

type Props = {
  open: boolean;
  setOpen: Function;
  doc: any;
};

const ModalDelete = (props: Props) => {
  const dispatch = useAppDispatch();
  const deleteState = useAppSelector((state) => state.arquivoUpload.deleteState);

  useEffect(() => {
    if (deleteState === 's') {
      props.setOpen(false);
    }
  }, [deleteState]);

  return (
    <Modal
      open={props.open}
      onClose={() => {
        props.setOpen(false);
      }}
      closeAfterTransition
      keepMounted
      disablePortal
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
    >
      <Fade in={props.open}>
        <Box className="modal-confirm-delete">
          <Typography id="transition-modal-title">Tem certeza que quer deletar o registro?</Typography>
          {props.doc.nomArquivo}
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
                props.setOpen(false);
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
                onClick={() => dispatch(arquivosDeleteRequest(props.doc))}
                disabled={deleteState === 'request'}
                type="submit"
                fullWidth
                className={deleteState === 'request' ? 'errorSecondary' : 'errorColor'}
              >
                DELETAR
              </Button>
              {deleteState === 'request' && (
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
  );
};

export default ModalDelete;
