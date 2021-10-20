import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';

import React, { useEffect, useState } from 'react';

import { Button, Tab, Tabs, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CheckIcon from '@mui/icons-material/Check';

import { useAppSelector, useAppDispatch } from 'src/store';
import { fornecedoresGetFilterRequest } from 'src/store/ducks/fornecedores';
import { prestadoresGetFilterRequest } from 'src/store/ducks/prestadores';
import { ListboxComponent, StyledPopper } from '../Autocomplete';
import { Usuario } from 'src/store/ducks/usuarios/types';
import { usuariosFornecedoresGetRequest } from 'src/store/ducks/usuariosFornecedores';
import { usuariosPrestadoresGetRequest } from 'src/store/ducks/usuariosPrestadores';
import { TipoFiltro } from 'src/store/ducks/base/types';

interface FormProps {
  data: Usuario | null;
  isFormOpened: boolean;
  onSuccess(): void;
  onCancel(): void;
}

const Form: React.FC<FormProps> = ({
  data,
  isFormOpened,
  onSuccess,
  onCancel,
}: FormProps) => {
  const [tabsForm, setTabsForm] = useState('forn');
  const [fornecedoresData, setFornecedoresData] = useState<TipoFiltro[]>([]);
  const [prestadoresData, setPrestadoresData] = useState<TipoFiltro[]>([]);

  const dispatch = useAppDispatch();
  const fornecedores = useAppSelector((state) => state.fornecedores.filterList);
  const prestadores = useAppSelector((state) => state.prestadores.filterList);

  const fornecedoresSelecionados = useAppSelector(
    (state) => state.usuariosFornecedores.data
  );

  const prestadoresSelecionados = useAppSelector(
    (state) => state.usuariosPrestadores.data
  );

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    setTabsForm(newValue);
  };

  function handleSubmit(e: any) {
    e.preventDefault();
  }

  useEffect(() => {
    const newValue = fornecedoresSelecionados.map((item) => {
      const tipoFiltro: TipoFiltro = {
        codigo: `${item.codFornecedor}`,
        descricao: `${item.codFornecedor} - ${item.desFornecedor}`,
        flgAtivo: 'S',
      };

      return tipoFiltro;
    });

    setFornecedoresData(newValue);
  }, [fornecedoresSelecionados]);

  useEffect(() => {
    const newValue = prestadoresSelecionados.map((item) => {
      const tipoFiltro: TipoFiltro = {
        codigo: `${item.codPrestador}`,
        descricao: `${item.codPrestador} - ${item.nomPrestador}`,
        flgAtivo: 'S',
      };

      return tipoFiltro;
    });

    setPrestadoresData(newValue);
  }, [prestadoresSelecionados]);

  useEffect(() => {
    dispatch(fornecedoresGetFilterRequest());
    dispatch(prestadoresGetFilterRequest());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(
        usuariosFornecedoresGetRequest(`?idRelUsuario=${data?.idRelUsuario}`)
      );
      dispatch(
        usuariosPrestadoresGetRequest(`?idRelUsuario=${data?.idRelUsuario}`)
      );
    }
  }, [data, dispatch]);

  return (
    <form
      className={`FormUser flexGrow${isFormOpened ? '' : ' invi'}`}
      onSubmit={handleSubmit}
    >
      <Tabs
        value={tabsForm}
        onChange={handleChangeTabs}
        aria-label="Form section controller"
      >
        <Tab disableRipple value="forn" label="Fornecedores" />
        <Tab disableRipple value="prest" label="Prestadores" />
      </Tabs>

      <Autocomplete
        multiple
        open={true}
        disableListWrap={true}
        disablePortal
        fullWidth
        clearOnBlur
        selectOnFocus
        handleHomeEndKeys
        disableCloseOnSelect
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        options={fornecedores}
        getOptionLabel={(option) => option.descricao}
        // limitTags={1}
        // ChipProps={{ size: 'small' }}
        renderTags={() => undefined}
        renderOption={(props, option, state) => {
          return [
            props,
            <React.Fragment>
              <span
                style={{
                  width: '90%',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {option.descricao}
              </span>
              {state.selected && <CheckIcon color="primary" />}
            </React.Fragment>,
          ];
        }}
        renderInput={(params: any) => (
          <TextField
            {...params}
            label="Fornecedores"
            placeholder="Pesquisar..."
            variant="filled"
            InputProps={{ ...params.InputProps, disableUnderline: true }}
            InputLabelProps={{ shrink: undefined }}
          />
        )}
        value={fornecedoresData}
        onChange={(_, data) => setFornecedoresData(data)}
        isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
      />

      <Autocomplete
        multiple
        open={true}
        disableListWrap={true}
        disablePortal
        fullWidth
        clearOnBlur
        selectOnFocus
        handleHomeEndKeys
        disableCloseOnSelect
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        options={prestadores}
        getOptionLabel={(option) => option.descricao}
        // limitTags={1}
        // ChipProps={{ size: 'small' }}
        renderTags={() => undefined}
        renderOption={(props, option, state) => {
          return [
            props,
            <React.Fragment>
              <span
                style={{
                  width: '90%',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {option.descricao}
              </span>
              {state.selected && <CheckIcon color="primary" />}
            </React.Fragment>,
          ];
        }}
        renderInput={(params: any) => (
          <TextField
            {...params}
            label="Prestadores"
            placeholder="Pesquisar..."
            variant="filled"
            InputProps={{ ...params.InputProps, disableUnderline: true }}
            InputLabelProps={{ shrink: undefined }}
          />
        )}
        value={prestadoresData}
        onChange={(_, data) => setPrestadoresData(data)}
        isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
      />

      <div className="buttons">
        <Button
          onClick={onCancel}
          tabIndex={isFormOpened ? 0 : -1}
          variant="contained"
          className="secondary"
        >
          CANCELAR
        </Button>
        <Button
          tabIndex={isFormOpened ? 0 : -1}
          variant="contained"
          type="submit"
        >
          SALVAR
        </Button>
      </div>
    </form>
  );
};

export default Form;
