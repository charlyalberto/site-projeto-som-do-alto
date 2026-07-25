export default function Parceiros() {
  return (

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
  );
}