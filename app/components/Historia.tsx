export default function Historia() {
  return (

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
  );
}