export default function Parceiros() {
  return (
    <section id="parceiros" className="bg-gray-50 py-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* CABEÇALHO */}
        <div className="text-center mb-16">

          <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">
            Juntos fazemos a diferença
          </span>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-3 mb-6">
            Parceiros e Apoiadores
          </h2>

          <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            O Projeto Som do Alto acredita que a transformação social acontece
            por meio da união entre pessoas, instituições e iniciativas
            comprometidas com o desenvolvimento humano através da música.
          </p>

        </div>

        {/* PARCEIROS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* COMPAZ */}
          <div className="group bg-white rounded-3xl border border-gray-100 p-8 text-center shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

            <div className="h-44 flex items-center justify-center mb-6">

              <img
                src="/images/parceiros/compaz.logo.png"
                alt="COMPAZ Eduardo Campos"
                className="max-h-28 max-w-full object-contain group-hover:scale-105 transition duration-300"
              />

            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              COMPAZ
            </h3>

            <div className="w-12 h-1 bg-orange-500 rounded-full mx-auto mb-5"></div>

            <p className="text-gray-600 leading-relaxed">
              Centro Comunitário da Paz Governador Eduardo Campos,
              espaço parceiro que acolhe nossas atividades e contribui
              para o desenvolvimento das ações socioculturais.
            </p>

          </div>

          {/* ADHEPE */}
          <div className="group bg-white rounded-3xl border border-gray-100 p-8 text-center shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

            <div className="h-44 flex items-center justify-center mb-6">

              <img
                src="/images/parceiros/Som.logo.png"
                alt="ADHEPE"
                className="max-h-44 max-w-full object-contain group-hover:scale-105 transition duration-300"
              />

            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ADHEPE
            </h3>

            <div className="w-12 h-1 bg-orange-500 rounded-full mx-auto mb-5"></div>

            <p className="text-gray-600 leading-relaxed">
              Associação responsável pela gestão e fortalecimento institucional
              do Projeto Som do Alto, ampliando o alcance das ações socioculturais.
            </p>

          </div>

          {/* SEJA UM APOIADOR */}
          <div className="group bg-orange-50 rounded-3xl border-2 border-orange-200 p-8 text-center shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-orange-400 transition-all duration-300">

            <div className="h-44 flex items-center justify-center mb-6">

              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-5xl shadow-sm group-hover:scale-110 transition duration-300">
                ❤️
              </div>

            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Seja um Apoiador
            </h3>

            <div className="w-12 h-1 bg-orange-500 rounded-full mx-auto mb-5"></div>

            <p className="text-gray-600 leading-relaxed mb-6">
              Sua empresa ou instituição também pode contribuir para a formação
              musical e cidadã de crianças e adolescentes da Zona Norte do Recife.
            </p>

            <a
              href="#contato"
              className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
            >
              Quero Apoiar
            </a>

          </div>

        </div>

        {/* MENSAGEM FINAL */}
        <div className="text-center mt-16">

          <p className="text-gray-500">
            Acreditamos que grandes transformações começam quando pessoas
            e instituições decidem caminhar juntas.
          </p>

        </div>

      </div>

    </section>
  );
}