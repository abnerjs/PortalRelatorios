import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

import DmIconifiedSwitch from 'src/components/DmIconifiedSwitch/DmIconifiedSwitch';
import { TipoFiltro } from 'src/store/ducks/base/types';
import { PerfilObjeto } from 'src/store/ducks/perfis/types';

interface InputSwitchProps {
  options: Array<TipoFiltro>;
  value: Array<PerfilObjeto>;
  onChange: (newValue: Array<PerfilObjeto>) => void;
  isFormOpened: boolean;
  error?: boolean;
  helperText?: string;
}

const InputSwitch: React.FC<InputSwitchProps> = (props: InputSwitchProps) => {
  const updateState = (value: PerfilObjeto) => {
    const index = props.value.findIndex(
      (item) => item.codObjeto === value.codObjeto
    );

    const newValue = [...props.value];

    if (index !== -1) {
      newValue[index] = value;
    } else {
      newValue.push(value);
    }

    props.onChange(newValue);
  };

  return (
    <React.Fragment>
      {props.options.map((option, index) => {
        const value = props.value.find(
          (item) => `${item.codObjeto}` === option.codigo
        );

        return (
          <div
            key={`perfil-objeto-${index}`}
            className="userSectionCheckboxes"
            style={{
              justifyContent: 'space-between',
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  value={value?.flgAcesso || 'N'}
                  onChange={(_, checked) =>
                    updateState({
                      codObjeto: parseInt(option.codigo),
                      flgAcesso: checked ? 'C' : 'N',
                    })
                  }
                  checked={(value?.flgAcesso || 'N') !== 'N'}
                  tabIndex={props.isFormOpened ? 0 : -1}
                />
              }
              label={option.descricao.toUpperCase()}
              style={{ width: '85%' }}
              tabIndex={-1}
              componentsProps={{
                typography: {
                  style: {
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  },
                },
              }}
            />
            <DmIconifiedSwitch
              value={value?.flgAcesso || 'N'}
              onChange={(_, checked) =>
                updateState({
                  codObjeto: parseInt(option.codigo),
                  flgAcesso: checked ? 'A' : 'C',
                })
              }
              checked={(value?.flgAcesso || 'N') === 'A'}
              disabled={(value?.flgAcesso || 'N') === 'N'}
              tabIndex={-1}
            />
          </div>
        );
      })}
      <FormHelperText error={props.error}>{props.helperText}</FormHelperText>
    </React.Fragment>
  );
};

export default InputSwitch;
