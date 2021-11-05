import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';

import React, { useEffect, useState } from 'react';

import { Button, Tab, Tabs, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CheckIcon from '@mui/icons-material/Check';

import {
  ListboxComponent,
  StyledPopper,
} from 'src/pages/Cadastros/VinculosUsuarios/Components/Autocomplete';

import { useAppSelector, useAppDispatch } from 'src/store';
import { TipoFiltro } from 'src/store/ducks/base/types';

import { fornecedoresGetFilterRequest } from 'src/store/ducks/fornecedores';
import { prestadoresGetFilterRequest } from 'src/store/ducks/prestadores';
import { Usuario } from 'src/store/ducks/usuarios/types';

import {
  usuariosFornecedoresGetRequest,
  usuariosFornecedoresPostRequest,
  usuariosFornecedoresDeleteRequest,
} from 'src/store/ducks/usuariosFornecedores';
import {
  usuariosPrestadoresGetRequest,
  usuariosPrestadoresPostRequest,
  usuariosPrestadoresDeleteRequest,
} from 'src/store/ducks/usuariosPrestadores';
import { UsuarioFornecedor } from 'src/store/ducks/usuariosFornecedores/types';
import { UsuarioPrestador } from 'src/store/ducks/usuariosPrestadores/types';

interface FormProps {
  data: Usuario | null;
  isFormOpened: boolean;
  onCancel(): void;
}

const Form: React.FC<FormProps> = ({
  data,
  isFormOpened,
  onCancel,
}: FormProps) => {
  const [tabsForm, setTabsForm] = useState('forn');
  const [fornecedores, setFornecedores] = useState<TipoFiltro[]>([]);
  const [prestadores, setPrestadores] = useState<TipoFiltro[]>([]);

  const [fornecedoresAntigos, setFornecedoresAntigos] = useState<TipoFiltro[]>(
    []
  );
  const [prestadoresAntigos, setPrestadoresAntigos] = useState<TipoFiltro[]>(
    []
  );

  const dispatch = useAppDispatch();

  const lstFornecedores = useAppSelector(
    (state) => state.fornecedores.filterList
  );
  const lstPrestadores = useAppSelector(
    (state) => state.prestadores.filterList
  );

  const fornAux = useAppSelector((state) => state.usuariosFornecedores.data);
  const prestAux = useAppSelector((state) => state.usuariosPrestadores.data);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    setTabsForm(newValue);
  };

  function handleSubmit(e: any) {
    e.preventDefault();

    if (data) {
      const deleteForn = fornecedoresAntigos.filter(
        (x) => !fornecedores.includes(x)
      );
      const createForn = fornecedores.filter(
        (x) => !fornecedoresAntigos.includes(x)
      );

      const deletePrest = prestadoresAntigos.filter(
        (x) => !prestadores.includes(x)
      );
      const createPrest = prestadores.filter(
        (x) => !prestadoresAntigos.includes(x)
      );

      deleteForn.forEach((item) => {
        const usuForn: UsuarioFornecedor = {
          idRelUsuario: data.idRelUsuario,
          codFornecedor: parseInt(item.codigo),
        };

        dispatch(usuariosFornecedoresDeleteRequest(usuForn));
      });

      createForn.forEach((item) => {
        const usuForn: UsuarioFornecedor = {
          idRelUsuario: data.idRelUsuario,
          codFornecedor: parseInt(item.codigo),
          flgAtivo: 'S',
        };

        dispatch(usuariosFornecedoresPostRequest(usuForn));
      });

      deletePrest.forEach((item) => {
        const usuPrest: UsuarioPrestador = {
          idRelUsuario: data.idRelUsuario,
          codPrestador: parseInt(item.codigo),
        };

        dispatch(usuariosPrestadoresDeleteRequest(usuPrest));
      });

      createPrest.forEach((item) => {
        const usuPrest: UsuarioPrestador = {
          idRelUsuario: data.idRelUsuario,
          codPrestador: parseInt(item.codigo),
          flgAtivo: 'S',
        };

        dispatch(usuariosPrestadoresPostRequest(usuPrest));
      });
    }
  }

  useEffect(() => {
    const newValue = fornAux.map((item) => {
      const tipoFiltro: TipoFiltro = {
        codigo: `${item.codFornecedor}`,
        descricao: `${item.codFornecedor} - ${item.desFornecedor}`,
        flgAtivo: 'S',
      };

      return tipoFiltro;
    });

    setFornecedores(newValue);
    setFornecedoresAntigos(newValue);
  }, [fornAux]);

  useEffect(() => {
    const newValue = prestAux.map((item) => {
      const tipoFiltro: TipoFiltro = {
        codigo: `${item.codPrestador}`,
        descricao: `${item.codPrestador} - ${item.nomPrestador}`,
        flgAtivo: 'S',
      };

      return tipoFiltro;
    });

    setPrestadores(newValue);
    setPrestadoresAntigos(newValue);
  }, [prestAux]);

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

  useEffect(() => {
    if (!data) {
      setFornecedores([]);
      setFornecedoresAntigos([]);
      setPrestadores([]);
      setPrestadoresAntigos([]);
      setTabsForm('forn');
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
        options={lstFornecedores}
        getOptionLabel={(option) => option.descricao}
        limitTags={1}
        ChipProps={{ size: 'small' }}
        className={tabsForm === 'forn' ? '' : 'displayNone'}
        // renderTags={() => undefined}
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
        value={fornecedores}
        onChange={(_, data) => setFornecedores(data)}
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
        options={lstPrestadores}
        getOptionLabel={(option) => option.descricao}
        limitTags={1}
        ChipProps={{ size: 'small' }}
        className={tabsForm === 'prest' ? '' : 'displayNone'}
        // renderTags={() => undefined}
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
        value={prestadores}
        onChange={(_, data) => setPrestadores(data)}
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
