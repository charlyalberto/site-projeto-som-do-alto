export default function Videos() {
  return (

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
);
}