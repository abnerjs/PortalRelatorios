import { useState } from 'react';
import { Pesquisa } from 'src/store/ducks/base';
import { InfoPesquisa, InfoPesquisaProps } from 'src/store/ducks/base/types';

type CustomParametersOptions = {
  key: string;
  value?: string;
  remove?: boolean;
};

export type PesquisaHandler = (
  key: keyof InfoPesquisaProps,
  value?: number | string
) => void;

type PesquisaCustomHandler = (options: CustomParametersOptions) => void;

type InitialState = {
  init?: Partial<InfoPesquisaProps>;
  params?: Array<{ key: string; value: string }>;
};

type PesquisaHook = {
  pesquisa: Readonly<InfoPesquisaProps>;
  handlePesquisa: PesquisaHandler;
  handleCustomParameters: PesquisaCustomHandler;
};

export function usePesquisa(values?: InitialState): PesquisaHook {
  const [pesquisa, setPesquisa] = useState<InfoPesquisa>(
    new Pesquisa(values?.init, values?.params)
  );

  const handlePesquisa = (
    key: keyof InfoPesquisa,
    value?: number | string
  ) => {
    const novaPesquisa = pesquisa.clone();
    novaPesquisa.numPagina = 1;

    novaPesquisa[key] = value as never;

    setPesquisa(novaPesquisa);
  };

  const handleCustomParameters = ({
    key,
    value = '',
    remove = false,
  }: CustomParametersOptions) => {
    const novaPesquisa = pesquisa.clone();
    novaPesquisa.numPagina = 1;

    if (remove) {
      novaPesquisa.removeParameter(key);
    } else {
      novaPesquisa.setParameter(key, value ?? '');
    }

    setPesquisa(novaPesquisa);
  };

  return {
    pesquisa,
    handlePesquisa,
    handleCustomParameters,
  };
}
