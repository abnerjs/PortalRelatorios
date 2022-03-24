import { Icon } from '@iconify/react';
import { Alert, AlertColor, Collapse, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { ErrorAPI } from 'src/store/ducks/types';

interface Props {
  isErrorCollapseOpened: boolean;
  setErrorCollapseOpened: Function;
  error: ErrorAPI | undefined;
  sx?: any;
}

const DmCollapseHandler = (props: Props) => {
  const [errorSeverity, setErrorSeverity] = useState<AlertColor>(
    props.error?.tipo === 1000 ? 'error' : 'warning'
  );

  useEffect(() => {
    if (props.error) {
      setErrorSeverity(props.error.tipo === 1000 ? 'error' : 'warning');
    }
  }, [props.error]);

  return (
    <Collapse
      in={props.error && props.isErrorCollapseOpened}
      sx={props.sx}
      timeout={150}
    >
      <Alert
        severity={errorSeverity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              props.setErrorCollapseOpened(false);
            }}
          >
            <Icon icon="fluent:dismiss-20-regular" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {props.error?.mensagem}
      </Alert>
    </Collapse>
  );
};

export default DmCollapseHandler;
