"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[700px] overflow-hidden">

      <Image
        src="/images/galeria/orquestra1.jpg"
        alt="Projeto Som do Alto"
        fill
        priority
        className="object-cover scale-105"
      />

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 h-full flex flex-col items-center text-center text-white px-6">

        {/* LOGO */}
        <div className="pt-8">
          <Image
            src="/images/logo.png"
            alt="Logo Projeto Som do Alto"
            width={420}
            height={168}
            priority
          />
        </div>

        {/* TEXTO E BOTÕES */}
        <div className="mt-auto pb-8">

          <h1 className="text-4xl md:text-6xl font-bold max-w-6xl mx-auto leading-tight mb-6">
            Transformando vidas através da música
          </h1>

          <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-10">
            Musicalização Infanto-Juvenil, Cidadania e Bem-Estar Social
          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <a
              href="#sobre"
              className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
            >
              Conheça o Projeto
            </a>

            <a
              href="#doacao"
              className="bg-orange-500 px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition"
            >
              Faça uma Doação
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}