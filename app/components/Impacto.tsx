export default function Impacto() {
  return (
      <section className="bg-gray-100 py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center mb-6">
            Nosso Impacto
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white p-8 rounded-2xl text-center shadow hover:shadow-xl transition duration-300">
              <h3 className="text-6xl font-bold text-orange-600">350+</h3>
              <p>Alunos Atendidos</p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center shadow hover:shadow-xl transition duration-300">
              <h3 className="text-6xl font-bold text-orange-600">30+</h3>
              <p>Anos de História</p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center shadow hover:shadow-xl transition duration-300">
              <h3 className="text-6xl font-bold text-orange-600">10+</h3>
              <p>Voluntários</p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center shadow hover:shadow-xl transition duration-300">
              <h3 className="text-6xl font-bold text-orange-600">8+</h3>
              <p>Comunidades Atendidas</p>
            </div>

          </div>

        </div>

      </section>
  );
}