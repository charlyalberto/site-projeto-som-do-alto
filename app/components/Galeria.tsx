"use client";

import { useEffect, useState } from "react";

export default function Galeria() {
  const [imagemAberta, setImagemAberta] = useState<number | null>(null);

  const imagens = [
    {
      src: "/images/galeria/orquestra1.jpg",
      alt: "Orquestra Som do Alto",
      className: "w-full h-[450px] object-cover",
    },
    {
      src: "/images/galeria/violino2.jpg",
      alt: "Alunos de violino",
      className: "w-full h-[450px] object-cover",
    },
    {
      src: "/images/galeria/flauta2.png",
      alt: "Alunos de flauta",
      className: "w-full h-[320px] object-cover",
    },
    {
      src: "/images/galeria/maestro1.jpeg",
      alt: "Maestro Josué Vicente",
      className: "w-full h-[320px] object-cover",
    },
    {
      src: "/images/galeria/coral1.jpg",
      alt: "Coral Som do Alto",
      className: "w-full h-[320px] object-cover",
    },
  ];

  const fecharImagem = () => {
    setImagemAberta(null);
  };

  const imagemAnterior = () => {
    if (imagemAberta === null) return;

    setImagemAberta(
      imagemAberta === 0
        ? imagens.length - 1
        : imagemAberta - 1
    );
  };

  const proximaImagem = () => {
    if (imagemAberta === null) return;

    setImagemAberta(
      imagemAberta === imagens.length - 1
        ? 0
        : imagemAberta + 1
    );
  };

  // Navegação pelo teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (imagemAberta === null) return;

      if (event.key === "Escape") {
        fecharImagem();
      }

      if (event.key === "ArrowLeft") {
        imagemAnterior();
      }

      if (event.key === "ArrowRight") {
        proximaImagem();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imagemAberta]);

  return (
    <section id="galeria" className="py-20">
      <h2 className="text-5xl font-bold text-center mb-6">
        Nossa Música em Ação
      </h2>

      <p className="text-center text-gray-600 text-lg max-w-4xl mx-auto mb-16">
        Mais do que ensinar música, buscamos formar cidadãos,
        desenvolver talentos e criar oportunidades para crianças
        e adolescentes da Zona Norte do Recife.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {imagens.map((imagem, index) => (
          <div
            key={imagem.src}
            onClick={() => setImagemAberta(index)}
            className={`overflow-hidden rounded-2xl shadow-lg cursor-pointer group ${
              index === 0 ? "md:col-span-2" : ""
            }`}
          >
            <img
              src={imagem.src}
              alt={imagem.alt}
              className={`${imagem.className} group-hover:scale-105 transition duration-500`}
            />
          </div>
        ))}

      </div>

      {/* Lightbox */}
      {imagemAberta !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={fecharImagem}
        >

          {/* Botão fechar */}
          <button
            onClick={fecharImagem}
            className="absolute top-5 right-7 text-white text-5xl font-light hover:text-gray-300 transition z-10"
            aria-label="Fechar imagem"
          >
            ×
          </button>

          {/* Botão anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              imagemAnterior();
            }}
            className="absolute left-4 md:left-8 text-white text-5xl hover:text-gray-300 transition z-10"
            aria-label="Imagem anterior"
          >
            ‹
          </button>

          {/* Imagem */}
          <div
            className="flex flex-col items-center justify-center max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imagens[imagemAberta].src}
              alt={imagens[imagemAberta].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />

            {/* Contador */}
            <div className="text-white mt-5 text-sm">
              {imagemAberta + 1} / {imagens.length}
            </div>

            {/* Descrição */}
            <p className="text-white text-center mt-2 text-lg">
              {imagens[imagemAberta].alt}
            </p>
          </div>

          {/* Botão próxima */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              proximaImagem();
            }}
            className="absolute right-4 md:right-8 text-white text-5xl hover:text-gray-300 transition z-10"
            aria-label="Próxima imagem"
          >
            ›
          </button>

        </div>
      )}
    </section>
  );
}