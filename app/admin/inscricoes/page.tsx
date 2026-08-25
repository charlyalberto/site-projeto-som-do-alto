"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ConfiguracaoInscricoes = {
  ano?: string;
  status?: string;
  dataAbertura?: string;
  dataEncerramento?: string;
  mensagemEncerramento?: string;
};

export default function AdminInscricoesPage() {
  const [ano, setAno] = useState("2026");
  const [abertas, setAbertas] = useState(true);
  const [dataInicio, setDataInicio] = useState("2026-01-01");
  const [dataFim, setDataFim] = useState("2026-01-31");

  const [mensagemEncerramento, setMensagemEncerramento] = useState(
    "As inscrições estão encerradas. Acompanhe nossas redes sociais para saber quando abriremos um novo período de inscrições."
  );

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarConfiguracao();
  }, []);

  async function carregarConfiguracao() {
    try {
      setCarregando(true);

      const resposta = await fetch(
        "/api/admin/configuracoes",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!resposta.ok) {
        throw new Error(
          "Não foi possível consultar as configurações."
        );
      }

      const resultado = await resposta.json();

      if (!resultado.sucesso) {
        throw new Error(
          resultado.mensagem ||
            "Não foi possível consultar as configurações."
        );
      }

      const configuracao: ConfiguracaoInscricoes =
        resultado.configuracao || resultado.dados || resultado;

      if (configuracao.ano) {
        setAno(String(configuracao.ano));
      }

      if (configuracao.status) {
        setAbertas(
          String(configuracao.status).toUpperCase() ===
            "ABERTA"
        );
      }

      if (configuracao.dataAbertura) {
        setDataInicio(
          formatarDataParaInput(
            configuracao.dataAbertura
          )
        );
      }

      if (configuracao.dataEncerramento) {
        setDataFim(
          formatarDataParaInput(
            configuracao.dataEncerramento
          )
        );
      }

      if (configuracao.mensagemEncerramento) {
        setMensagemEncerramento(
          configuracao.mensagemEncerramento
        );
      }
    } catch (erro) {
      console.error(
        "Erro ao carregar configuração:",
        erro
      );

      alert(
        erro instanceof Error
          ? erro.message
          : "Não foi possível carregar as configurações."
      );
    } finally {
      setCarregando(false);
    }
  }

  function formatarDataParaInput(
    valor: string
  ): string {
    if (!valor) {
      return "";
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
      return valor;
    }

    const data = new Date(valor);

    if (Number.isNaN(data.getTime())) {
      return valor;
    }

    const anoData = data.getFullYear();
    const mes = String(
      data.getMonth() + 1
    ).padStart(2, "0");
    const dia = String(
      data.getDate()
    ).padStart(2, "0");

    return `${anoData}-${mes}-${dia}`;
  }

  function alterarAno(novoAno: string) {
    setAno(novoAno);

    setDataInicio(
      `${novoAno}-01-01`
    );

    setDataFim(
      `${novoAno}-01-31`
    );
  }

  async function salvarConfiguracao(
    status = abertas
      ? "ABERTA"
      : "FECHADA"
  ) {
    try {
      setSalvando(true);

      const resposta = await fetch(
        "/api/admin/configuracoes",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            acao: "salvarConfiguracao",
            ano,
            status,
            dataAbertura: dataInicio,
            dataEncerramento: dataFim,
            mensagemEncerramento,
          }),
        }
      );

      const resultado =
        await resposta.json();

      if (!resposta.ok || !resultado.sucesso) {
        throw new Error(
          resultado.mensagem ||
            "Não foi possível salvar as configurações."
        );
      }

      setAbertas(
        status === "ABERTA"
      );

      alert(
        status === "ABERTA"
          ? `Inscrições de ${ano} abertas com sucesso!`
          : `Inscrições de ${ano} encerradas com sucesso!`
      );
    } catch (erro) {
      console.error(
        "Erro ao salvar configuração:",
        erro
      );

      alert(
        erro instanceof Error
          ? erro.message
          : "Não foi possível salvar as configurações."
      );
    } finally {
      setSalvando(false);
    }
  }

  async function alternarStatus() {
    const novoStatus = abertas
      ? "FECHADA"
      : "ABERTA";

    const confirmar = window.confirm(
      abertas
        ? `Deseja realmente encerrar as inscrições de ${ano}?`
        : `Deseja realmente abrir as inscrições de ${ano}?`
    );

    if (!confirmar) {
      return;
    }

    await salvarConfiguracao(
      novoStatus
    );
  }

  if (carregando) {
    return (
      <main className="min-h-screen bg-gray-100">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">
                  Área Administrativa
                </p>

                <h1 className="text-2xl font-bold text-gray-900">
                  Controle de Inscrições
                </h1>
              </div>

              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
              >
                ← Voltar ao painel
              </Link>
            </div>
          </div>
        </header>

        <section className="max-w-4xl mx-auto px-6 py-10">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
            <p className="text-center text-gray-600">
              Carregando configurações...
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* =====================================================
          CABEÇALHO
      ====================================================== */}

      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">
                Área Administrativa
              </p>

              <h1 className="text-2xl font-bold text-gray-900">
                Controle de Inscrições
              </h1>
            </div>

            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
            >
              ← Voltar ao painel
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================================
          CONTEÚDO
      ====================================================== */}

      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8">
          {/* TÍTULO */}

          <div>
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl mb-5">
              📝
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Período de inscrições
            </h2>

            <p className="mt-2 text-gray-600 leading-relaxed">
              Defina o período, as datas e o status das inscrições
              para novos alunos.
            </p>
          </div>

          <div className="border-t border-gray-100 my-8" />

          {/* =================================================
              PERÍODO
          ================================================== */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* ANO */}

            <div>
              <label
                htmlFor="ano"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Ano do período
              </label>

              <select
                id="ano"
                value={ano}
                onChange={(event) =>
                  alterarAno(
                    event.target.value
                  )
                }
                disabled={salvando}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:opacity-60"
              >
                <option value="2026">
                  2026
                </option>

                <option value="2027">
                  2027
                </option>

                <option value="2028">
                  2028
                </option>

                <option value="2029">
                  2029
                </option>

                <option value="2030">
                  2030
                </option>
              </select>
            </div>

            {/* DATA INICIAL */}

            <div>
              <label
                htmlFor="dataInicio"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Data de abertura
              </label>

              <input
                id="dataInicio"
                type="date"
                value={dataInicio}
                onChange={(event) =>
                  setDataInicio(
                    event.target.value
                  )
                }
                disabled={salvando}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:opacity-60"
              />
            </div>

            {/* DATA FINAL */}

            <div>
              <label
                htmlFor="dataFim"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Data de encerramento
              </label>

              <input
                id="dataFim"
                type="date"
                value={dataFim}
                onChange={(event) =>
                  setDataFim(
                    event.target.value
                  )
                }
                disabled={salvando}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:opacity-60"
              />
            </div>
          </div>

          {/* =================================================
              STATUS
          ================================================== */}

          <div className="mt-8">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Status das inscrições
            </label>

            <div
              className={`rounded-2xl p-5 border ${
                abertas
                  ? "bg-green-50 border-green-100"
                  : "bg-red-50 border-red-100"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                      abertas
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        abertas
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />

                    {abertas
                      ? `Inscrições ${ano} abertas`
                      : `Inscrições ${ano} encerradas`}
                  </div>

                  <p
                    className={`mt-3 text-sm ${
                      abertas
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {abertas
                      ? `O formulário de inscrições para ${ano} está disponível.`
                      : `O formulário de inscrições para ${ano} está indisponível.`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={alternarStatus}
                  disabled={salvando}
                  className={`inline-flex items-center justify-center rounded-xl px-5 py-3 font-bold text-white transition disabled:opacity-60 disabled:cursor-not-allowed ${
                    abertas
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {salvando
                    ? "Salvando..."
                    : abertas
                    ? "Encerrar inscrições"
                    : "Abrir inscrições"}
                </button>
              </div>
            </div>
          </div>

          {/* =================================================
              MENSAGEM DE ENCERRAMENTO
          ================================================== */}

          <div className="mt-8">
            <label
              htmlFor="mensagemEncerramento"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Mensagem quando as inscrições estiverem encerradas
            </label>

            <textarea
              id="mensagemEncerramento"
              value={mensagemEncerramento}
              onChange={(event) =>
                setMensagemEncerramento(
                  event.target.value
                )
              }
              disabled={salvando}
              rows={4}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 resize-none disabled:opacity-60"
              placeholder="Digite a mensagem que será exibida aos visitantes..."
            />

            <p className="mt-2 text-xs text-gray-500">
              Essa mensagem será exibida na página pública quando
              as inscrições estiverem encerradas.
            </p>
          </div>

          {/* =================================================
              AÇÕES
          ================================================== */}

          <div className="border-t border-gray-100 mt-8 pt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() =>
                salvarConfiguracao()
              }
              disabled={salvando}
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 px-6 py-3.5 font-bold text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {salvando
                ? "Salvando..."
                : "Salvar configurações"}
            </button>

            <Link
              href="/inscricoes"
              target="_blank"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
            >
              Visualizar página de inscrições
            </Link>
          </div>

          {/* =================================================
              AVISO
          ================================================== */}

          <div className="mt-8 rounded-2xl bg-gray-50 border border-gray-200 p-5">
            <p className="text-sm font-bold text-gray-800">
              Próxima etapa
            </p>

            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              As configurações estão conectadas ao armazenamento
              permanente do sistema. O status definido aqui será
              aplicado automaticamente às páginas públicas de
              inscrições.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}