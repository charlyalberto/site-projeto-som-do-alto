"use client";

import SectionTitle from "./ui/SectionTitle";
import Input from "./ui/Input";
import Select from "./ui/Select";
import ChoiceCard from "./ui/ChoiceCard";

type FormData = {
  estuda: string;
  escola: string;
  redeEnsino: string;
  serie: string;
  periodoEstudo: string;
};

type EtapaEscolarProps = {
  dados: FormData;

  atualizar: (
    campo: keyof FormData,
    valor: FormData[keyof FormData]
  ) => void;
};

export default function EtapaEscolar({
  dados,
  atualizar,
}: EtapaEscolarProps) {
  return (
    <div>
      <SectionTitle
        icon="🎓"
        title="Dados escolares"
        description="Conte um pouco sobre a vida escolar do aluno."
      />

      <div className="space-y-6">

        {/* =================================================
            O ALUNO ESTUDA?
        ================================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            O aluno estuda atualmente? *
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <ChoiceCard
              title="Sim"
              selected={dados.estuda === "Sim"}
              onClick={() =>
                atualizar("estuda", "Sim")
              }
            />

            <ChoiceCard
              title="Não"
              selected={dados.estuda === "Não"}
              onClick={() =>
                atualizar("estuda", "Não")
              }
            />

          </div>
        </div>


        {/* =================================================
            DADOS ESCOLARES
        ================================================== */}

        {dados.estuda === "Sim" && (
          <div className="grid md:grid-cols-2 gap-6">

            <Input
              label="Nome da escola *"
              name="escola"
              value={dados.escola}
              placeholder="Digite o nome da escola"
              required
              full
              onChange={(e) =>
                atualizar(
                  "escola",
                  e.target.value
                )
              }
            />

            <Select
              label="Rede de ensino *"
              name="redeEnsino"
              value={dados.redeEnsino}
              required
              options={[
                "Pública",
                "Privada",
                "Outra",
              ]}
              onChange={(e) =>
                atualizar(
                  "redeEnsino",
                  e.target.value
                )
              }
            />

            <Select
              label="Série / ano *"
              name="serie"
              value={dados.serie}
              required
              options={[
                "1º ano",
                "2º ano",
                "3º ano",
                "4º ano",
                "5º ano",
                "6º ano",
                "7º ano",
                "8º ano",
                "9º ano",
                "1º ano do Ensino Médio",
                "2º ano do Ensino Médio",
                "3º ano do Ensino Médio",
                "EJA",
                "Outro",
              ]}
              onChange={(e) =>
                atualizar(
                  "serie",
                  e.target.value
                )
              }
            />

            <Select
              label="Turno *"
              name="periodoEstudo"
              value={dados.periodoEstudo}
              required
              options={[
                "Manhã",
                "Tarde",
                "Noite",
                "Integral",
              ]}
              onChange={(e) =>
                atualizar(
                  "periodoEstudo",
                  e.target.value
                )
              }
            />

          </div>
        )}


        {/* =================================================
            ALUNO NÃO ESTUDA
        ================================================== */}

        {dados.estuda === "Não" && (
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">

            <p className="text-sm text-gray-700 leading-relaxed">
              Como o aluno informou que não estuda atualmente,
              os dados escolares não serão solicitados.
            </p>

          </div>
        )}

      </div>
    </div>
  );
}