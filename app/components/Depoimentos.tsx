"use client";

import { useEffect, useState } from "react";

export default function Depoimentos() {
  const [current, setCurrent] = useState(0);

  const depoimentos = [
    {
      nome: "Naira",
      cargo: "Mãe de Carlos",
      texto:
        "O Projeto Som do Alto tem sido uma experiência transformadora para nossa família. Além do aprendizado musical, percebemos o desenvolvimento da disciplina, do respeito e da autoestima em nosso filho.",
    },
    {
      nome: "Responsável",
      cargo: "Família participante",
      texto:
        "A música despertou talentos que nem imaginávamos e fortaleceu a confiança do nosso filho. Somos muito gratos por fazer parte desta história.",
    },
    {
      nome: "Responsável",
      cargo: "Família participante",
      texto:
        "Cada apresentação é motivo de orgulho para toda a família. O projeto ensina muito mais do que música: ensina valores para a vida.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === depoimentos.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [depoimentos.length]);

  const anterior = () => {
    setCurrent((prev) =>
      prev === 0 ? depoimentos.length - 1 : prev - 1
    );
  };

  const proximo = () => {
    setCurrent((prev) =>
      prev === depoimentos.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="bg-white py-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* CABEÇALHO */}
        <div className="text-center mb-16">

          <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">
            Histórias que inspiram
          </span>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-3 mb-6">
            O Que Dizem Sobre Nós
          </h2>

          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Mais do que ensinar música, transformamos vidas, fortalecemos
            famílias e criamos oportunidades para crianças e adolescentes
            da Zona Norte do Recife.
          </p>

        </div>

        {/* DEPOIMENTO */}
        <div className="max-w-5xl mx-auto">

          <div className="relative bg-gray-50 rounded-3xl border border-gray-100 p-6 md:p-12 shadow-sm">

            {/* CARD */}
            <div className="bg-white rounded-3xl shadow-md p-8 md:p-12 text-center">

              {/* ASPAS */}
              <div className="text-7xl text-orange-500 leading-none h-16">
                ❝
              </div>

              {/* ESTRELAS */}
              <div className="text-2xl md:text-3xl mb-8 tracking-widest">
                ⭐⭐⭐⭐⭐
              </div>

              {/* TEXTO */}
              <p className="text-xl md:text-2xl italic text-gray-700 leading-relaxed max-w-3xl mx-auto mb-10">
                “{depoimentos[current].texto}”
              </p>

              {/* SEPARADOR */}
              <div className="w-12 h-1 bg-orange-500 rounded-full mx-auto mb-6"></div>

              {/* NOME */}
              <h3 className="font-bold text-xl md:text-2xl text-gray-900">
                {depoimentos[current].nome}
              </h3>

              <p className="text-gray-500 mt-2">
                {depoimentos[current].cargo}
              </p>

            </div>

          </div>

          {/* INDICADORES */}
          <div className="flex justify-center gap-3 mt-8">

            {depoimentos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Ver depoimento ${index + 1}`}
                className={`h-3 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-8 bg-orange-500"
                    : "w-3 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}

          </div>

          {/* SETAS */}
          <div className="flex justify-center gap-4 mt-8">

            <button
              onClick={anterior}
              aria-label="Depoimento anterior"
              className="w-12 h-12 rounded-full border border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-600 text-2xl transition"
            >
              ←
            </button>

            <button
              onClick={proximo}
              aria-label="Próximo depoimento"
              className="w-12 h-12 rounded-full border border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-600 text-2xl transition"
            >
              →
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}