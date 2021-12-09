import { Icon } from '@iconify/react';
import { Backdrop, Fade, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import Form from './Form';

type Props = {
  open: boolean;
  setOpen: Function;
};

const ModalUpload = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [sectionModalController, setSectionModalController] = useState(0);
  const [isUnsuportedFile, setUnsuportedFile] = useState(false);
  const [isUnsuportedStyle, setUnsuportedStyle] = useState(false);

  return (
    <Modal
      aria-labelledby="form-upload-reports"
      aria-describedby="dnd-reports"
      open={props.open}
      onClose={() => {
        props.setOpen(false);
        setFile(null);
        setSectionModalController(0);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={props.open}>
        <Box className="modalBox-root">
          <Typography variant="h6" component="h2">
            Upload de relatórios
          </Typography>

          <div className="dropfiles">
            <Dropzone
              noClick={file !== null}
              noKeyboard={file !== null}
              noDrag={file !== null}
              accept=".pdf"
              onDropAccepted={(files) => {
                setFile(files[files.length - 1]);
                setUnsuportedFile(false);
              }}
              onDropRejected={(files) => {
                setUnsuportedFile(true);
                setUnsuportedStyle(true);

                setTimeout(() => {
                  setUnsuportedStyle(false);
                }, 2000);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="dropfilesContainer">
                  <div
                    {...getRootProps({
                      className: `dropzone${
                        isUnsuportedFile && isUnsuportedStyle
                          ? ' unsuportedAlert'
                          : ''
                      }${file !== null ? ' dropzoneFilled' : ''}`,
                      onDrop: (e) => {
                        if (file !== null) e.stopPropagation();
                      },
                      noDragEventsBubbling: file !== null,
                    })}
                  >
                    <div
                      className={`modalControllerContainer${
                        file !== null ? ' filled' : ''
                      }`}
                    >
                      {file === null ? (
                        <>
                          <input {...getInputProps()} />
                          <Icon
                            icon="fluent:arrow-upload-16-regular"
                            width={25}
                          />
                          <p>
                            {isUnsuportedFile
                              ? 'FORMATO DE ARQUIVO NÃO SUPORTADO! ESPERA-SE: .pdf'
                              : 'CLIQUE OU ARRASTE UM ARQUIVO PARA EFETUAR UPLOAD'}
                          </p>
                        </>
                      ) : (
                        <Form
                          sectionModalController={sectionModalController}
                          setSectionModalController={setSectionModalController}
                          file={file}
                          setFile={setFile}
                          setOpen={props.setOpen}
                        />
                      )}
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalUpload;
