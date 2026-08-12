"use client";

import SectionTitle from "./ui/SectionTitle";
import Input from "./ui/Input";
import Select from "./ui/Select";
import ChoiceCard from "./ui/ChoiceCard";

type FormData = {
  comoConheceu: string;
  numeroCalcado: string;
  tamanhoCamisa: string;
  tamanhoCalcaSaia: string;
};

type EtapaComoConheceuProps = {
  dados: FormData;

  atualizar: (
    campo: keyof FormData,
    valor: FormData[keyof FormData]
  ) => void;
};

export default function EtapaComoConheceu({
  dados,
  atualizar,
}: EtapaComoConheceuProps) {
  return (
    <div>
      <SectionTitle
        icon="📣"
        title="Como conheceu o projeto?"
        description="Conte como você conheceu o Projeto Som do Alto e informe as medidas do aluno."
      />

      <div className="space-y-8">

        {/* =================================================
            COMO CONHECEU
        ================================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Como você conheceu o Projeto Som do Alto? *
          </label>

          <div className="grid md:grid-cols-2 gap-4">

            {[
              "Instagram",
              "Facebook",
              "WhatsApp",
              "Indicação de amigos ou familiares",
              "Escola",
              "Igreja",
              "COMPAZ",
              "Evento ou apresentação",
              "Outro",
            ].map((opcao) => (
              <ChoiceCard
                key={opcao}
                title={opcao}
                selected={dados.comoConheceu === opcao}
                onClick={() =>
                  atualizar(
                    "comoConheceu",
                    opcao
                  )
                }
              />
            ))}

          </div>
        </div>


        {/* =================================================
            MEDIDAS
        ================================================== */}

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Medidas do aluno
          </h3>

          <p className="text-sm text-gray-500 mb-5">
            Essas informações serão utilizadas para organização
            do uniforme do projeto.
          </p>

          <div className="grid md:grid-cols-3 gap-6">

            <Input
              label="Número do calçado"
              name="numeroCalcado"
              value={dados.numeroCalcado}
              placeholder="Ex.: 35"
              onChange={(e) =>
                atualizar(
                  "numeroCalcado",
                  e.target.value
                )
              }
            />

            <Select
              label="Tamanho da camisa"
              name="tamanhoCamisa"
              value={dados.tamanhoCamisa}
              options={[
                "PP",
                "P",
                "M",
                "G",
                "GG",
                "XG",
              ]}
              onChange={(e) =>
                atualizar(
                  "tamanhoCamisa",
                  e.target.value
                )
              }
            />

            <Input
              label="Tamanho da calça / saia"
              name="tamanhoCalcaSaia"
              value={dados.tamanhoCalcaSaia}
              placeholder="Ex.: 40"
              onChange={(e) =>
                atualizar(
                  "tamanhoCalcaSaia",
                  e.target.value
                )
              }
            />

          </div>
        </div>


        {/* =================================================
            AVISO
        ================================================== */}

        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">

          <p className="text-sm text-gray-700 leading-relaxed">
            As medidas serão utilizadas exclusivamente para
            organização e distribuição do uniforme do aluno.
          </p>

        </div>

      </div>
    </div>
  );
}