"use client";

import SectionTitle from "./ui/SectionTitle";
import Input from "./ui/Input";

type FormData = {
  nomeAluno: string;
  whatsapp: string;
  cpfAluno: string;
  dataNascimento: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

type EtapaDadosAlunoProps = {
  dados: FormData;
  idade: number | null;
  buscandoCep: boolean;
  erroCep: string;

  atualizar: (
    campo: keyof FormData,
    valor: FormData[keyof FormData]
  ) => void;

  calcularIdade: (data: string) => void;
  buscarCep: (valor: string) => void;
};

export default function EtapaDadosAluno({
  dados,
  idade,
  buscandoCep,
  erroCep,
  atualizar,
  calcularIdade,
  buscarCep,
}: EtapaDadosAlunoProps) {
  return (
    <div>
      <SectionTitle
        icon="👤"
        title="Dados do aluno"
        description="Informe os dados da criança ou adolescente."
      />

      <div className="grid md:grid-cols-2 gap-6">

        <Input
          label="Nome completo do aluno *"
          name="nomeAluno"
          value={dados.nomeAluno}
          placeholder="Digite o nome completo"
          required
          full
          onChange={(e) =>
            atualizar("nomeAluno", e.target.value)
          }
        />

        <Input
          label="WhatsApp do aluno ou responsável *"
          name="whatsapp"
          value={dados.whatsapp}
          placeholder="(81) 99999-9999"
          type="tel"
          required
          onChange={(e) =>
            atualizar("whatsapp", e.target.value)
          }
        />

        <Input
          label="CPF do aluno"
          name="cpfAluno"
          value={dados.cpfAluno}
          placeholder="000.000.000-00"
          onChange={(e) =>
            atualizar("cpfAluno", e.target.value)
          }
        />

        <Input
          label="Data de nascimento *"
          name="dataNascimento"
          value={dados.dataNascimento}
          type="date"
          required
          onChange={(e) =>
            calcularIdade(e.target.value)
          }
        />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Idade
          </label>

          <div className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-600">
            {idade !== null
              ? `${idade} anos`
              : "Calculada automaticamente"}
          </div>
        </div>

        <div>
          <Input
            label="CEP *"
            name="cep"
            value={dados.cep}
            placeholder="00000-000"
            required
            onChange={(e) =>
              buscarCep(e.target.value)
            }
          />

          {buscandoCep && (
            <p className="text-sm text-orange-600 mt-2">
              Consultando endereço...
            </p>
          )}

          {erroCep && (
            <p className="text-sm text-red-600 mt-2">
              {erroCep}
            </p>
          )}
        </div>

        <Input
          label="Logradouro *"
          name="endereco"
          value={dados.endereco}
          placeholder="Preenchido automaticamente pelo CEP"
          required
          full
          readOnly
          onChange={(e) =>
            atualizar("endereco", e.target.value)
          }
        />

        <Input
          label="Número *"
          name="numero"
          value={dados.numero}
          placeholder="Número"
          required
          onChange={(e) =>
            atualizar("numero", e.target.value)
          }
        />

        <Input
          label="Complemento"
          name="complemento"
          value={dados.complemento}
          placeholder="Apartamento, bloco, casa..."
          onChange={(e) =>
            atualizar("complemento", e.target.value)
          }
        />

        <Input
          label="Bairro *"
          name="bairro"
          value={dados.bairro}
          placeholder="Preenchido automaticamente"
          required
          readOnly
          onChange={(e) =>
            atualizar("bairro", e.target.value)
          }
        />

        <Input
          label="Cidade *"
          name="cidade"
          value={dados.cidade}
          placeholder="Preenchido automaticamente"
          required
          readOnly
          onChange={(e) =>
            atualizar("cidade", e.target.value)
          }
        />

        <Input
          label="UF"
          name="uf"
          value={dados.uf}
          placeholder="UF"
          readOnly
          onChange={(e) =>
            atualizar("uf", e.target.value)
          }
        />

      </div>

      {idade !== null && (
        <div className="mt-8 bg-orange-50 border border-orange-100 rounded-2xl p-5">

          {idade < 18 ? (
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>Aluno menor de 18 anos:</strong>{" "}
              os dados do responsável legal serão solicitados
              na próxima etapa.
            </p>
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>Aluno maior de idade:</strong>{" "}
              os dados de responsável não serão solicitados.
            </p>
          )}

        </div>
      )}
    </div>
  );
}