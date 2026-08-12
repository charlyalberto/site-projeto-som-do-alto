"use client";

import SectionTitle from "./ui/SectionTitle";
import Input from "./ui/Input";
import Select from "./ui/Select";
import ChoiceCard from "./ui/ChoiceCard";
import CheckCard from "./ui/CheckCard";

type FormData = {
  moradia: string;
  quemMoraComAluno: string[];
  pessoasResidencia: string;
  situacaoConjugalPais: string;
  paisFalecidos: string;
  qualPaiMaeFalecido: string;
  pessoasRendaFamiliar: string;
  rendaFamiliar: string;
  outraRenda: string;
};

type EtapaSociofamiliarProps = {
  dados: FormData;

  atualizar: (
    campo: keyof FormData,
    valor: FormData[keyof FormData]
  ) => void;

  selecionarMorador: (valor: string) => void;
};

export default function EtapaSociofamiliar({
  dados,
  atualizar,
  selecionarMorador,
}: EtapaSociofamiliarProps) {
  return (
    <div>
      <SectionTitle
        icon="🏠"
        title="Perfil sociofamiliar"
        description="Queremos conhecer melhor a realidade do aluno e de sua família."
      />

      <div className="space-y-8">

        {/* =================================================
            MORADIA
        ================================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Onde e como você mora atualmente? *
          </label>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Em casa ou apartamento, com sua família",
              "Em casa de outros familiares",
              "Em casa de amigos",
              "Em habitação coletiva",
            ].map((opcao) => (
              <ChoiceCard
                key={opcao}
                selected={dados.moradia === opcao}
                title={opcao}
                onClick={() =>
                  atualizar("moradia", opcao)
                }
              />
            ))}
          </div>
        </div>


        {/* =================================================
            QUEM MORA COM O ALUNO
        ================================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Quem mora com você? *
          </label>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Moro sozinho(a)",
              "Pai",
              "Mãe",
              "Irmãos",
              "Outros parentes",
              "Amigos ou colegas",
            ].map((opcao) => (
              <CheckCard
                key={opcao}
                label={opcao}
                checked={dados.quemMoraComAluno.includes(opcao)}
                disabled={
                  opcao !== "Moro sozinho(a)" &&
                  dados.quemMoraComAluno.includes(
                    "Moro sozinho(a)"
                  )
                }
                onChange={() =>
                  selecionarMorador(opcao)
                }
              />
            ))}
          </div>
        </div>


        {/* =================================================
            PESSOAS NA RESIDÊNCIA
        ================================================== */}

        <Input
          label="Quantas pessoas moram em sua casa, incluindo você? *"
          name="pessoasResidencia"
          value={dados.pessoasResidencia}
          type="number"
          min="1"
          placeholder="Quantidade"
          required
          onChange={(e) =>
            atualizar(
              "pessoasResidencia",
              e.target.value
            )
          }
        />


        {/* =================================================
            SITUAÇÃO CONJUGAL DOS PAIS
        ================================================== */}

        <Select
          label="Qual a situação conjugal de seus pais?"
          name="situacaoConjugalPais"
          value={dados.situacaoConjugalPais}
          options={[
            "Casados",
            "União estável",
            "Separados",
            "Divorciados",
            "Viúvo(a)",
            "Outro",
            "Não informado",
          ]}
          onChange={(e) =>
            atualizar(
              "situacaoConjugalPais",
              e.target.value
            )
          }
        />


        {/* =================================================
            PAIS FALECIDOS
        ================================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Você tem pais falecidos?
          </label>

          <div className="grid sm:grid-cols-2 gap-4">

            <ChoiceCard
              selected={dados.paisFalecidos === "Não"}
              title="Não"
              onClick={() => {
                atualizar(
                  "paisFalecidos",
                  "Não"
                );

                atualizar(
                  "qualPaiMaeFalecido",
                  ""
                );
              }}
            />

            <ChoiceCard
              selected={dados.paisFalecidos === "Sim"}
              title="Sim"
              onClick={() =>
                atualizar(
                  "paisFalecidos",
                  "Sim"
                )
              }
            />

          </div>
        </div>


        {/* =================================================
            QUAL PAI / MÃE FALECEU
        ================================================== */}

        {dados.paisFalecidos === "Sim" && (
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Qual?
            </label>

            <div className="grid sm:grid-cols-3 gap-4">

              {[
                "Pai",
                "Mãe",
                "Ambos",
              ].map((opcao) => (
                <ChoiceCard
                  key={opcao}
                  selected={
                    dados.qualPaiMaeFalecido === opcao
                  }
                  title={opcao}
                  onClick={() =>
                    atualizar(
                      "qualPaiMaeFalecido",
                      opcao
                    )
                  }
                />
              ))}

            </div>
          </div>
        )}


        {/* =================================================
            RENDA FAMILIAR
        ================================================== */}

        <div className="grid md:grid-cols-2 gap-6">

          <Input
            label="Quantas pessoas vivem da renda familiar?"
            name="pessoasRendaFamiliar"
            value={dados.pessoasRendaFamiliar}
            type="number"
            min="1"
            placeholder="Quantidade"
            onChange={(e) =>
              atualizar(
                "pessoasRendaFamiliar",
                e.target.value
              )
            }
          />

          <Select
            label="Qual a renda mensal da família?"
            name="rendaFamiliar"
            value={dados.rendaFamiliar}
            options={[
              "Menos de 1 salário mínimo",
              "Até 1 salário mínimo",
              "Até 2 salários mínimos",
              "De 2 até 4 salários mínimos",
              "Superior a 5 salários mínimos",
              "Outro",
              "Prefiro não informar",
            ]}
            onChange={(e) => {
              atualizar(
                "rendaFamiliar",
                e.target.value
              );

              if (e.target.value !== "Outro") {
                atualizar(
                  "outraRenda",
                  ""
                );
              }
            }}
          />

        </div>


        {/* =================================================
            OUTRA RENDA
        ================================================== */}

        {dados.rendaFamiliar === "Outro" && (
          <Input
            label="Informe a renda familiar"
            name="outraRenda"
            value={dados.outraRenda}
            placeholder="Informe o valor ou situação"
            onChange={(e) =>
              atualizar(
                "outraRenda",
                e.target.value
              )
            }
          />
        )}

      </div>
    </div>
  );
}