export default function Cursos() {
  return (

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
);
}