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
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-6">
          O Que Dizem Sobre Nós
        </h2>

        <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto mb-16">
          Mais do que ensinar música, transformamos vidas, fortalecemos famílias
          e criamos oportunidades para crianças e adolescentes da Zona Norte do
          Recife.
        </p>

        <div className="bg-gray-50 rounded-3xl shadow-xl p-12">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-12 text-center">
            {/* ASPAS */}
            <div className="text-7xl text-orange-500 leading-none mb-2">
              ❝
            </div>

            {/* ESTRELAS */}
            <div className="text-5xl mb-8">
              ⭐⭐⭐⭐⭐
            </div>

            {/* TEXTO */}
            <p className="text-2xl italic text-gray-700 leading-relaxed max-w-3xl mx-auto mb-10">
              "{depoimentos[current].texto}"
            </p>

            {/* NOME */}
            <h3 className="font-bold text-2xl text-gray-900">
              {depoimentos[current].nome}
            </h3>

            <p className="text-gray-500 mt-2">
              {depoimentos[current].cargo}
            </p>
          </div>

          {/* INDICADORES */}
          <div className="flex justify-center gap-3 mt-8 mb-6">
            {depoimentos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition ${
                  current === index
                    ? "bg-orange-600"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* SETAS */}
          <div className="flex justify-center gap-8 mt-8">
            <button
              onClick={() =>
                setCurrent(
                  current === 0
                    ? depoimentos.length - 1
                    : current - 1
                )
              }
              className="w-14 h-14 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 text-3xl transition"
            >
              ←
            </button>

            <button
              onClick={() =>
                setCurrent(
                  current === depoimentos.length - 1
                    ? 0
                    : current + 1
                )
              }
              className="w-14 h-14 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 text-3xl transition"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}