import { Autocomplete, Chip, TextField } from '@mui/material';
import React, { useState } from 'react';
import {
  ListboxComponent,
  StyledPopper,
} from 'src/pages/Cadastros/VinculosUsuarios/Components/Autocomplete';
import CheckIcon from '@mui/icons-material/Check';
import { TipoArquivo } from 'src/store/ducks/tipoArquivo/types';

interface Props {
  options: AutocompleteOptions[];
  value: AutocompleteOptions[] | AutocompleteOptions | null;
  onChange: any;
  label: string;
  helperText?: string;
  error?: boolean;
  secondary?: boolean;
  multiple?: boolean;
  tabIndex?: number;
  rest?: any;
}

export interface AutocompleteOptions {
  optionLabel: string;
  value: string;
  codigo: string;
  active?: string;
}

const DmAutocomplete = (props: Props) => {
  const [focus, setFocus] = useState(false);

  return (
    <Autocomplete
      multiple={props.multiple}
      disableCloseOnSelect={props.multiple}
      fullWidth
      clearOnBlur
      blurOnSelect
      selectOnFocus
      clearText=""
      openText=""
      closeText=""
      disableListWrap
      handleHomeEndKeys
      loadingText="Carregando"
      limitTags={1}
      ChipProps={{ size: 'small' }}
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      noOptionsText="Nenhuma opção"
      options={props.options}
      getOptionLabel={(option: AutocompleteOptions) => option.optionLabel}
      renderOption={(props, option: AutocompleteOptions, state) => {
        return [
          props,
          <React.Fragment>
            <span
              style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {option.optionLabel}
            </span>
            {state.selected && <CheckIcon color="primary" />}
          </React.Fragment>,
        ];
      }}
      renderInput={(params) => {
        const { InputProps, ...restParams } = params;
        const { startAdornment, ...restInputProps } = InputProps;
        return (
          <TextField
            {...restParams}
            label={props.label}
            variant="filled"
            margin="dense"
            style={{
              marginBottom: 0,
            }}
            className={props.secondary ? 'secondary' : ''}
            InputProps={{
              ...restInputProps,
              disableUnderline: true,
              startAdornment: (
                <div
                  style={{
                    maxHeight: 50,
                    marginTop: 10,
                    marginBottom: 5,
                    marginLeft: 20,
                    overflowY: 'auto',
                  }}
                >
                  {startAdornment}
                </div>
              ),
              inputProps: {
                ...params.inputProps,
                id: props.label.replaceAll(' ', ''),
                style: {
                  paddingLeft: '0 !important',
                },
              },
            }}
            InputLabelProps={{
              shrink:
                (Array.isArray(props.value) && props.value.length > 0) ||
                (!Array.isArray(props.value) && props.value !== null) ||
                focus,
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            error={props.error}
            helperText={props.helperText}
          />
        );
      }}
      value={props.value}
      onChange={props.onChange}
      isOptionEqualToValue={(
        option: AutocompleteOptions,
        value: AutocompleteOptions
      ) => option.value === value.value
      }
      {...props.rest}
    />
  );
};

export default DmAutocomplete;
