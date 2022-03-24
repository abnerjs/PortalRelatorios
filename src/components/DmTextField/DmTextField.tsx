import { TextField } from '@mui/material';

interface Props {
  label: string;
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
  value?:string;
  style?: any;
  sx?: any;
  margin?: string;
  maxLength?: number;
}

const DmTextField = (props: Props) => {

  return (
    <TextField
      id={props.label.replaceAll(' ', '')}
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
      className={`DmTextField${props.secondary ? ' secondary':''}`}
      InputProps={{
        ...props.inputProps,
        disableUnderline: true,
        inputProps: {  tabIndex: props.tabIndex ? props.tabIndex : 0 },
      }}
      inputProps={{
        maxLength: props.maxLength,
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
