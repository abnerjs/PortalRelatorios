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
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Box className="modalBox-root">
          <Typography variant="h6" component="h2">
            Upload de relatórios
          </Typography>

          <div className="dropfiles">
            <Dropzone
              onDrop={(files) => {
                setFile(files[files.length - 1]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="dropfilesContainer">
                  {file !== null ? (
                    <div className="dropzone dropzoneFilled">
                      <Form
                        sectionModalController={sectionModalController}
                        setSectionModalController={setSectionModalController}
                        file={file}
                        setFile={setFile}
                      />
                    </div>
                  ) : (
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <Icon icon="fluent:arrow-upload-16-regular" width={25} />
                      <p>CLIQUE OU ARRASTE UM ARQUIVO PARA EFETUAR UPLOAD</p>
                    </div>
                  )}
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
