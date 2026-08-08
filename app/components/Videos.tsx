export default function Videos() {
  return (
    <section id="videos" className="bg-white py-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* CABEÇALHO */}
        <div className="text-center mb-16">

          <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">
            Veja o nosso trabalho
          </span>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-3 mb-6">
            Nossa Música em Ação
          </h2>

          <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Conheça um pouco do trabalho desenvolvido pelo Projeto Som do Alto
            através de apresentações, concertos, reportagens e ações que
            transformam vidas por meio da música.
          </p>

        </div>

        {/* VÍDEO PRINCIPAL */}
        <div className="max-w-5xl mx-auto mb-16">

          <div className="text-center mb-6">

            <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold">
              Destaque
            </span>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
              Reportagem da TV Globo
            </h3>

            <p className="text-gray-500 mt-2">
              O Projeto Som do Alto apresentado pela televisão pernambucana.
            </p>

          </div>

          <div className="aspect-video rounded-3xl overflow-hidden shadow-xl border border-gray-100">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* VÍDEO 1 */}
          <div className="group">

            <div className="aspect-video rounded-2xl overflow-hidden shadow-md border border-gray-100 group-hover:shadow-xl transition duration-300">

              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/TffprmNv44c"
                title="Ele é Jeová"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

            </div>

            <h4 className="text-lg font-bold text-gray-900 mt-4">
              Ele é Jeová
            </h4>

            <p className="text-gray-500 text-sm mt-1">
              Apresentação musical
            </p>

          </div>

          {/* VÍDEO 2 */}
          <div className="group">

            <div className="aspect-video rounded-2xl overflow-hidden shadow-md border border-gray-100 group-hover:shadow-xl transition duration-300">

              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/VBQCUBY1HQI"
                title="Concerto de Natal"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

            </div>

            <h4 className="text-lg font-bold text-gray-900 mt-4">
              Concerto de Natal
            </h4>

            <p className="text-gray-500 text-sm mt-1">
              Apresentação especial
            </p>

          </div>

          {/* VÍDEO 3 */}
          <div className="group">

            <div className="aspect-video rounded-2xl overflow-hidden shadow-md border border-gray-100 group-hover:shadow-xl transition duration-300">

              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/jfzAAe-RqWA"
                title="Apresentação Musical"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

            </div>

            <h4 className="text-lg font-bold text-gray-900 mt-4">
              Apresentação Musical
            </h4>

            <p className="text-gray-500 text-sm mt-1">
              Música e transformação social
            </p>

          </div>

        </div>

        {/* BOTÃO YOUTUBE */}
        <div className="text-center mt-16">

          <p className="text-gray-600 mb-5">
            Quer conhecer mais apresentações do Projeto Som do Alto?
          </p>

          <a
            href="https://www.youtube.com/@ProjetoSomdoAlto"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-orange-500 text-white hover:bg-orange-600 px-8 py-4 rounded-xl font-bold text-lg transition shadow-md hover:shadow-lg"
          >
            ▶ Conheça nosso Canal no YouTube
          </a>

        </div>

      </div>

    </section>
  );
}