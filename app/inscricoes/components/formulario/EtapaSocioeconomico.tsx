"use client";

import SectionTitle from "./ui/SectionTitle";
import Input from "./ui/Input";
import ChoiceCard from "./ui/ChoiceCard";

type FormData = {
  televisao: string;
  geladeira: string;
  maquinaLavar: string;
  microondas: string;
  computadorNotebook: string;
  celular: string;
  internet: string;
  carro: string;
  moto: string;
};

type EtapaSocioeconomicoProps = {
  dados: FormData;

  atualizar: (
    campo: keyof FormData,
    valor: FormData[keyof FormData]
  ) => void;
};

export default function EtapaSocioeconomico({
  dados,
  atualizar,
}: EtapaSocioeconomicoProps) {
  return (
    <div>
      <SectionTitle
        icon="🏠"
        title="Perfil socioeconômico"
        description="Essas informações nos ajudam a conhecer melhor a realidade socioeconômica da família."
      />

      <div className="space-y-8">

        {/* =================================================
            BENS E EQUIPAMENTOS
        ================================================== */}

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Bens e equipamentos
          </h3>

          <p className="text-sm text-gray-500 mb-5">
            Informe a quantidade existente na residência.
          </p>

          <div className="grid md:grid-cols-2 gap-6">

            <Input
              label="Televisão"
              name="televisao"
              value={dados.televisao}
              type="number"
              min="0"
              placeholder="Quantidade"
              onChange={(e) =>
                atualizar(
                  "televisao",
                  e.target.value
                )
              }
            />

            <Input
              label="Geladeira"
              name="geladeira"
              value={dados.geladeira}
              type="number"
              min="0"
              placeholder="Quantidade"
              onChange={(e) =>
                atualizar(
                  "geladeira",
                  e.target.value
                )
              }
            />

            <Input
              label="Máquina de lavar"
              name="maquinaLavar"
              value={dados.maquinaLavar}
              type="number"
              min="0"
              placeholder="Quantidade"
              onChange={(e) =>
                atualizar(
                  "maquinaLavar",
                  e.target.value
                )
              }
            />

            <Input
              label="Micro-ondas"
              name="microondas"
              value={dados.microondas}
              type="number"
              min="0"
              placeholder="Quantidade"
              onChange={(e) =>
                atualizar(
                  "microondas",
                  e.target.value
                )
              }
            />

            <Input
              label="Computador / Notebook"
              name="computadorNotebook"
              value={dados.computadorNotebook}
              type="number"
              min="0"
              placeholder="Quantidade"
              onChange={(e) =>
                atualizar(
                  "computadorNotebook",
                  e.target.value
                )
              }
            />

            <Input
              label="Celular"
              name="celular"
              value={dados.celular}
              type="number"
              min="0"
              placeholder="Quantidade"
              onChange={(e) =>
                atualizar(
                  "celular",
                  e.target.value
                )
              }
            />

          </div>
        </div>


        {/* =================================================
            ACESSO À INTERNET
        ================================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            A residência possui acesso à internet?
          </label>

          <div className="grid sm:grid-cols-2 gap-4">

            <ChoiceCard
              title="Sim"
              selected={dados.internet === "Sim"}
              onClick={() =>
                atualizar(
                  "internet",
                  "Sim"
                )
              }
            />

            <ChoiceCard
              title="Não"
              selected={dados.internet === "Não"}
              onClick={() =>
                atualizar(
                  "internet",
                  "Não"
                )
              }
            />

          </div>
        </div>


        {/* =================================================
            VEÍCULOS
        ================================================== */}

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Veículos
          </h3>

          <p className="text-sm text-gray-500 mb-5">
            Informe a quantidade de veículos existentes na
            residência.
          </p>

          <div className="grid md:grid-cols-2 gap-6">

            <Input
              label="Carro"
              name="carro"
              value={dados.carro}
              type="number"
              min="0"
              placeholder="Quantidade"
              onChange={(e) =>
                atualizar(
                  "carro",
                  e.target.value
                )
              }
            />

            <Input
              label="Moto"
              name="moto"
              value={dados.moto}
              type="number"
              min="0"
              placeholder="Quantidade"
              onChange={(e) =>
                atualizar(
                  "moto",
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
            As informações fornecidas serão utilizadas
            exclusivamente para fins de cadastro,
            acompanhamento e planejamento das atividades
            do Projeto Som do Alto.
          </p>

        </div>

      </div>
    </div>
  );
}