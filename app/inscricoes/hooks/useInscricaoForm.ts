"use client";

import { useState } from "react";

export function useInscricaoForm<T extends Record<string, unknown>>(
  dadosIniciais: T
) {
  const [dados, setDados] = useState<T>(dadosIniciais);

  const atualizar = <K extends keyof T>(
    campo: K,
    valor: T[K]
  ) => {
    setDados((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const resetarDados = () => {
    setDados(dadosIniciais);
  };

  return {
    dados,
    setDados,
    atualizar,
    resetarDados,
  };
}