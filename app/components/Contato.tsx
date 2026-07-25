export default function Contato() {
  return (

<section
  id="contato"
  className="bg-gradient-to-b from-gray-50 to-white py-32"
>
  <div className="max-w-7xl mx-auto px-6">

    {/* TÍTULO */}

    <div className="text-center mb-20">

      <span className="uppercase tracking-[6px] text-orange-600 font-semibold">
        Contato
      </span>

      <h2 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
        Vamos Conversar?
      </h2>

      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-9">
        Tem interesse em conhecer nosso projeto, agendar uma apresentação,
        apoiar nossas ações ou transformar vidas através da música?
      </p>

    </div>

    {/* CARDS */}

    <div className="grid lg:grid-cols-3 gap-10">

      {/* ENDEREÇO */}

      <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 p-10 text-center border border-gray-100">

        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">

          <span className="text-5xl">
            📍
          </span>

        </div>

        <h3 className="text-2xl font-bold mb-5">
          Endereço
        </h3>

        <p className="text-gray-600 leading-8">

          COMPAZ Governador Eduardo Campos

          <br />

          Av. Aníbal Benévolo, S/N

          <br />

          Linha do Tiro

          <br />

          Recife • Pernambuco

        </p>

      </div>

      {/* WHATSAPP */}

      <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 p-10 text-center border border-gray-100">

        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">

          <span className="text-5xl">
            📞
          </span>

        </div>

        <h3 className="text-2xl font-bold mb-5">
          WhatsApp
        </h3>

        <p className="text-3xl font-semibold text-gray-800 mb-8">

          (81) 98803-4463

        </p>

        <a
          href="https://wa.me/5581988034463"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          💬
          Falar pelo WhatsApp
        </a>

      </div>

      {/* EMAIL */}

      <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 p-10 text-center border border-gray-100">

        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">

          <span className="text-5xl">
            ✉️
          </span>

        </div>

        <h3 className="text-2xl font-bold mb-5">
          E-mail
        </h3>

        <p className="text-lg text-gray-700 break-all mb-8">

          projeto.adhepe@gmail.com

        </p>

        <a
          href="mailto:projeto.adhepe@gmail.com"
          className="inline-flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          ✉️
          Enviar E-mail
        </a>

      </div>

    </div>

    {/* FRASE FINAL */}

    <div className="mt-20 text-center">

      <div className="inline-block bg-orange-50 border border-orange-200 rounded-3xl px-10 py-8 shadow-md">

        <p className="text-2xl font-semibold text-gray-800 mb-3">
          🎵 A música transforma vidas.
        </p>

        <p className="text-gray-600 text-lg max-w-3xl">
          Estamos sempre de portas abertas para receber novos alunos,
          voluntários, parceiros e apoiadores que desejam construir um futuro
          melhor através da arte.
        </p>

      </div>

    </div>

  </div>

</section>
);
}