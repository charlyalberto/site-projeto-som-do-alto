export default function Apoie() {
  return (

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
);
}