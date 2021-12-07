import { Icon } from '@iconify/react';
import { Alert, Collapse, IconButton } from '@mui/material';
import React from 'react';
import { ErrorAPI } from 'src/store/ducks/types';

interface Props {
  isErrorCollapseOpened: boolean;
  setErrorCollapseOpened: Function;
  error: ErrorAPI | undefined;
  sx?: any;
}

const DmCollapseHandler = (props: Props) => {
  /*
    const [errorSeverity, setErrorSeverity] = useState<AlertColor>('error');
  if (props.error) setErrorSeverity(props.error.tipo === 1000 ? 'error' : 'warning');

  useEffect(() => {
    setTimeout(() => {
      if (!props.error) setErrorSeverity('error');
    }, 400);
  }, [props.error]);
  
  */

  return (
    <Collapse in={props.error && props.isErrorCollapseOpened} sx={props.sx}>
      <Alert
        severity={props.error?.tipo === 1000 ? 'error' : 'warning'}
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
