"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Configuracao = {
  ano: number;
  status: string;
  dataAbertura: string;
  dataEncerramento: string;
  mensagemEncerramento: string;
};

export default function InscricoesCard() {
  const [configuracao, setConfiguracao] =
    useState<Configuracao | null>(null);

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarConfiguracao() {
      try {
        const resposta = await fetch(
          "/api/admin/configuracoes",
          {
            cache: "no-store",
          }
        );

        const resultado = await resposta.json();

        if (resultado.sucesso) {
          setConfiguracao(
            resultado.configuracao
          );
        }

      } catch (erro) {

        console.error(
          "Erro ao carregar configuração:",
          erro
        );

      } finally {

        setCarregando(false);

      }
    }

    carregarConfiguracao();
  }, []);

  if (carregando) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl mb-5">
          📝
        </div>

        <h3 className="text-lg font-bold text-gray-900">
          Inscrições
        </h3>

        <p className="text-sm text-gray-500 mt-3">
          Carregando configuração...
        </p>

      </div>
    );
  }

  const abertas =
    configuracao?.status === "ABERTA";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl mb-5">
        📝
      </div>

      <h3 className="text-lg font-bold text-gray-900">
        Inscrições
      </h3>

      {configuracao && (
        <p className="text-sm text-gray-600 mt-2">
          Período de inscrições{" "}
          <strong>
            {configuracao.ano}
          </strong>
        </p>
      )}

      <div className="mt-5">

        <span
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
            abertas
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >

          <span
            className={`w-2 h-2 rounded-full ${
              abertas
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />

          {abertas
            ? "Inscrições abertas"
            : "Inscrições encerradas"}

        </span>

      </div>

      <Link
        href="/admin/inscricoes"
        className="mt-5 inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
      >
        Gerenciar inscrições
      </Link>

    </div>
  );
}