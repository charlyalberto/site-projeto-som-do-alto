"use client";

import SectionTitle from "./ui/SectionTitle";
import Input from "./ui/Input";
import ChoiceCard from "./ui/ChoiceCard";
import CheckCard from "./ui/CheckCard";
import Textarea from "./ui/Textarea";

type FormData = {
  possuiNecessidade: string;
  necessidadesEspecificas: string[];
  outraNecessidade: string;
  informacaoAcolhimento: string;
  adaptacoes: string[];
  outraAdaptacao: string;
};

type EtapaNecessidadesProps = {
  dados: FormData;

  atualizar: (
    campo: keyof FormData,
    valor: FormData[keyof FormData]
  ) => void;

  toggleLista: (
    campo: "necessidadesEspecificas" | "adaptacoes",
    valor: string
  ) => void;
};

export default function EtapaNecessidades({
  dados,
  atualizar,
  toggleLista,
}: EtapaNecessidadesProps) {
  const necessidades = [
    "Deficiência física",
    "Deficiência visual",
    "Deficiência auditiva",
    "Deficiência intelectual",
    "Transtorno do espectro autista (TEA)",
    "TDAH",
    "Dislexia",
    "Outro",
  ];

  const adaptacoes = [
    "Acessibilidade física",
    "Apoio pedagógico",
    "Acompanhamento individual",
    "Recursos de comunicação",
    "Adaptação de materiais",
    "Outro",
  ];

  return (
    <div>
      <SectionTitle
        icon="♿"
        title="Necessidades específicas e inclusão"
        description="Essas informações nos ajudam a oferecer um atendimento mais adequado ao aluno."
      />

      <div className="space-y-8">

        {/* =================================================
            POSSUI NECESSIDADE ESPECÍFICA
        ================================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            O aluno possui alguma necessidade específica? *
          </label>

          <div className="grid sm:grid-cols-3 gap-4">

            <ChoiceCard
              title="Sim"
              selected={dados.possuiNecessidade === "Sim"}
              onClick={() =>
                atualizar(
                  "possuiNecessidade",
                  "Sim"
                )
              }
            />

            <ChoiceCard
              title="Não"
              selected={dados.possuiNecessidade === "Não"}
              onClick={() => {
                atualizar(
                  "possuiNecessidade",
                  "Não"
                );

                atualizar(
                  "necessidadesEspecificas",
                  []
                );

                atualizar(
                  "outraNecessidade",
                  ""
                );

                atualizar(
                  "informacaoAcolhimento",
                  ""
                );

                atualizar(
                  "adaptacoes",
                  []
                );

                atualizar(
                  "outraAdaptacao",
                  ""
                );
              }}
            />

            <ChoiceCard
              title="Prefiro não informar"
              selected={
                dados.possuiNecessidade ===
                "Prefiro não informar"
              }
              onClick={() => {
                atualizar(
                  "possuiNecessidade",
                  "Prefiro não informar"
                );

                atualizar(
                  "necessidadesEspecificas",
                  []
                );

                atualizar(
                  "outraNecessidade",
                  ""
                );

                atualizar(
                  "informacaoAcolhimento",
                  ""
                );

                atualizar(
                  "adaptacoes",
                  []
                );

                atualizar(
                  "outraAdaptacao",
                  ""
                );
              }}
            />

          </div>
        </div>


        {/* =================================================
            NECESSIDADES ESPECÍFICAS
        ================================================== */}

        {dados.possuiNecessidade === "Sim" && (
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Quais necessidades específicas?
            </label>

            <div className="grid md:grid-cols-2 gap-4">

              {necessidades.map((item) => (
                <CheckCard
                  key={item}
                  label={item}
                  checked={
                    dados.necessidadesEspecificas.includes(
                      item
                    )
                  }
                  onChange={() =>
                    toggleLista(
                      "necessidadesEspecificas",
                      item
                    )
                  }
                />
              ))}

            </div>
          </div>
        )}


        {/* =================================================
            OUTRA NECESSIDADE
        ================================================== */}

        {dados.possuiNecessidade === "Sim" &&
          dados.necessidadesEspecificas.includes(
            "Outro"
          ) && (
            <Input
              label="Outra necessidade"
              name="outraNecessidade"
              value={dados.outraNecessidade}
              placeholder="Informe qual"
              onChange={(e) =>
                atualizar(
                  "outraNecessidade",
                  e.target.value
                )
              }
            />
          )}


        {/* =================================================
            INFORMAÇÃO PARA ACOLHIMENTO
        ================================================== */}

        {dados.possuiNecessidade === "Sim" && (
          <Textarea
            label="Existe alguma informação importante para o acolhimento do aluno?"
            name="informacaoAcolhimento"
            value={dados.informacaoAcolhimento}
            placeholder="Informe algo que considere importante para o atendimento do aluno."
            onChange={(e) =>
              atualizar(
                "informacaoAcolhimento",
                e.target.value
              )
            }
          />
        )}


        {/* =================================================
            ADAPTAÇÕES NECESSÁRIAS
        ================================================== */}

        {dados.possuiNecessidade === "Sim" && (
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-3">
              O aluno necessita de alguma adaptação ou apoio?
            </label>

            <div className="grid md:grid-cols-2 gap-4">

              {adaptacoes.map((item) => (
                <CheckCard
                  key={item}
                  label={item}
                  checked={dados.adaptacoes.includes(item)}
                  onChange={() =>
                    toggleLista(
                      "adaptacoes",
                      item
                    )
                  }
                />
              ))}

            </div>
          </div>
        )}


        {/* =================================================
            OUTRA ADAPTAÇÃO
        ================================================== */}

        {dados.possuiNecessidade === "Sim" &&
          dados.adaptacoes.includes("Outro") && (
            <Input
              label="Outra adaptação ou apoio"
              name="outraAdaptacao"
              value={dados.outraAdaptacao}
              placeholder="Informe qual"
              onChange={(e) =>
                atualizar(
                  "outraAdaptacao",
                  e.target.value
                )
              }
            />
          )}

      </div>
    </div>
  );
}