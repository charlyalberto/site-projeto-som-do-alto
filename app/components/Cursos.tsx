export default function Cursos() {
  const formacao = [
    {
      icone: "🎤",
      nome: "Canto Coral",
      descricao:
        "Desenvolvimento vocal, expressão artística e integração em grupo através da prática coral.",
    },
    {
      icone: "📖",
      nome: "Teoria Musical",
      descricao:
        "Leitura musical, percepção auditiva e fundamentos necessários para o desenvolvimento musical.",
    },
  ];

  const madeiras = [
    {
      icone: "🎼",
      nome: "Flauta Doce",
      descricao:
        "Iniciação musical e desenvolvimento das primeiras habilidades instrumentais.",
    },
    {
      icone: "🎼",
      nome: "Flauta Transversal",
      descricao:
        "Formação técnica e artística voltada para a prática instrumental e repertório orquestral.",
    },
    {
      icone: "🎶",
      nome: "Clarinete",
      descricao:
        "Desenvolvimento da técnica instrumental, sonoridade e participação em conjuntos musicais.",
    },
  ];

  const cordas = [
    {
      icone: "🎻",
      nome: "Violino",
      descricao:
        "Técnica instrumental, leitura musical e prática em conjunto.",
    },
    {
      icone: "🎻",
      nome: "Viola",
      descricao:
        "Formação musical voltada para repertório orquestral e música de câmara.",
    },
    {
      icone: "🎻",
      nome: "Violoncelo",
      descricao:
        "Desenvolvimento técnico e interpretação musical para prática orquestral.",
    },
  ];

  const metais = [
    {
      icone: "🎺",
      nome: "Trompete",
      descricao:
        "Formação instrumental e execução de repertórios variados.",
    },
    {
      icone: "🎺",
      nome: "Trombone",
      descricao:
        "Aprendizado técnico e participação em grupos instrumentais.",
    },
    {
      icone: "🎺",
      nome: "Bombardino",
      descricao:
        "Desenvolvimento musical voltado para bandas e orquestras.",
    },
  ];

  const CardCurso = ({
    icone,
    nome,
    descricao,
  }: {
    icone: string;
    nome: string;
    descricao: string;
  }) => (
    <div className="group bg-white rounded-3xl border border-gray-100 p-8 text-center shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

      {/* ÍCONE */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl group-hover:scale-110 transition duration-300">
        {icone}
      </div>

      {/* NOME */}
      <h4 className="text-2xl font-bold text-gray-900 mb-4">
        {nome}
      </h4>

      {/* DESCRIÇÃO */}
      <p className="text-gray-600 leading-relaxed">
        {descricao}
      </p>

    </div>
  );

  const Categoria = ({
    titulo,
    subtitulo,
    cursos,
  }: {
    titulo: string;
    subtitulo: string;
    cursos: {
      icone: string;
      nome: string;
      descricao: string;
    }[];
  }) => (
    <div className="mb-20">

      {/* CABEÇALHO DA CATEGORIA */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">

        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
            {titulo}
          </h3>

          <div className="w-14 h-1 bg-orange-500 rounded-full mt-3"></div>
        </div>

        <p className="text-gray-500 md:text-right">
          {subtitulo}
        </p>

      </div>

      {/* CURSOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursos.map((curso) => (
          <CardCurso
            key={curso.nome}
            icone={curso.icone}
            nome={curso.nome}
            descricao={curso.descricao}
          />
        ))}
      </div>

    </div>
  );

  return (
    <section id="cursos" className="bg-gray-50 py-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* CABEÇALHO */}
        <div className="text-center mb-20">

          <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">
            Aprender, praticar e transformar
          </span>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-3 mb-6">
            Cursos Oferecidos
          </h2>

          <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            O Projeto Som do Alto oferece formação musical gratuita,
            proporcionando aprendizado técnico, desenvolvimento humano
            e experiências coletivas através da música.
          </p>

        </div>

        {/* DESTAQUE */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10 mb-20">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            <div>
              <div className="text-4xl font-bold text-orange-500">
                11
              </div>

              <p className="text-gray-600 mt-2">
                modalidades
              </p>
            </div>

            <div>
              <div className="text-4xl font-bold text-orange-500">
                4
              </div>

              <p className="text-gray-600 mt-2">
                áreas de formação
              </p>
            </div>

            <div>
              <div className="text-4xl font-bold text-orange-500">
                100%
              </div>

              <p className="text-gray-600 mt-2">
                formação gratuita
              </p>
            </div>

            <div>
              <div className="text-4xl font-bold text-orange-500">
                🎵
              </div>

              <p className="text-gray-600 mt-2">
                música e cidadania
              </p>
            </div>

          </div>

        </div>

        {/* FORMAÇÃO MUSICAL */}
        <Categoria
          titulo="🎤 Formação Musical"
          subtitulo="Fundamentos para o desenvolvimento musical"
          cursos={formacao}
        />

        {/* MADEIRAS */}
        <Categoria
          titulo="🎼 Madeiras"
          subtitulo="Instrumentos de sopro em madeira"
          cursos={madeiras}
        />

        {/* CORDAS */}
        <Categoria
          titulo="🎻 Cordas"
          subtitulo="Prática instrumental e repertório orquestral"
          cursos={cordas}
        />

        {/* METAIS */}
        <Categoria
          titulo="🎺 Metais"
          subtitulo="Instrumentos de sopro e prática coletiva"
          cursos={metais}
        />

        {/* FRASE FINAL */}
        <div className="text-center mt-8">

          <div className="max-w-3xl mx-auto">

            <div className="text-4xl mb-5">
              🎶
            </div>

            <p className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
              A música é o caminho para desenvolver talentos,
              fortalecer vínculos e transformar vidas.
            </p>

            <div className="w-16 h-1 bg-orange-500 mx-auto mt-6 rounded-full"></div>

          </div>

        </div>

      </div>

    </section>
  );
}