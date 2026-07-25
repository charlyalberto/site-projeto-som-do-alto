export default function Galeria() {
  return (

<section className="bg-white py-24">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-5xl font-bold text-center mb-6">
      Nossa Música em Ação
    </h2>

    <p className="text-center text-gray-600 text-lg max-w-4xl mx-auto mb-16">
      Mais do que ensinar música, buscamos formar cidadãos,
      desenvolver talentos e criar oportunidades para crianças
      e adolescentes da Zona Norte do Recife.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="md:col-span-2 overflow-hidden rounded-2xl shadow-lg">
        <img
          src="/images/galeria/orquestra1.jpg"
          alt="Orquestra"
          className="w-full h-[450px] object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src="/images/galeria/violino2.jpg"
          alt="Violinos"
          className="w-full h-[450px] object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src="/images/galeria/flauta2.png"
          alt="Flautas"
          className="w-full h-[320px] object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src="/images/galeria/maestro1.jpeg"
          alt="Maestro"
          className="w-full h-[320px] object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src="/images/galeria/coral1.jpg"
          alt="Coral"
          className="w-full h-[320px] object-cover hover:scale-105 transition duration-500"
        />
      </div>

    </div>

  </div>
</section>

);
}