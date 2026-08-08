export default function QuemSomos() {
  return (
    <section 
    id="sobre"
    className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* TÍTULO */}
        <div className="text-center mb-14">
          <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">
            Nossa essência
          </span>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-3 mb-6">
            Quem Somos
          </h2>

          <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Há mais de três décadas, o{" "}
            <strong className="text-gray-800">
              Maestro Josué Silva
            </strong>{" "}
            utiliza a música como ferramenta de transformação social para
            crianças e adolescentes das comunidades da Zona Norte do Recife.
          </p>

          <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto mt-4 leading-relaxed">
            O Projeto Som do Alto nasceu desse propósito e atualmente atende
            cerca de{" "}
            <strong className="text-orange-600">
              120 crianças e adolescentes
            </strong>
            , oferecendo formação musical gratuita, inclusão social e
            desenvolvimento humano.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">

          {/* FORMAÇÃO MUSICAL */}
          <div className="group bg-gray-50 rounded-3xl p-8 text-center border border-gray-100 hover:bg-white hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl group-hover:scale-110 transition duration-300">
              🎵
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Formação Musical
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Oferecemos formação musical gratuita, proporcionando aos alunos
              contato com diferentes instrumentos, canto, teoria musical e
              prática em conjunto.
            </p>

          </div>

          {/* INCLUSÃO */}
          <div className="group bg-gray-50 rounded-3xl p-8 text-center border border-gray-100 hover:bg-white hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl group-hover:scale-110 transition duration-300">
              ❤️
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Inclusão e Cidadania
            </h3>

            <p className="text-gray-600 leading-relaxed">
              A música é utilizada como instrumento de inclusão, convivência,
              disciplina e desenvolvimento de valores para crianças e
              adolescentes.
            </p>

          </div>

          {/* TRANSFORMAÇÃO */}
          <div className="group bg-gray-50 rounded-3xl p-8 text-center border border-gray-100 hover:bg-white hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl group-hover:scale-110 transition duration-300">
              🌱
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Transformação Social
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Criamos oportunidades para que crianças e jovens desenvolvam
              talentos, descubram novas possibilidades e construam um futuro
              com mais oportunidades.
            </p>

          </div>

        </div>

        {/* NÚMEROS DE IMPACTO */}
<div className="mt-4">

  <div className="grid grid-cols-2 md:grid-cols-4 border-t border-gray-200 pt-10">

    {/* 120+ */}
    <div className="text-center px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200">
      <div className="text-4xl md:text-5xl font-bold text-orange-500">
        120+
      </div>

      <p className="text-gray-600 mt-2 text-sm md:text-base">
        crianças e adolescentes
      </p>
    </div>

    {/* 30+ */}
    <div className="text-center px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200">
      <div className="text-4xl md:text-5xl font-bold text-orange-500">
        30+
      </div>

      <p className="text-gray-600 mt-2 text-sm md:text-base">
        anos de história
      </p>
    </div>

    {/* 8 */}
    <div className="text-center px-6 py-4">
      <div className="text-4xl md:text-5xl font-bold text-orange-500">
        8
      </div>

      <p className="text-gray-600 mt-2 text-sm md:text-base">
        comunidades alcançadas
      </p>
    </div>

    {/* 4+ */}
    <div className="text-center px-6 py-4 md:border-l border-gray-200">
      <div className="text-4xl md:text-5xl font-bold text-orange-500">
        4+
      </div>

      <p className="text-gray-600 mt-2 text-sm md:text-base">
        apresentações por ano
      </p>
    </div>

  </div>

</div>

      </div>
    </section>
  );
}