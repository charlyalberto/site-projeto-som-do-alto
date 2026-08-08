export default function Historia() {
  const historia = [
    {
      ano: "1990",
      titulo: "O Início",
      icone: "🎼",
      texto:
        "Maestro Josué Silva inicia oficinas gratuitas de música em sua residência no Alto Santa Terezinha.",
    },
    {
      ano: "2000",
      titulo: "Expansão",
      icone: "🎻",
      texto:
        "Ampliação das atividades com novos instrumentos e formação de jovens músicos na comunidade.",
    },
    {
      ano: "2014",
      titulo: "Fortalecimento",
      icone: "🤝",
      texto:
        "Fortalecimento institucional através da integração com a ADEJAPE e ampliação da estrutura do projeto.",
    },
    {
      ano: "2023",
      titulo: "Consolidação",
      icone: "🎶",
      texto:
        "Fortalecimento da marca Projeto Som do Alto, ampliação das atividades e retomada da identidade própria da iniciativa.",
    },
    {
      ano: "2026",
      titulo: "120+ Participantes",
      icone: "👨‍👩‍👧‍👦",
      texto:
        "Mais de 120 participantes atendidos gratuitamente, além de centenas de vidas transformadas pela música ao longo de mais de três décadas.",
    },
  ];

  return (
    <section id="historia" className="bg-gray-50 py-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* CABEÇALHO */}
        <div className="text-center mb-20">

          <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">
            Uma trajetória de transformação
          </span>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-3 mb-6">
            Nossa História
          </h2>

          <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Há mais de 30 anos transformando vidas através da música,
            promovendo inclusão, cidadania e oportunidades para crianças e
            adolescentes da Zona Norte do Recife.
          </p>

        </div>

        {/* LINHA DO TEMPO */}
        <div className="relative">

          {/* LINHA CENTRAL - DESKTOP */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-1 bg-orange-200"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

            {historia.map((item, index) => (
              <div
                key={item.ano}
                className="relative flex flex-col items-center text-center"
              >

                {/* PONTO DA TIMELINE */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-orange-500 border-8 border-gray-50 flex items-center justify-center text-3xl shadow-lg mb-6">
                  {item.icone}
                </div>

                {/* CARD */}
                <div className="w-full bg-white rounded-3xl shadow-md p-7 border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {item.ano}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.titulo}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.texto}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* FRASE FINAL */}
        <div className="mt-20 text-center">

          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 px-8 py-10">

            <div className="text-4xl mb-4">
              🎵
            </div>

            <p className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
              “A música transforma, aproxima pessoas e abre caminhos para
              um futuro melhor.”
            </p>

            <div className="w-16 h-1 bg-orange-500 mx-auto mt-6 rounded-full"></div>

          </div>

        </div>

      </div>

    </section>
  );
}