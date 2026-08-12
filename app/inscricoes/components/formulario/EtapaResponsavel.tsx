"use client";

import SectionTitle from "./ui/SectionTitle";
import Input from "./ui/Input";
import Select from "./ui/Select";

type FormData = {
  nomeResponsavel: string;
  parentesco: string;
  cpfResponsavel: string;
};

type EtapaResponsavelProps = {
  dados: FormData;

  atualizar: (
    campo: keyof FormData,
    valor: FormData[keyof FormData]
  ) => void;
};

export default function EtapaResponsavel({
  dados,
  atualizar,
}: EtapaResponsavelProps) {
  return (
    <div>
      <SectionTitle
        icon="👨‍👩‍👧"
        title="Responsável legal"
        description="Informe os dados do responsável pelo aluno."
      />

      <div className="grid md:grid-cols-2 gap-6">

        <Input
          label="Nome completo do responsável *"
          name="nomeResponsavel"
          value={dados.nomeResponsavel}
          placeholder="Digite o nome completo"
          required
          full
          onChange={(e) =>
            atualizar(
              "nomeResponsavel",
              e.target.value
            )
          }
        />

        <Select
          label="Parentesco com o aluno *"
          name="parentesco"
          value={dados.parentesco}
          required
          options={[
            "Pai",
            "Mãe",
            "Avô",
            "Avó",
            "Tio",
            "Tia",
            "Irmão",
            "Irmã",
            "Outro responsável legal",
          ]}
          onChange={(e) =>
            atualizar(
              "parentesco",
              e.target.value
            )
          }
        />

        <Input
          label="CPF do responsável *"
          name="cpfResponsavel"
          value={dados.cpfResponsavel}
          placeholder="000.000.000-00"
          required
          onChange={(e) =>
            atualizar(
              "cpfResponsavel",
              e.target.value
            )
          }
        />

      </div>

      <div className="mt-8 bg-orange-50 border border-orange-100 rounded-2xl p-5">
        <p className="text-sm text-gray-700 leading-relaxed">
          Como o aluno é menor de idade, precisamos dos
          dados do responsável legal para concluir a inscrição.
        </p>
      </div>
    </div>
  );
}