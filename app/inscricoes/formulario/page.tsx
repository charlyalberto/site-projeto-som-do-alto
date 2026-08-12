"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import ModalEnviando from "../components/formulario/ModalEnviando";
import ModalSucesso from "../components/formulario/ModalSucesso";
import EtapaDadosAluno from "../components/formulario/EtapaDadosAluno";
import EtapaDocumentos from "../components/formulario/EtapaDocumentos";
import EtapaResponsavel from "../components/formulario/EtapaResponsavel";
import EtapaEscolar from "../components/formulario/EtapaEscolar";
import EtapaMusical from "../components/formulario/EtapaMusical";
import EtapaSociofamiliar from "../components/formulario/EtapaSociofamiliar";
import EtapaNecessidades from "../components/formulario/EtapaNecessidades";
import EtapaSocioeconomico from "../components/formulario/EtapaSocioeconomico";
import EtapaComoConheceu from "../components/formulario/EtapaComoConheceu";
import EtapaAutorizacoes from "../components/formulario/EtapaAutorizacoes";
import { enviarInscricao } from "../services/inscricaoService";
import { useInscricaoForm } from "../hooks/useInscricaoForm";

type FormData = {
  nomeAluno: string;
  whatsapp: string;
  cpfAluno: string;
  dataNascimento: string;
  cidade: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  uf: string;

  certidaoNascimento: File | null;
  fotoAluno: File | null;

  nomeResponsavel: string;
  parentesco: string;
  cpfResponsavel: string;

  estuda: string;
  escola: string;
  redeEnsino: string;
  serie: string;
  periodoEstudo: string;

  tocaInstrumento: string;
  qualInstrumento: string;
  instrumentoInteresse: string;

  moradia: string;
  quemMoraComAluno: string[];
  pessoasResidencia: string;
  situacaoConjugalPais: string;
  paisFalecidos: string;
  qualPaiMaeFalecido: string;
  pessoasRendaFamiliar: string;
  rendaFamiliar: string;
  outraRenda: string;

  possuiNecessidade: string;
  necessidadesEspecificas: string[];
  outraNecessidade: string;
  informacaoAcolhimento: string;
  adaptacoes: string[];
  outraAdaptacao: string;

  televisao: string;
  geladeira: string;
  maquinaLavar: string;
  microondas: string;
  computadorNotebook: string;
  celular: string;
  internet: string;
  carro: string;
  moto: string;

  comoConheceu: string;
  numeroCalcado: string;
  tamanhoCamisa: string;
  tamanhoCalcaSaia: string;

  autorizaImagem: string;
  justificativaNaoAutoriza: string;
  declaracaoVeracidade: boolean;
};

const dadosIniciais: FormData = {
  nomeAluno: "",
  whatsapp: "",
  cpfAluno: "",
  dataNascimento: "",
  cidade: "",
  cep: "",
  endereco: "",
  numero: "",
  complemento: "",
  bairro: "",
  uf: "",

  certidaoNascimento: null,
  fotoAluno: null,

  nomeResponsavel: "",
  parentesco: "",
  cpfResponsavel: "",

  estuda: "",
  escola: "",
  redeEnsino: "",
  serie: "",
  periodoEstudo: "",

  tocaInstrumento: "",
  qualInstrumento: "",
  instrumentoInteresse: "",

  moradia: "",
  quemMoraComAluno: [],
  pessoasResidencia: "",
  situacaoConjugalPais: "",
  paisFalecidos: "",
  qualPaiMaeFalecido: "",
  pessoasRendaFamiliar: "",
  rendaFamiliar: "",
  outraRenda: "",

  possuiNecessidade: "",
  necessidadesEspecificas: [],
  outraNecessidade: "",
  informacaoAcolhimento: "",
  adaptacoes: [],
  outraAdaptacao: "",

  televisao: "0",
  geladeira: "0",
  maquinaLavar: "0",
  microondas: "0",
  computadorNotebook: "0",
  celular: "0",
  internet: "",
  carro: "0",
  moto: "0",

  comoConheceu: "",
  numeroCalcado: "",
  tamanhoCamisa: "",
  tamanhoCalcaSaia: "",

  autorizaImagem: "",
  justificativaNaoAutoriza: "",
  declaracaoVeracidade: false,
};

export default function Inscricoes() {
  const [etapa, setEtapa] = useState(1);
  const [idade, setIdade] = useState<number | null>(null);

  const {
    dados,
    atualizar,
    resetarDados,
  } = useInscricaoForm<FormData>(dadosIniciais);

  const [buscandoCep, setBuscandoCep] = useState(false);
  const [erroCep, setErroCep] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [inscricaoEnviada, setInscricaoEnviada] = useState(false);
  const [numeroInscricao, setNumeroInscricao] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const alunoMenor = idade !== null && idade < 18;

  /*
   * ETAPAS
   *
   * 1 - Dados do aluno
   * 2 - Documentos
   * 3 - Responsável, somente menor
   * 4 - Dados escolares
   * 5 - Formação musical
   * 6 - Perfil sociofamiliar
   * 7 - Necessidades específicas
   * 8 - Perfil socioeconômico
   * 9 - Como conheceu o projeto
   * 10 - Autorizações e declaração
   */

  const etapas = [
    1,
    2,
    ...(alunoMenor ? [3] : []),
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ];

  const indiceAtual = etapas.indexOf(etapa);
  const totalEtapas = etapas.length;

  const calcularIdade = (data: string) => {
    atualizar("dataNascimento", data);

    if (!data) {
      setIdade(null);
      return;
    }

    const nascimento = new Date(`${data}T00:00:00`);
    const hoje = new Date();

    let idadeCalculada =
      hoje.getFullYear() - nascimento.getFullYear();

    const mes =
      hoje.getMonth() - nascimento.getMonth();

    if (
      mes < 0 ||
      (mes === 0 &&
        hoje.getDate() < nascimento.getDate())
    ) {
      idadeCalculada--;
    }

    setIdade(idadeCalculada);

    if (idadeCalculada >= 18 && etapa === 3) {
      setEtapa(4);
    }
  };

  const buscarCep = async (valor: string) => {
    const cepLimpo = valor.replace(/\D/g, "");

    atualizar("cep", valor);
    setErroCep("");

    if (cepLimpo.length !== 8) {
      atualizar("endereco", "");
      atualizar("bairro", "");
      atualizar("cidade", "");
      atualizar("uf", "");
      return;
    }

    try {
      setBuscandoCep(true);

      const resposta = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );

      if (!resposta.ok) {
        throw new Error("Erro na consulta");
      }

      const resultado = await resposta.json();

      if (resultado.erro) {
        setErroCep("CEP não encontrado.");

        atualizar("endereco", "");
        atualizar("bairro", "");
        atualizar("cidade", "");
        atualizar("uf", "");

        return;
      }

      atualizar(
        "endereco",
        resultado.logradouro || ""
      );

      atualizar(
        "bairro",
        resultado.bairro || ""
      );

      atualizar(
        "cidade",
        resultado.localidade || ""
      );

      atualizar(
        "uf",
        resultado.uf || ""
      );
    } catch {
      setErroCep(
        "Não foi possível consultar o CEP. Você poderá preencher o endereço manualmente."
      );
    } finally {
      setBuscandoCep(false);
    }
  };

  const proximaEtapa = () => {
    const proxima = etapas[indiceAtual + 1];

    if (proxima) {
      setEtapa(proxima);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const etapaAnterior = () => {
    const anterior = etapas[indiceAtual - 1];

    if (anterior) {
      setEtapa(anterior);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const toggleLista = (
    campo:
      | "quemMoraComAluno"
      | "necessidadesEspecificas"
      | "adaptacoes",
    valor: string
  ) => {
    const lista = dados[campo];

    if (lista.includes(valor)) {
      atualizar(
        campo,
        lista.filter((item) => item !== valor)
      );
    } else {
      atualizar(
        campo,
        [...lista, valor]
      );
    }
  };

  const selecionarMorador = (valor: string) => {
    if (valor === "Moro sozinho(a)") {
      const jaSelecionado =
        dados.quemMoraComAluno.includes(
          "Moro sozinho(a)"
        );

      if (jaSelecionado) {
        atualizar(
          "quemMoraComAluno",
          []
        );

        atualizar(
          "pessoasResidencia",
          ""
        );

        return;
      }

      atualizar(
        "quemMoraComAluno",
        ["Moro sozinho(a)"]
      );

      atualizar(
        "pessoasResidencia",
        "1"
      );

      return;
    }

    const atual =
      dados.quemMoraComAluno.filter(
        (item) =>
          item !== "Moro sozinho(a)"
      );

    if (atual.includes(valor)) {
      atualizar(
        "quemMoraComAluno",
        atual.filter(
          (item) => item !== valor
        )
      );
    } else {
      atualizar(
        "quemMoraComAluno",
        [...atual, valor]
      );
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      indiceAtual <
      totalEtapas - 1
    ) {
      proximaEtapa();
      return;
    }

    if (enviando) {
      return;
    }

    if (!dados.certidaoNascimento) {
      alert(
        "Por favor, envie a certidão de nascimento do aluno."
      );

      return;
    }

    if (!dados.fotoAluno) {
      alert(
        "Por favor, envie a foto do aluno."
      );

      return;
    }

    const limiteArquivo =
      5 * 1024 * 1024;

    if (
      dados.certidaoNascimento.size >
      limiteArquivo
    ) {
      alert(
        "A certidão de nascimento deve ter no máximo 5 MB."
      );

      return;
    }

    if (
      dados.fotoAluno.size >
      limiteArquivo
    ) {
      alert(
        "A foto do aluno deve ter no máximo 5 MB."
      );

      return;
    }

    try {
      setEnviando(true);

      const resultado =
        await enviarInscricao({
          ...dados,
          certidaoNascimento:
            dados.certidaoNascimento,
          fotoAluno:
            dados.fotoAluno,
        });

      if (!resultado.sucesso) {
        throw new Error(
          resultado.mensagem ||
            "Não foi possível enviar a inscrição."
        );
      }

      setNumeroInscricao(
        resultado.id || ""
      );

      setInscricaoEnviada(true);

      resetarDados();

      setIdade(null);
      setErroCep("");
      setBuscandoCep(false);

      formRef.current?.reset();

      setEtapa(1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (erro) {
      console.error(
        "Erro ao enviar inscrição:",
        erro
      );

      alert(
        erro instanceof Error
          ? erro.message
          : "Não foi possível enviar a inscrição.\n\nVerifique sua conexão e os arquivos enviados e tente novamente."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* =====================================================
          NAVEGAÇÃO DO FORMULÁRIO
      ====================================================== */}

      <header className="bg-white border-b border-gray-100 shadow-sm">

        <div className="max-w-7xl mx-auto px-6">

          <div className="h-20 flex items-center justify-between">

            {/* LOGO */}

            <Link
              href="/inscricoes"
              className="flex items-center"
              aria-label="Voltar para as informações das inscrições"
            >
              <Image
                src="/images/logo.png"
                alt="Projeto Som do Alto"
                width={170}
                height={70}
                className="w-[150px] md:w-[170px]"
                priority
              />
            </Link>


            {/* VOLTAR */}

            <Link
              href="/inscricoes"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
            >
              <span className="text-lg">
                ←
              </span>

              <span>
                Voltar para informações da inscrição
              </span>
            </Link>

          </div>

        </div>

      </header>


      {/* =====================================================
          CABEÇALHO DO FORMULÁRIO
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 text-white">

        {/* Elementos decorativos */}

        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10" />

        <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-black/5" />

        <div className="absolute top-10 left-[8%] text-5xl opacity-10 rotate-12">
          ♪
        </div>

        <div className="absolute bottom-8 right-[12%] text-6xl opacity-10 -rotate-12">
          ♫
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-14 md:py-16">

          <div className="max-w-3xl mx-auto text-center">

            {/* IDENTIFICAÇÃO */}

            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-extrabold tracking-wide mb-6">

              <span className="text-lg">
                🎵
              </span>

              PROJETO SOM DO ALTO

            </div>

            {/* TÍTULO */}

            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Inscrições 2026
            </h1>

            {/* FRASE PRINCIPAL */}

            <p className="text-xl md:text-2xl font-semibold mt-4 leading-relaxed">
              Sua história pode começar com uma música.
            </p>

            {/* DESCRIÇÃO */}

            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              Formação musical gratuita para crianças e adolescentes
              de 8 a 18 anos.
            </p>

            {/* AVISO DOS DOCUMENTOS */}

            <div className="mt-8 max-w-xl mx-auto">

              <div className="flex items-start gap-4 text-left bg-white/95 text-gray-800 rounded-2xl px-5 py-4 shadow-lg">

                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl shrink-0">
                  📄
                </div>

                <div>

                  <p className="font-bold text-gray-900">
                    Antes de começar
                  </p>

                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    Tenha em mãos a certidão de nascimento e
                    uma foto do aluno. Esses documentos serão
                    solicitados durante a inscrição.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ÁREA DO FORMULÁRIO
      ====================================================== */}

      <section
        id="formulario-inscricao"
        className="py-10 md:py-12 px-6"
      >

        <div className="max-w-5xl mx-auto">

          {/* =================================================
              PROGRESSO
          ================================================== */}

          <div className="bg-white rounded-2xl shadow-md p-5 mb-8">

            <div className="flex justify-between items-center mb-3">

              <span className="text-sm font-semibold text-gray-700">
                Etapa {indiceAtual + 1} de {totalEtapas}
              </span>

              <span className="text-sm text-orange-600 font-semibold">

                {Math.round(
                  ((indiceAtual + 1) /
                    totalEtapas) *
                    100
                )}

                %

              </span>

            </div>

            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

              <div
                className="h-full bg-orange-500 transition-all duration-500"
                style={{
                  width: `${
                    ((indiceAtual + 1) /
                      totalEtapas) *
                    100
                  }%`,
                }}
              />

            </div>

          </div>


          {/* =================================================
              FORMULÁRIO
          ================================================== */}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-10"
          >

            {/* =================================================
                ETAPA 1 — DADOS DO ALUNO
            ================================================== */}

            {etapa === 1 && (

              <EtapaDadosAluno
                dados={{
                  nomeAluno: dados.nomeAluno,
                  whatsapp: dados.whatsapp,
                  cpfAluno: dados.cpfAluno,
                  dataNascimento:
                    dados.dataNascimento,
                  cep: dados.cep,
                  endereco: dados.endereco,
                  numero: dados.numero,
                  complemento:
                    dados.complemento,
                  bairro: dados.bairro,
                  cidade: dados.cidade,
                  uf: dados.uf,
                }}
                idade={idade}
                buscandoCep={buscandoCep}
                erroCep={erroCep}
                atualizar={(campo, valor) =>
                  atualizar(campo, valor)
                }
                calcularIdade={
                  calcularIdade
                }
                buscarCep={buscarCep}
              />

            )}


            {/* =================================================
                ETAPA 2 — DOCUMENTOS
            ================================================== */}

            {etapa === 2 && (

              <EtapaDocumentos
                certidaoNascimento={
                  dados.certidaoNascimento
                }
                fotoAluno={
                  dados.fotoAluno
                }
                atualizar={(campo, valor) =>
                  atualizar(campo, valor)
                }
              />

            )}


            {/* =================================================
                ETAPA 3 — RESPONSÁVEL
            ================================================== */}

            {etapa === 3 && (

              <EtapaResponsavel
                dados={{
                  nomeResponsavel:
                    dados.nomeResponsavel,
                  parentesco:
                    dados.parentesco,
                  cpfResponsavel:
                    dados.cpfResponsavel,
                }}
                atualizar={(campo, valor) =>
                  atualizar(campo, valor)
                }
              />

            )}


            {/* =================================================
                ETAPA 4 — ESCOLA
            ================================================== */}

            {etapa === 4 && (

              <EtapaEscolar
                dados={{
                  estuda: dados.estuda,
                  escola: dados.escola,
                  redeEnsino:
                    dados.redeEnsino,
                  serie: dados.serie,
                  periodoEstudo:
                    dados.periodoEstudo,
                }}
                atualizar={(campo, valor) =>
                  atualizar(campo, valor)
                }
              />

            )}


            {/* =================================================
                ETAPA 5 — MÚSICA
            ================================================== */}

            {etapa === 5 && (

              <EtapaMusical
                dados={{
                  tocaInstrumento:
                    dados.tocaInstrumento,
                  qualInstrumento:
                    dados.qualInstrumento,
                  instrumentoInteresse:
                    dados.instrumentoInteresse,
                }}
                atualizar={(campo, valor) =>
                  atualizar(campo, valor)
                }
              />

            )}


            {/* =================================================
                ETAPA 6 — PERFIL SOCIOFAMILIAR
            ================================================== */}

            {etapa === 6 && (

              <EtapaSociofamiliar
                dados={{
                  moradia: dados.moradia,
                  quemMoraComAluno:
                    dados.quemMoraComAluno,
                  pessoasResidencia:
                    dados.pessoasResidencia,
                  situacaoConjugalPais:
                    dados.situacaoConjugalPais,
                  paisFalecidos:
                    dados.paisFalecidos,
                  qualPaiMaeFalecido:
                    dados.qualPaiMaeFalecido,
                  pessoasRendaFamiliar:
                    dados.pessoasRendaFamiliar,
                  rendaFamiliar:
                    dados.rendaFamiliar,
                  outraRenda:
                    dados.outraRenda,
                }}
                atualizar={(campo, valor) =>
                  atualizar(campo, valor)
                }
                selecionarMorador={
                  selecionarMorador
                }
              />

            )}


            {/* =================================================
                ETAPA 7 — NECESSIDADES ESPECÍFICAS
            ================================================== */}

            {etapa === 7 && (

              <EtapaNecessidades
                dados={{
                  possuiNecessidade:
                    dados.possuiNecessidade,
                  necessidadesEspecificas:
                    dados.necessidadesEspecificas,
                  outraNecessidade:
                    dados.outraNecessidade,
                  informacaoAcolhimento:
                    dados.informacaoAcolhimento,
                  adaptacoes:
                    dados.adaptacoes,
                  outraAdaptacao:
                    dados.outraAdaptacao,
                }}
                atualizar={(campo, valor) =>
                  atualizar(campo, valor)
                }
                toggleLista={(campo, valor) =>
                  toggleLista(campo, valor)
                }
              />

            )}


            {/* =================================================
                ETAPA 8 — PERFIL SOCIOECONÔMICO
            ================================================== */}

            {etapa === 8 && (

              <EtapaSocioeconomico
                dados={{
                  televisao:
                    dados.televisao,
                  geladeira:
                    dados.geladeira,
                  maquinaLavar:
                    dados.maquinaLavar,
                  microondas:
                    dados.microondas,
                  computadorNotebook:
                    dados.computadorNotebook,
                  celular:
                    dados.celular,
                  internet:
                    dados.internet,
                  carro:
                    dados.carro,
                  moto:
                    dados.moto,
                }}
                atualizar={(campo, valor) =>
                  atualizar(campo, valor)
                }
              />

            )}


            {/* =================================================
                ETAPA 9 — COMO CONHECEU
            ================================================== */}

            {etapa === 9 && (

              <EtapaComoConheceu
                dados={{
                  comoConheceu:
                    dados.comoConheceu,
                  numeroCalcado:
                    dados.numeroCalcado,
                  tamanhoCamisa:
                    dados.tamanhoCamisa,
                  tamanhoCalcaSaia:
                    dados.tamanhoCalcaSaia,
                }}
                atualizar={(campo, valor) =>
                  atualizar(campo, valor)
                }
              />

            )}


            {/* =================================================
                ETAPA 10 — AUTORIZAÇÕES
            ================================================== */}

            {etapa === 10 && (

              <EtapaAutorizacoes
                dados={{
                  autorizaImagem:
                    dados.autorizaImagem,
                  justificativaNaoAutoriza:
                    dados.justificativaNaoAutoriza,
                  declaracaoVeracidade:
                    dados.declaracaoVeracidade,
                }}
                atualizar={atualizar}
              />

            )}


            {/* =================================================
                NAVEGAÇÃO
            ================================================= */}

            <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 mt-10 pt-8 border-t border-gray-100">

              {indiceAtual > 0 ? (

                <button
                  type="button"
                  onClick={etapaAnterior}
                  className="px-7 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition"
                >
                  ← Voltar
                </button>

              ) : (

                <div />

              )}

              {indiceAtual <
              totalEtapas - 1 ? (

                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition sm:ml-auto"
                >
                  Continuar →
                </button>

              ) : (

                <button
                  type="submit"
                  disabled={enviando}
                  className={`bg-orange-500 text-white px-8 py-3 rounded-xl font-bold transition sm:ml-auto ${
                    enviando
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:bg-orange-600"
                  }`}
                >
                  {enviando
                    ? "Enviando..."
                    : "Enviar Inscrição"}
                </button>

              )}

            </div>

          </form>

        </div>

      </section>


      {/* =====================================================
          MODAL DE ENVIO
      ====================================================== */}

      <ModalEnviando
        aberto={enviando}
      />


      {/* =====================================================
          MODAL DE SUCESSO
      ====================================================== */}

      <ModalSucesso
        aberto={inscricaoEnviada}
        numeroInscricao={
          numeroInscricao
        }
        onContinuar={() => {
          setInscricaoEnviada(
            false
          );

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      />

    </main>
  );
}