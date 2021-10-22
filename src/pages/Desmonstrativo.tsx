import React, { useState } from 'react';
import brLocale from 'date-fns/locale/pt-BR';
import ruLocale from 'date-fns/locale/ru';
import deLocale from 'date-fns/locale/de';
import enLocale from 'date-fns/locale/en-US';
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Typography,
  Box,
  Autocomplete,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Header from 'src/components/Header';
import './Usuarios.css';
import './Demonstrativo.css';
import './FormUser.css';
import './SectionizedTable.css';
import { DateRange, DateRangePicker } from '@mui/lab';
import pdf from 'src/testing/basic.pdf';

const localeMap = {
  en: enLocale,
  br: brLocale,
  ru: ruLocale,
  de: deLocale,
};

const maskMap = {
  br: '__/__/____',
  en: '__/__/____',
  ru: '__.__.____',
  de: '__.__.____',
};

const Demonstrativo = () => {
  const [locale, setLocale] = React.useState<keyof typeof maskMap>('br');
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const [autocompleteValue, setAutocompleteValue] = React.useState<
    | Array<{
        code: string;
        label: string;
        phone: string;
      }>
    | undefined
  >(undefined);

  const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    { code: 'AE', label: 'United Arab Emirates', phone: '971' },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
  ];

  const arr: string[] = ['teste1', 'teste2', 'teste3', 'teste4'];

  const selectLocale = (newLocale: any) => {
    setLocale(newLocale);
  };

  function handleSubmit(e: any) {
    e.preventDefault();
  }

  function handleSelectAutocompleteValue(
    e: any,
    newValue: { code: string; label: string; phone: string }[] | undefined
  ) {
    setAutocompleteValue(newValue);
  }

  return (
    <div className="Usuarios Demonstrativo">
      <div className="content">
        <div className="head">
          <Header title="Demonstrativo X" />
          <Typography variant="subtitle1">26/01/2019 17:50</Typography>
        </div>

        <div className="row">
          <form className={`FormUser`} onSubmit={handleSubmit}>
            <Typography variant="h6">Filtrar documento</Typography>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={localeMap[locale]}
            >
              <DateRangePicker
                mask={maskMap[locale]}
                startText="Data inicial"
                endText="Data final"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField
                      {...startProps}
                      variant="filled"
                      margin="dense"
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                    />
                    <Box sx={{ mx: '6px' }}></Box>
                    <TextField
                      {...endProps}
                      variant="filled"
                      margin="dense"
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                    />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
            <Autocomplete
              multiple
              disableListWrap={true}
              fullWidth
              clearOnBlur
              selectOnFocus
              handleHomeEndKeys
              disableCloseOnSelect
              limitTags={1}
              options={arr}
              filterSelectedOptions
              ChipProps={{ size: `small` }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label="Fornecedores"
                  variant="filled"
                  margin="dense"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                  }}
                />
              )}
            />
            <Autocomplete
              multiple
              disableListWrap={true}
              fullWidth
              clearOnBlur
              selectOnFocus
              handleHomeEndKeys
              disableCloseOnSelect
              limitTags={1}
              options={arr}
              filterSelectedOptions
              ChipProps={{ size: `small` }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label="Prestadores"
                  variant="filled"
                  margin="dense"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                  }}
                />
              )}
            />
            <Autocomplete
              multiple
              disableListWrap={true}
              fullWidth
              clearOnBlur
              selectOnFocus
              handleHomeEndKeys
              disableCloseOnSelect
              limitTags={1}
              options={arr}
              filterSelectedOptions
              ChipProps={{ size: `small` }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label="Fazendas"
                  variant="filled"
                  margin="dense"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                  }}
                />
              )}
            />
            <Autocomplete
              fullWidth
              clearOnBlur
              selectOnFocus
              handleHomeEndKeys
              disableCloseOnSelect
              options={arr}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label="Recurso"
                  variant="filled"
                  margin="dense"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                  }}
                />
              )}
            />

            <div className="buttons">
              <Button variant="contained" className="secondary">
                VOLTAR
              </Button>
              <Button variant="contained">GERAR</Button>
            </div>
          </form>
          <div className="pdf" style={{display: 'none'}}>
            <embed
              width="100%"
              height="100%"
              src={pdf}
              type="application/pdf"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demonstrativo;
