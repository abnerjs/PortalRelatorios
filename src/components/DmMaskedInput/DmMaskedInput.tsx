import React, { Component } from 'react';

import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';

export default class DmMaskedInput extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: any) {
    this.setState({ text: this.ajusta(e.target.value) });
  }

  ajusta = (v: string) => {
    const digitos = !v ? '' : v.replace(/[^\d]/g, '');
    if (!digitos || digitos.length < 12) return v;
    const corte = digitos.length === 12 ? 6 : 7;
    const max = digitos.length > 13 ? 13 : digitos.length;
    return `(${digitos.substring(0, 2)}) ${digitos.substring(
      2,
      corte
    )}-${digitos.substring(corte, max)}`;
  };

  maskBuilder = (v: string) => {
    if (!v || v.length === 0) return '';
    const a = this.ajusta(v);
    return a.length < 15 ? "999.999.999-99" : "99.999.999/0001-99";
  };

  render() {
    return (
      <div>
        <div>
          <InputMask
            mask={this.state.text?.length || 0 < 15 ? "999.999.999-99" : "99.999.999/9999-99"}
            value={this.state.text}
            disabled={false}
            onChange={this.handleChange}
          >
            {() => (
              <TextField
                variant="filled"
                label="CPF/CNPJ"
                InputProps={{
                  disableUnderline: true,
                  inputProps: {
                    maxLength: 18,
                  },
                }}
                fullWidth
                type="text"
              />
            )}
          </InputMask>
        </div>
      </div>
    );
  }
}
