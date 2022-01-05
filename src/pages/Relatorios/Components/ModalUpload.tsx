import { Icon } from '@iconify/react';
import { Backdrop, Fade, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { ArquivoUploadReceiveFormat } from 'src/store/ducks/relatoriosUpload/types';
import Form from './Form';
import './ModalUpload.css';

type Props = {
  open: boolean;
  setOpen: Function;
  doc?: ArquivoUploadReceiveFormat;
};

const ModalUpload = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [sectionModalController, setSectionModalController] = useState(0);
  const [isUnsuportedFile, setUnsuportedFile] = useState(false);
  const [isUnsuportedStyle, setUnsuportedStyle] = useState(false);
  const [isDatePickerOpened, setDatePickerOpened] = useState(false);
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (props.doc) {
      setFile(props.doc.formFile);
    }
  });

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
        <Box  className={`modalBox-root${isDatePickerOpened ? ' dateOpened' : ' teste'}`}>
          <Typography variant="h6" component="h2">
            Upload de relatórios
          </Typography>

          <div className="dropfiles">
            <Dropzone
              noClick={file !== null}
              noKeyboard={file !== null}
              noDrag={false}
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
                    })}
                    style={{
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: file !== null ? 'absolute' : 'relative',
                        visibility: file !== null ? 'hidden' : 'visible',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                        zIndex: 1001,
                      }}
                    >
                      <input {...getInputProps()} />
                      <Icon icon="fluent:arrow-upload-16-regular" width={25} />
                      <p>
                        {isUnsuportedFile
                          ? 'FORMATO DE ARQUIVO NÃO SUPORTADO! ESPERA-SE: .pdf'
                          : 'CLIQUE OU ARRASTE UM ARQUIVO PARA EFETUAR UPLOAD'}
                      </p>
                    </div>

                    <div
                      className={`modalControllerContainer${
                        file !== null ? ' filled' : ''
                      }`}
                    >
                      <div
                        style={{
                          display: file === null ? 'none' : 'flex',
                          width: '100%',
                        }}
                      >
                        <Form
                          sectionModalController={sectionModalController}
                          setSectionModalController={setSectionModalController}
                          file={file}
                          setFile={setFile}
                          setOpen={props.setOpen}
                          doc={props.doc}
                        />
                      </div>
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
