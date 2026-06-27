"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {

const [current, setCurrent] = useState(0);

const depoimentos = [
  {
    nome: "Naira",
    cargo: "Mãe de Carlos",
    texto:
      "O Projeto Som do Alto tem sido uma experiência transformadora para nossa família. Além do aprendizado musical, percebemos o desenvolvimento da disciplina, do respeito e da autoestima em nosso filho."
  },
  {
    nome: "Responsável",
    cargo: "Família participante",
    texto:
      "A música despertou talentos que nem imaginávamos e fortaleceu a confiança do nosso filho. Somos muito gratos por fazer parte desta história."
  },
  {
    nome: "Responsável",
    cargo: "Família participante",
    texto:
      "Cada apresentação é motivo de orgulho para toda a família. O projeto ensina muito mais do que música: ensina valores para a vida."
  }
];

useEffect(() => {
  const interval = setInterval(() => {
    setCurrent((prev) =>
      prev === depoimentos.length - 1 ? 0 : prev + 1
    );
  }, 5000); // troca a cada 5 segundos

  return () => clearInterval(interval);
}, [depoimentos.length]);

  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative h-[700px] overflow-hidden">

        <Image
          src="/images/orquestra.jpg"
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

      {/* QUEM SOMOS */}
      <section id="sobre" className="max-w-6xl mx-auto px-6 py-20">

        <h2 className="text-5xl font-bold text-center mb-6">
          Quem Somos
        </h2>

        <p className="text-center text-gray-600 text-lg max-w-4xl mx-auto mb-16">
          Há mais de três décadas, o <strong>Maestro Josué Silva</strong> utiliza a música como ferramenta de 
          transformação social para crianças e adolescentes das comunidades da Zona Norte do Recife.
          O Projeto Som do Alto nasceu desse propósito e atualmente atende cerca de <strong>120 
          crianças e adolescentes</strong>, oferecendo formação musical gratuita, inclusão social e 
          desenvolvimento humano.
        </p>

      </section>

{/* NOSSA HISTÓRIA */}
<section className="bg-gray-50 py-24">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-5xl font-bold text-center mb-6">
      Nossa História
    </h2>

    <p className="text-center text-gray-600 text-lg max-w-4xl mx-auto mb-16">
      Há mais de 30 anos transformando vidas através da música, promovendo inclusão,
cidadania e oportunidades para crianças e adolescentes da Zona Norte do Recife.
    </p>

    {/* PRIMEIRA LINHA */}
    <div className="grid md:grid-cols-3 gap-8 mb-8">

      <div className="h-full bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">
        <div className="text-5xl mb-4">🎼</div>

        <h3 className="text-3xl font-bold text-orange-600">
          1990
        </h3>

        <h4 className="font-bold text-xl mt-2 mb-4">
          O Início
        </h4>

        <p className="text-gray-600">
          Maestro Josué Silva inicia oficinas gratuitas de música em sua residência no Alto Santa Terezinha.
        </p>
      </div>

      <div className="h-full bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">
        <div className="text-5xl mb-4">🎻</div>

        <h3 className="text-3xl font-bold text-orange-600">
          2000
        </h3>

        <h4 className="font-bold text-xl mt-2 mb-4">
          Expansão
        </h4>

        <p className="text-gray-600">
          Ampliação das atividades com novos instrumentos e formação de jovens músicos na comunidade.
        </p>
      </div>

      <div className="h-full bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">
        <div className="text-5xl mb-4">🤝</div>

        <h3 className="text-3xl font-bold text-orange-600">
          2014
        </h3>

        <h4 className="font-bold text-xl mt-2 mb-4">
          ADEJAPE
        </h4>

        <p className="text-gray-600">
          Fortalecimento institucional através da integração com a ADEJAPE e ampliação da estrutura do projeto.
        </p>
      </div>

    </div>

      {/* SEGUNDA LINHA */}
<div className="flex justify-center gap-8 -mb-4">

  {/* 2023 */}
  <div className="h-full w-[450px] bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

    <div className="text-5xl mb-4">🎶</div>

    <h3 className="text-3xl font-bold text-orange-600">
      2023
    </h3>

    <h4 className="font-bold text-xl mt-2 mb-4">
      Consolidação
    </h4>

    <p className="text-gray-600">
      Fortalecimento da marca Projeto Som do Alto, ampliação das atividades e retomada da identidade própria da iniciativa.
    </p>

  </div>

  {/* 2026 */}
  <div className="h-full w-[450px] bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

    <div className="text-5xl mb-4">👨‍👩‍👧‍👦</div>

    <h3 className="text-3xl font-bold text-orange-600">
      2026
    </h3>

    <h4 className="font-bold text-xl mt-2 mb-4">
      120+ Participantes
    </h4>

    <p className="text-gray-600">
      Mais de 120 participantes atendidos gratuitamente,
além de centenas de vidas transformadas pela música ao longo de mais de três décadas.
    </p>

  </div>

</div>

  </div>

</section>

      {/* NOSSO IMPACTO */}
      <section className="bg-gray-100 py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center mb-6">
            Nosso Impacto
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white p-8 rounded-2xl text-center shadow hover:shadow-xl transition duration-300">
              <h3 className="text-6xl font-bold text-orange-600">350+</h3>
              <p>Alunos Atendidos</p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center shadow hover:shadow-xl transition duration-300">
              <h3 className="text-6xl font-bold text-orange-600">30+</h3>
              <p>Anos de História</p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center shadow hover:shadow-xl transition duration-300">
              <h3 className="text-6xl font-bold text-orange-600">10+</h3>
              <p>Voluntários</p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center shadow hover:shadow-xl transition duration-300">
              <h3 className="text-6xl font-bold text-orange-600">8+</h3>
              <p>Comunidades Atendidas</p>
            </div>

          </div>

        </div>

      </section>

      {/* GALERIA */}
<section className="bg-white py-24">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-5xl font-bold text-center mb-6">
      Nossa Música em Ação
    </h2>

    <p className="text-center text-gray-600 text-lg max-w-4xl mx-auto mb-16">
      Mais do que ensinar música, buscamos formar cidadãos,
      desenvolver talentos e criar oportunidades para crianças
      e adolescentes da Zona Norte do Recife.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="md:col-span-2 overflow-hidden rounded-2xl shadow-lg">
        <img
          src="/images/galeria/orquestra1.jpg"
          alt="Orquestra"
          className="w-full h-[450px] object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src="/images/galeria/violino2.jpg"
          alt="Violinos"
          className="w-full h-[450px] object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src="/images/galeria/flauta2.png"
          alt="Flautas"
          className="w-full h-[320px] object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src="/images/galeria/maestro1.jpeg"
          alt="Maestro"
          className="w-full h-[320px] object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src="/images/galeria/coral1.jpg"
          alt="Coral"
          className="w-full h-[320px] object-cover hover:scale-105 transition duration-500"
        />
      </div>

    </div>

  </div>



{/* CURSOS OFERECIDOS */}
<section className="bg-gray-50 py-24">

  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-5xl font-bold text-center mb-6">
      Cursos Oferecidos
    </h2>

    <p className="text-center text-gray-600 text-lg max-w-4xl mx-auto mb-16">
      O Projeto Som do Alto oferece formação musical gratuita,
      proporcionando aprendizado técnico, desenvolvimento humano
      e experiências coletivas através da música.
    </p>

    {/* FORMAÇÃO MUSICAL */}
    <h3 className="text-3xl font-bold text-orange-600 mb-8">
      🎤 Formação Musical
    </h3>

    <div className="grid md:grid-cols-3 gap-6 mb-16">

      <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
        <h4 className="text-2xl font-bold mb-3">🎤 Canto Coral</h4>
        <p className="text-gray-600">
          Desenvolvimento vocal, expressão artística e integração em grupo.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
        <h4 className="text-2xl font-bold mb-3">📖 Teoria Musical</h4>
        <p className="text-gray-600">
          Leitura musical, percepção auditiva e fundamentos da música.
        </p>
      </div>

    </div>

    {/* MADEIRAS */}
    <h3 className="text-3xl font-bold text-orange-600 mb-8">
      🎼 Madeiras
    </h3>

    <div className="grid md:grid-cols-3 gap-6 mb-16">

      <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
        <h4 className="text-2xl font-bold mb-3">🎼 Flauta Doce</h4>
        <p className="text-gray-600">
          Iniciação musical e desenvolvimento das primeiras habilidades instrumentais.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
        <h4 className="text-2xl font-bold mb-3">🎼 Flauta Transversal</h4>
        <p className="text-gray-600">
          Formação técnica e artística voltada para a prática instrumental e repertório orquestral.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
        <h4 className="text-2xl font-bold mb-3">🎶 Clarinete</h4>
        <p className="text-gray-600">
          Desenvolvimento da técnica instrumental, sonoridade e participação em conjuntos musicais.
        </p>
      </div>

    </div>

    {/* CORDAS */}
    <h3 className="text-3xl font-bold text-orange-600 mb-8">
      🎻 Cordas
    </h3>

    <div className="grid md:grid-cols-3 gap-6 mb-16">

      <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
        <h4 className="text-2xl font-bold mb-3">🎻 Violino</h4>
        <p className="text-gray-600">
          Técnica instrumental, leitura musical e prática em conjunto.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
        <h4 className="text-2xl font-bold mb-3">🎻 Viola</h4>
        <p className="text-gray-600">
          Formação musical voltada para repertório orquestral e música de câmara.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
        <h4 className="text-2xl font-bold mb-3">🎻 Violoncelo</h4>
        <p className="text-gray-600">
          Desenvolvimento técnico e interpretação musical para prática orquestral.
        </p>
      </div>

    </div>

    {/* METAIS */}
    <h3 className="text-3xl font-bold text-orange-600 mb-8">
      🎺 Metais
    </h3>

    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
        <h4 className="text-2xl font-bold mb-3">🎺 Trompete</h4>
        <p className="text-gray-600">
          Formação instrumental e execução de repertórios variados.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
        <h4 className="text-2xl font-bold mb-3">🎺 Trombone</h4>
        <p className="text-gray-600">
          Aprendizado técnico e participação em grupos instrumentais.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
        <h4 className="text-2xl font-bold mb-3">🎺 Bombardino</h4>
        <p className="text-gray-600">
          Desenvolvimento musical voltado para bandas e orquestras.
        </p>
      </div>

    </div>

  </div>

</section>

</section>

{/* VÍDEOS */}
<section className="bg-white py-24">

  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-5xl font-bold text-center mb-6">
      Nossa Música em Ação
    </h2>

    <p className="text-center text-gray-600 text-lg max-w-4xl mx-auto mb-16">
      Conheça um pouco do trabalho desenvolvido pelo Projeto Som do Alto através
      de apresentações, concertos, reportagens e ações que transformam vidas
      por meio da música.
    </p>

    
  {/* VÍDEO PRINCIPAL */}
    <div className="max-w-3xl mx-auto mb-10">

   <div className="h-[450px] rounded-2xl overflow-hidden shadow-2xl">

            <h3 className="text-center text-2xl font-bold mb-4 text-orange-600">
              Reportagem da TV Globo
            </h3>

          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/-9JNKPUvtDc"
            title="Reportagem Projeto Som do Alto"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

        </div>

      </div>

  {/* VÍDEOS SECUNDÁRIOS */}
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

      <div className="aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">

        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/TffprmNv44c"
          title="Ele é Jeová"
          allowFullScreen
        ></iframe>

      </div>

      <div className="aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">

        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/VBQCUBY1HQI"
          title="Concerto de Natal"
          allowFullScreen
        ></iframe>

      </div>

      <div className="aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">

        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/jfzAAe-RqWA"
          title="Apresentação Musical"
          allowFullScreen
        ></iframe>

      </div>

    </div>

    {/* BOTÃO YOUTUBE */}
    <div className="text-center mt-16">

      <a
        href="https://www.youtube.com/@ProjetoSomdoAlto"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-orange-600 hover:bg-orange-100 px-8 py-4 rounded-xl font-bold text-lg transition"
        
      >
        ▶ Conheça nosso Canal no YouTube
      </a>

    </div>

  </div>

</section>

{/* PARCEIROS E APOIADORES */}
<section className="bg-gray-50 py-24">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-5xl font-bold text-center mb-6">
      Parceiros e Apoiadores
    </h2>

    <p className="text-center text-gray-600 text-lg max-w-4xl mx-auto mb-16">
      O Projeto Som do Alto acredita que a transformação social acontece por meio
      da união entre pessoas, instituições e iniciativas comprometidas com o
      desenvolvimento humano através da música.
    </p>

    <div className="grid md:grid-cols-3 gap-8">

      {/* COMPAZ */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">
        
        <div className="h-44 flex items-center justify-center mb-6">
        <img
          src="/images/parceiros/compaz.logo.png"
          alt="COMPAZ Eduardo Campos"
          className="max-h-28 object-contain"
        />
        </div>
        
        <h3 className="text-2xl font-bold mb-4 min-h-[64px] flex items-center justify-center">
          COMPAZ 
        </h3>

        <p className="text-gray-600">
          Centro Comunitário da Paz Governador Eduardo Campos,
          espaço parceiro que acolhe nossas atividades e contribui
          para o desenvolvimento das ações socioculturais.
        </p>

      </div>

      {/* ADHEPE */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">
        
        <div className="h-44 flex items-center justify-center mb-6">
        
          <img
            src="/images/parceiros/Som.logo.png"
            alt="ADHEPE"
            className="max-h-44 object-contain"
          />
          </div>
        
        <h3 className="text-2xl font-bold mb-4 min-h-[64px] flex items-center justify-center">
          ADHEPE
        </h3>

        <p className="text-gray-600">
          Associação responsável pela gestão e fortalecimento institucional
          do Projeto Som do Alto, ampliando o alcance das ações socioculturais.
        </p>

      </div>

      {/* APOIADOR */}
      <div className="bg-orange-50 border-2 border-orange-500 rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

        <div className="h-44 flex items-center justify-center mb-6">
          
          <div className="text-7xl">
          ❤️
        </div>

          </div>
        <h3 className="text-2xl font-bold mb-4 min-h-[64px] flex items-center justify-center">
          Seja um Apoiador
        </h3>

        <p className="text-gray-600 mb-6">
          Sua empresa ou instituição também pode contribuir para a formação
          musical e cidadã de crianças e adolescentes da Zona Norte do Recife.
        </p>

        <a
          href="#contato"
          className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Quero Apoiar
        </a>

      </div>

    </div>

  </div>

</section>
     
      {/* APOIE O PROJETO */}
<section className="bg-orange-600 py-24 text-white">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-5xl font-bold text-center mb-6">
      Apoie o Projeto Som do Alto
    </h2>

    <p className="text-center text-xl max-w-4xl mx-auto mb-16 text-orange-100">
      Sua contribuição ajuda a transformar vidas através da música,
      proporcionando oportunidades para crianças e adolescentes da Zona Norte do Recife.
    </p>

    <div className="grid md:grid-cols-3 gap-6 mb-16">

      {/* DOAÇÃO */}
      <div className="bg-white text-gray-800 rounded-2xl shadow-x1 p-8 shadow-xl text-center hover:shadow-2x1 transition">

        <div className="h-24 flex items-center justify-center mb-6 text-7xl">
          ❤️
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4 min-h-[70px] flex items-center justify-center">
          Faça uma Doação
        </h3>

        <p className="text-gray-600">
          Contribua com recursos para aquisição de instrumentos,
          material didático, lanches e manutenção das atividades.
        </p>

      </div>

      {/* PATROCINADOR */}
      <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-xl text-center hover:-translate-y-2 transition">

        <div className="h-24 flex items-center justify-center mb-6 text-7xl">
          🤝
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4 min-h-[70px] flex items-center justify-center">
          Seja um Patrocinador
        </h3>

        <p className="text-gray-600">
          Empresas e instituições podem apoiar o projeto e fortalecer
          o impacto social da música em nossa comunidade.
        </p>

      </div>

      {/* INSTRUMENTO */}
      <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-xl text-center hover:-translate-y-2 transition">

        <div className="h-24 flex items-center justify-center mb-6 text-7xl">
          🎼
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4 min-h-[70px] flex items-center justify-center">
          Adote um Instrumento
        </h3>

        <p className="text-gray-600">
          Ajude na aquisição e manutenção de instrumentos que serão
          utilizados por nossos alunos durante as aulas.
        </p>

      </div>

    </div>

    <div className="text-center mt-16">

      <a
        href="#contato"
        className="inline-block bg-white text-orange-600 hover:bg-orange-100 hover:scale-105 px-8 py-4 rounded-xl font-bold text-lg transition"
      >
        ❤️ Quero Apoiar o Projeto
      </a>

    </div>

  </div>

</section>

{/* DEPOIMENTOS */}
<section className="bg-white py-24">

  <div className="max-w-5xl mx-auto px-6">

    <h2 className="text-5xl font-bold text-center mb-6">
      O Que Dizem Sobre Nós
    </h2>

    <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto mb-16">
      Mais do que ensinar música, transformamos vidas, fortalecemos famílias
      e criamos oportunidades para crianças e adolescentes da Zona Norte do Recife.
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

{/* ================= CONTATO ================= */}
<section
  id="contato"
  className="bg-gray-50 py-32"
>

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-5xl font-bold text-center mb-6">
      Vamos Conversar?
    </h2>

    <p className="text-center text-gray-600 text-xl max-w-3xl mx-auto mb-20">
      Tem interesse em conhecer nosso projeto, agendar uma apresentação ou
      contribuir para transformar vidas através da música?
    </p>

    <div className="grid md:grid-cols-3 gap-10">

      {/* ENDEREÇO */}
      <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-10 text-center">

        <div className="text-7xl mb-6">
          📍
        </div>

        <h3 className="text-2xl font-bold mb-4">
          Endereço
        </h3>

        <p className="text-gray-600 leading-8">
          COMPAZ Governador Eduardo Campos
          <br />
          Av. Aníbal Benévolo, S/N
          <br />
          Linha do Tiro • Recife/PE
        </p>

      </div>

      {/* WHATSAPP */}
      <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-10 text-center">

        <div className="text-7xl mb-6">
          📞
        </div>

        <h3 className="text-2xl font-bold mb-4">
          WhatsApp
        </h3>

        <p className="text-2xl text-gray-700 mb-8">
          (81) 98803-4463
        </p>

        <a
          href="https://wa.me/5581988034463"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          💬
          Falar pelo WhatsApp
        </a>

      </div>

      {/* EMAIL */}
      <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-10 text-center">

        <div className="text-7xl mb-6">
          ✉️
        </div>

        <h3 className="text-2xl font-bold mb-4">
          E-mail
        </h3>

        <p className="text-gray-700 break-all mb-8">
          projeto.adhepe@gmail.com
        </p>

        <a
          href="mailto:projeto.adhepe@gmail.com"
          className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          ✉️
          Enviar E-mail
        </a>

      </div>

    </div>

  </div>

</section>

{/* ==================== CONTATO ==================== */}

<section
  id="contato"
  className="bg-gradient-to-b from-gray-50 to-white py-32"
>
  <div className="max-w-7xl mx-auto px-6">

    {/* TÍTULO */}

    <div className="text-center mb-20">

      <span className="uppercase tracking-[6px] text-orange-600 font-semibold">
        Contato
      </span>

      <h2 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
        Vamos Conversar?
      </h2>

      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-9">
        Tem interesse em conhecer nosso projeto, agendar uma apresentação,
        apoiar nossas ações ou transformar vidas através da música?
      </p>

    </div>

    {/* CARDS */}

    <div className="grid lg:grid-cols-3 gap-10">

      {/* ENDEREÇO */}

      <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 p-10 text-center border border-gray-100">

        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">

          <span className="text-5xl">
            📍
          </span>

        </div>

        <h3 className="text-2xl font-bold mb-5">
          Endereço
        </h3>

        <p className="text-gray-600 leading-8">

          COMPAZ Governador Eduardo Campos

          <br />

          Av. Aníbal Benévolo, S/N

          <br />

          Linha do Tiro

          <br />

          Recife • Pernambuco

        </p>

      </div>

      {/* WHATSAPP */}

      <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 p-10 text-center border border-gray-100">

        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">

          <span className="text-5xl">
            📞
          </span>

        </div>

        <h3 className="text-2xl font-bold mb-5">
          WhatsApp
        </h3>

        <p className="text-3xl font-semibold text-gray-800 mb-8">

          (81) 98803-4463

        </p>

        <a
          href="https://wa.me/5581988034463"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          💬
          Falar pelo WhatsApp
        </a>

      </div>

      {/* EMAIL */}

      <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 p-10 text-center border border-gray-100">

        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">

          <span className="text-5xl">
            ✉️
          </span>

        </div>

        <h3 className="text-2xl font-bold mb-5">
          E-mail
        </h3>

        <p className="text-lg text-gray-700 break-all mb-8">

          projeto.adhepe@gmail.com

        </p>

        <a
          href="mailto:projeto.adhepe@gmail.com"
          className="inline-flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          ✉️
          Enviar E-mail
        </a>

      </div>

    </div>

    {/* FRASE FINAL */}

    <div className="mt-20 text-center">

      <div className="inline-block bg-orange-50 border border-orange-200 rounded-3xl px-10 py-8 shadow-md">

        <p className="text-2xl font-semibold text-gray-800 mb-3">
          🎵 A música transforma vidas.
        </p>

        <p className="text-gray-600 text-lg max-w-3xl">
          Estamos sempre de portas abertas para receber novos alunos,
          voluntários, parceiros e apoiadores que desejam construir um futuro
          melhor através da arte.
        </p>

      </div>

    </div>

  </div>

</section>

</main>

  
  )

}