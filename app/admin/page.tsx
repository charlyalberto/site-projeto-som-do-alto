import LogoutButton from "./components/LogoutButton";
export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* CABEÇALHO */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/images/logo.png"
                alt="Projeto Som do Alto"
                className="w-[150px] h-auto"
              />

              <div className="hidden md:block border-l border-gray-200 pl-4">
                <p className="text-sm text-gray-500">
                  Área Administrativa
                </p>

                <h1 className="text-lg font-bold text-gray-900">
                  Painel de Gestão
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-5">
                <a
                    href="/"
                    className="text-sm font-medium text-gray-600 hover:text-orange-600 transition"
                >
                    ← Voltar ao site
                </a>

                <LogoutButton />
                </div>
          </div>
        </div>
      </header>

      {/* CONTEÚDO */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
            Administração
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-1">
            Bem-vindo ao painel
          </h2>

          <p className="text-gray-600 mt-2 max-w-2xl">
            Gerencie as principais informações do Projeto Som do Alto
            de forma simples e organizada.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* INSCRIÇÕES */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl mb-5">
              📝
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              Inscrições
            </h3>

            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Controle o período de inscrições e defina quando o
              formulário estará disponível.
            </p>

            <div className="mt-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Em breve
              </span>
            </div>
          </div>

          {/* GALERIA */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl mb-5">
              📸
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              Galeria
            </h3>

            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Adicione e organize fotos das atividades e apresentações
              do Projeto.
            </p>

            <div className="mt-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                Em desenvolvimento
              </span>
            </div>
          </div>

          {/* VÍDEOS */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl mb-5">
              🎥
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              Vídeos
            </h3>

            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Gerencie os vídeos e conteúdos audiovisuais apresentados
              no site.
            </p>

            <div className="mt-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                Em desenvolvimento
              </span>
            </div>
          </div>

          {/* CONFIGURAÇÕES */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl mb-5">
              ⚙️
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              Configurações
            </h3>

            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Configure informações e comportamentos gerais do site.
            </p>

            <div className="mt-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                Em desenvolvimento
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="border-t border-gray-200 bg-white mt-10">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <p className="text-center text-sm text-gray-500">
            Projeto Som do Alto · Área Administrativa
          </p>
        </div>
      </footer>
    </main>
  );
}