"use client";

import Image from "next/image";
import Link from "next/link";

const fotos = [
  {
    src: "/images/inscricoes/flautas.jpg",
    alt: "Alunos do Projeto Som do Alto tocando flauta",
  },
  {
    src: "/images/inscricoes/violinos.jpg",
    alt: "Alunos do Projeto Som do Alto tocando violino",
  },
  {
    src: "/images/inscricoes/sda-orquestra.jpg",
    alt: "Orquestra Som do Alto em apresentação",
  },
  {
    src: "/images/inscricoes/flauta-doce.jpg",
    alt: "Alunos do Projeto Som do Alto em atividade musical",
  },
  {
    src: "/images/inscricoes/metais.jpg",
    alt: "Alunos do Projeto Som do Alto tocando instrumentos de metais",
  },
];

export default function InscricoesPage() {
  return (
    <main className="min-h-screen bg-[#fff8ef] text-gray-900">

      {/* =====================================================
          NAVEGAÇÃO DA PÁGINA DE INSCRIÇÕES
      ====================================================== */}

      <header className="bg-white border-b border-gray-100 shadow-sm">

        <div className="max-w-7xl mx-auto px-6">

          <div className="h-20 flex items-center justify-between">

            {/* LOGO */}

            <Link
              href="/"
              className="flex items-center"
              aria-label="Voltar para o site do Projeto Som do Alto"
            >
              <Image
                src="/images/logo.png"
                alt="Projeto Som do Alto"
                width={170}
                height={70}
                className="w-[150px] md:w-[170px] h-auto"
                priority
              />
            </Link>


            {/* VOLTAR AO SITE */}

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
            >
              <span className="text-lg">
                ←
              </span>

              <span>
                Voltar ao site
              </span>
            </Link>

          </div>

        </div>

      </header>


      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-[520px] overflow-hidden">

        <Image
          src="/images/inscricoes/sda-orquestra.jpg"
          alt="Orquestra Som do Alto"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 flex min-h-[520px] items-center justify-center px-6 py-16 text-center text-white">

          <div className="max-w-4xl">

            <span className="inline-flex rounded-full bg-orange-500 px-5 py-2 text-sm font-bold uppercase tracking-wide">
              Faça parte do Projeto Som do Alto
            </span>

            <h1 className="mt-6 text-5xl font-extrabold tracking-tight md:text-7xl">
              Inscrições 2026
            </h1>

            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Sua história pode começar com uma música.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">
              Aprenda música, desenvolva seu talento, faça novas amizades
              e descubra novas possibilidades através da arte.
            </p>

            <p className="mt-5 text-sm font-semibold md:text-base">
              Formação musical gratuita para crianças e adolescentes
              de 8 a 18 anos.
            </p>

            <Link
              href="/inscricoes/formulario"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:bg-orange-600 hover:scale-105"
            >
              Quero me inscrever
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          GALERIA
      ====================================================== */}

      <section className="bg-white px-6 py-5">

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2 md:grid-cols-5">

          {fotos.map((foto) => (
            <div
              key={foto.src}
              className="group relative h-32 overflow-hidden rounded-xl md:h-32"
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
          ))}

        </div>

      </section>


      {/* =====================================================
          BENEFÍCIOS
      ====================================================== */}

      <section className="px-6 py-10 md:py-12">

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="mb-4 text-3xl">
              🎵
            </div>

            <h3 className="text-lg font-bold">
              Música gratuita
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Aprendizado musical e desenvolvimento de talentos.
            </p>

          </div>


          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="mb-4 text-3xl">
              🎻
            </div>

            <h3 className="text-lg font-bold">
              Diversos instrumentos
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Flauta, violino, viola, violoncelo, metais e muito mais.
            </p>

          </div>


          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="mb-4 text-3xl">
              ❤️
            </div>

            <h3 className="text-lg font-bold">
              Transformação através da música
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Um espaço de aprendizado, convivência e oportunidades.
            </p>

          </div>

        </div>


        <div className="mx-auto mt-8 max-w-3xl text-center">

          <p className="text-lg font-bold leading-relaxed md:text-xl">
            Aqui, cada instrumento conta uma história.
            <br />
            E a próxima pode ser a sua.
          </p>

        </div>

      </section>


      {/* =====================================================
          QUEM PODE PARTICIPAR
      ====================================================== */}

      <section className="bg-white px-6 py-12">

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-sm font-bold uppercase tracking-wider text-orange-500">
            Quem pode participar?
          </span>

          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
            Faça parte dessa história
          </h2>

          <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
            O Projeto Som do Alto oferece formação musical gratuita
            para crianças e adolescentes de 8 a 18 anos, proporcionando
            aprendizado, convivência, disciplina e novas oportunidades
            através da música.
          </p>

        </div>

      </section>


      {/* =====================================================
          ANTES DE COMEÇAR
      ====================================================== */}

      <section className="px-6 py-12">

        <div className="mx-auto max-w-5xl">

          <div className="text-center">

            <span className="text-sm font-bold uppercase tracking-wider text-orange-500">
              Antes de começar
            </span>

            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
              Prepare algumas informações
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Para facilitar o preenchimento, recomendamos que você
              tenha alguns documentos e informações em mãos.
            </p>

          </div>


          <div className="mt-8 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="text-2xl">
                📱
              </div>

              <h3 className="mt-4 font-bold">
                WhatsApp
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Tenha o número do aluno ou responsável para contato
                com o projeto.
              </p>

            </div>


            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="text-2xl">
                📄
              </div>

              <h3 className="mt-4 font-bold">
                Certidão de nascimento
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Tenha uma imagem ou PDF legível da certidão do aluno.
              </p>

            </div>


            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="text-2xl">
                📷
              </div>

              <h3 className="mt-4 font-bold">
                Foto do aluno
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Uma foto recente e com o rosto do aluno visível.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA FINAL
      ====================================================== */}

      <section className="bg-orange-500 px-6 py-14 text-center text-white">

        <div className="mx-auto max-w-3xl">

          <h2 className="text-3xl font-extrabold md:text-4xl">
            Pronto para fazer parte?
          </h2>

          <p className="mt-4 text-white/90">
            Dê o primeiro passo e venha fazer parte do Projeto
            Sociomusical Som do Alto.
          </p>

          <Link
            href="/inscricoes/formulario"
            className="mt-7 inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-orange-600 shadow-lg transition hover:scale-105"
          >
            Quero me inscrever
          </Link>

        </div>

      </section>


      {/* =====================================================
          RODAPÉ
      ====================================================== */}

      <footer className="bg-gray-950 px-6 py-6 text-center text-sm text-gray-400">

        <p>
          Projeto Sociomusical Som do Alto
        </p>

        <p className="mt-1">
          Música que transforma histórias.
        </p>

      </footer>

    </main>
  );
}