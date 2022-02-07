import { TextField } from '@mui/material';
import React from 'react';

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
}

const DmTextField = (props: Props) => {
  return (
    <TextField
      id={props.label.replaceAll(' ', '')}
      fullWidth
      label={props.label}
      size={props.size}
      color="primary"
      margin="dense"
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
        style: {
          paddingLeft: '20px !important',
        },
      }}
      error={props.error}
      helperText={props.helperText}
      inputRef={props.ref}
      onChange={props.onChange}
      {...props.rest}
    />
  );
};

export default DmTextField;
