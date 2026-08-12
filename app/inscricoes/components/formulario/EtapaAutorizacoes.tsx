"use client";

import SectionTitle from "./ui/SectionTitle";
import ChoiceCard from "./ui/ChoiceCard";
import Textarea from "./ui/Textarea";

type FormData = {
  autorizaImagem: string;
  justificativaNaoAutoriza: string;
  declaracaoVeracidade: boolean;
};

type EtapaAutorizacoesProps = {
  dados: FormData;

  atualizar: (
    campo: keyof FormData,
    valor: string | boolean
  ) => void;
};

export default function EtapaAutorizacoes({
  dados,
  atualizar,
}: EtapaAutorizacoesProps) {
  return (
    <div>
      <SectionTitle
        icon="✅"
        title="Autorizações e declaração"
        description="Leia atentamente as informações antes de concluir a inscrição."
      />

      <div className="space-y-8">

        {/* =================================================
            AUTORIZAÇÃO DE IMAGEM
        ================================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Autoriza o uso da imagem do aluno em registros e
            divulgações das atividades do Projeto Som do Alto? *
          </label>

          <div className="grid sm:grid-cols-2 gap-4">

            <ChoiceCard
              title="Sim"
              selected={dados.autorizaImagem === "Sim"}
              onClick={() => {
                atualizar(
                  "autorizaImagem",
                  "Sim"
                );

                atualizar(
                  "justificativaNaoAutoriza",
                  ""
                );
              }}
            />

            <ChoiceCard
              title="Não"
              selected={dados.autorizaImagem === "Não"}
              onClick={() =>
                atualizar(
                  "autorizaImagem",
                  "Não"
                )
              }
            />

          </div>
        </div>


        {/* =================================================
            JUSTIFICATIVA
        ================================================== */}

        {dados.autorizaImagem === "Não" && (
          <Textarea
            label="Caso não autorize, informe o motivo."
            name="justificativaNaoAutoriza"
            value={dados.justificativaNaoAutoriza}
            placeholder="Informe o motivo, se desejar."
            onChange={(e) =>
              atualizar(
                "justificativaNaoAutoriza",
                e.target.value
              )
            }
          />
        )}


        {/* =================================================
            DECLARAÇÃO
        ================================================== */}

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">

          <h3 className="text-lg font-bold text-gray-900 mb-3">
            Declaração de veracidade
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed mb-5">
            Declaro que as informações fornecidas neste
            formulário são verdadeiras e estou ciente de que
            elas poderão ser utilizadas para fins de cadastro,
            acompanhamento e organização das atividades do
            Projeto Som do Alto.
          </p>

          <label className="flex gap-4 cursor-pointer">

            <input
              type="checkbox"
              name="declaracaoVeracidade"
              checked={dados.declaracaoVeracidade}
              onChange={(e) =>
                atualizar(
                  "declaracaoVeracidade",
                  e.target.checked
                )
              }
              required
              className="mt-1 w-5 h-5 accent-orange-500 shrink-0"
            />

            <span className="text-sm text-gray-700 leading-relaxed">
              Declaro que as informações fornecidas neste
              formulário são verdadeiras e estou ciente de que
              os dados serão utilizados para fins relacionados
              à inscrição e acompanhamento do aluno no Projeto
              Som do Alto.
            </span>

          </label>

        </div>


        {/* =================================================
            AVISO FINAL
        ================================================== */}

        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">

          <p className="text-sm text-gray-700 leading-relaxed">
            Revise todas as informações antes de concluir.
            Após o envio, os dados serão encaminhados para
            análise e registro do Projeto Som do Alto.
          </p>

        </div>

      </div>
    </div>
  );
}