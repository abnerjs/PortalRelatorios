import { TextField } from '@mui/material';

interface Props {
  label: string;
  id?: string;
  ref?: any;
  rest?: any;
  size?: string;
  onChange?: any;
  tabIndex?: number;
  error?: boolean;
  helperText?: string;
  secondary?: boolean;
  inputProps?: any;
  type?: string;
  defaultValue?: string;
  value?: string;
  style?: any;
  sx?: any;
  margin?: string;
  maxLength?: number;
  minLength?: number;
}

const DmTextField = (props: Props) => {

  return (
    <TextField
      id={props.label.replaceAll(' ', '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
      fullWidth
      label={props.label}
      size={props.size}
      color="primary"
      margin={props.margin || 'dense'}
      variant="filled"
      value={props.value}
      defaultValue={props.defaultValue}
      type={props.type}
      style={{
        ...props.style,
      }}
      sx={props.sx}
      className={`DmTextField${props.secondary ? ' secondary' : ''}`}
      InputProps={{
        ...props.inputProps,
        disableUnderline: true,
        inputProps: { tabIndex: props.tabIndex ? props.tabIndex : 0 },
      }}
      inputProps={{
        maxLength: props.maxLength,
        minLength: props.minLength,
        style: {
          paddingLeft: '20px !important',
        },
      }}
      error={props.error}
      helperText={props.helperText}
      onChange={props.onChange}
      {...props.rest}
    />
  );
};

export default DmTextField;
