export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">

      {/* =========================================================
          CONTEÚDO PRINCIPAL
      ========================================================== */}

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* =====================================================
              PROJETO
          ====================================================== */}

          <div>

            <div className="mb-6">
              <img
                src="/images/logo.png"
                alt="Projeto Som do Alto"
                className="w-[220px] h-auto"
              />
            </div>

            <p className="text-gray-300 leading-relaxed max-w-sm">
              Transformando vidas através da música, promovendo formação
              musical, inclusão, cidadania e oportunidades para crianças
              e adolescentes da Zona Norte do Recife.
            </p>

          </div>


          {/* =====================================================
              NAVEGAÇÃO
          ====================================================== */}

          <div>

            <h3 className="text-lg font-bold mb-6">
              Navegação
            </h3>

            <ul className="space-y-3">

              <li>
                <a
                  href="#sobre"
                  className="text-gray-300 hover:text-orange-500 transition"
                >
                  Quem Somos
                </a>
              </li>

              <li>
                <a
                  href="#historia"
                  className="text-gray-300 hover:text-orange-500 transition"
                >
                  Nossa História
                </a>
              </li>

              <li>
                <a
                  href="#cursos"
                  className="text-gray-300 hover:text-orange-500 transition"
                >
                  Cursos
                </a>
              </li>

              <li>
                <a
                  href="#videos"
                  className="text-gray-300 hover:text-orange-500 transition"
                >
                  Nossa Música
                </a>
              </li>

              <li>
                <a
                  href="#parceiros"
                  className="text-gray-300 hover:text-orange-500 transition"
                >
                  Parceiros
                </a>
              </li>

              <li>
                <a
                  href="#apoie"
                  className="text-gray-300 hover:text-orange-500 transition"
                >
                  Apoie o Projeto
                </a>
              </li>

              <li>
                <a
                  href="#contato"
                  className="text-gray-300 hover:text-orange-500 transition"
                >
                  Contato
                </a>
              </li>

            </ul>

          </div>


          {/* =====================================================
              CONECTE-SE
          ====================================================== */}

          <div>

            <h3 className="text-lg font-bold mb-6">
              Conecte-se
            </h3>

            <p className="text-gray-300 mb-5">
              Acompanhe nosso trabalho e fique por dentro das
              nossas atividades.
            </p>


            {/* INSTAGRAM */}

            <a
              href="https://www.instagram.com/projetosomdoalto"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-orange-500 transition mb-4"
            >
              <span className="text-xl">
                📷
              </span>

              <span>
                @projetosomdoalto
              </span>
            </a>


            {/* YOUTUBE */}

            <a
              href="https://www.youtube.com/@ProjetoSomdoAlto"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-orange-500 transition mb-4"
            >
              <span className="text-xl">
                ▶️
              </span>

              <span>
                Projeto Som do Alto
              </span>
            </a>


            {/* WHATSAPP */}

            <a
              href="https://wa.me/5581988034463"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition"
            >
              <span className="text-xl">
                💬
              </span>

              <span>
                WhatsApp
              </span>
            </a>

          </div>


          {/* =====================================================
              CONTATO
          ====================================================== */}

          <div>

            <h3 className="text-lg font-bold mb-6">
              Contato
            </h3>

            <div className="space-y-4 text-gray-300">

              {/* E-MAIL */}

              <div className="flex gap-3">

                <span className="text-orange-500">
                  ✉
                </span>

                <a
                  href="mailto:projeto.adhepe@gmail.com"
                  className="hover:text-orange-500 transition break-all"
                >
                  projeto.adhepe@gmail.com
                </a>

              </div>


              {/* ENDEREÇO */}

              <div className="flex gap-3">

                <span className="text-orange-500">
                  📍
                </span>

                <p>
                  COMPAZ Governador Eduardo Campos
                  <br />
                  Av. Aníbal Benévolo, S/N
                  <br />
                  Linha do Tiro
                  <br />
                  Recife – PE
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =========================================================
          LINHA
      ========================================================== */}

      <div className="border-t border-gray-700"></div>


      {/* =========================================================
          RODAPÉ INFERIOR
      ========================================================== */}

      <div className="max-w-7xl mx-auto px-6 py-6">

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">

          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Projeto Som do Alto.
            Todos os direitos reservados.
          </p>

          <p className="text-center">
            Realização:
            <span className="text-white font-semibold ml-1">
              ADHEPE
            </span>
          </p>

          <p className="text-center md:text-right">
            CNPJ: 50.972.946/0001-98
          </p>

        </div>

      </div>


      {/* =========================================================
          FRASE FINAL
      ========================================================== */}

      <div className="bg-[#0b1220] py-4">

        <p className="text-center text-sm text-gray-400">
          Música que transforma. Vidas que inspiram.
        </p>

      </div>

    </footer>
  );
}