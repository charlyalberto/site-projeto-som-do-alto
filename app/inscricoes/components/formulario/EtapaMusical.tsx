"use client";

import SectionTitle from "./ui/SectionTitle";
import Input from "./ui/Input";
import ChoiceCard from "./ui/ChoiceCard";

type FormData = {
  tocaInstrumento: string;
  qualInstrumento: string;
  instrumentoInteresse: string;
};

type EtapaMusicalProps = {
  dados: FormData;

  atualizar: (
    campo: keyof FormData,
    valor: FormData[keyof FormData]
  ) => void;
};

export default function EtapaMusical({
  dados,
  atualizar,
}: EtapaMusicalProps) {
  return (
    <div>

      <SectionTitle
        icon="🎵"
        title="Formação musical"
        description="Conte-nos sobre a experiência musical do aluno."
      />

      <div className="space-y-8">

        {/* =================================================
            EXPERIÊNCIA COM INSTRUMENTO
        ================================================== */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Você já toca algum instrumento? *
          </label>

          <div className="grid sm:grid-cols-2 gap-4">

            <ChoiceCard
              selected={
                dados.tocaInstrumento === "Sim"
              }
              title="Sim"
              description="Já possui experiência com algum instrumento."
              onClick={() =>
                atualizar(
                  "tocaInstrumento",
                  "Sim"
                )
              }
            />

            <ChoiceCard
              selected={
                dados.tocaInstrumento === "Não"
              }
              title="Não"
              description="Ainda não toca nenhum instrumento."
              onClick={() => {
                atualizar(
                  "tocaInstrumento",
                  "Não"
                );

                atualizar(
                  "qualInstrumento",
                  ""
                );
              }}
            />

          </div>

        </div>


        {/* =================================================
            QUAL INSTRUMENTO
        ================================================== */}

        {dados.tocaInstrumento === "Sim" && (

          <Input
            label="Qual instrumento? *"
            name="qualInstrumento"
            value={dados.qualInstrumento}
            placeholder="Informe o instrumento"
            required
            onChange={(e) =>
              atualizar(
                "qualInstrumento",
                e.target.value
              )
            }
          />

        )}


        {/* =================================================
            INSTRUMENTO DE INTERESSE
        ================================================== */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Qual instrumento de interesse? *
          </label>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

            {[
              ["🎤", "Canto Coral"],
              ["🎼", "Flauta Doce"],
              ["📖", "Teoria Musical"],
              ["🎼", "Flauta Transversal"],
              ["🎻", "Violino"],
              ["🎻", "Viola"],
              ["🎻", "Violoncelo"],
              ["🎺", "Trompete"],
              ["🎺", "Trombone"],
              ["🎶", "Clarinete"],
              ["🎺", "Bombardino"],
            ].map(([icon, nome]) => (

              <ChoiceCard
                key={nome}
                selected={
                  dados.instrumentoInteresse === nome
                }
                icon={icon}
                title={nome}
                onClick={() =>
                  atualizar(
                    "instrumentoInteresse",
                    nome
                  )
                }
              />

            ))}

          </div>

        </div>


        {/* =================================================
            AVISO
        ================================================== */}

        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">

          <p className="text-sm text-gray-700 leading-relaxed">
            Algumas modalidades possuem critérios específicos
            de ingresso, conforme disponibilidade de vagas,
            instrumento próprio e conhecimento musical prévio.
          </p>

        </div>

      </div>

    </div>
  );
}