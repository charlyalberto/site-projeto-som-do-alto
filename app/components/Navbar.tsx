"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  const links = [
    { nome: "Início", href: "#inicio" },
    { nome: "Quem Somos", href: "#sobre" },
    { nome: "Nossa História", href: "#historia" },
    { nome: "Cursos", href: "#cursos" },
    { nome: "Galeria", href: "#galeria" },
    { nome: "Vídeos", href: "#videos" },
    { nome: "Parceiros", href: "#parceiros" },
    { nome: "Contato", href: "#contato" },
  ];

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* =====================================================
              LOGO
          ====================================================== */}

          <a
            href="#inicio"
            onClick={fecharMenu}
            className="flex items-center"
          >
            <img
              src="/images/logo.png"
              alt="Projeto Som do Alto"
              className="w-[170px] h-auto"
            />
          </a>


          {/* =====================================================
              MENU DESKTOP
          ====================================================== */}

          <nav className="hidden lg:flex items-center gap-7">

            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 font-medium hover:text-orange-600 transition"
              >
                {link.nome}
              </a>
            ))}

            {/* APOIE */}

            <a
              href="#apoie"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-sm hover:shadow-md"
            >
              Apoie
            </a>

          </nav>


          {/* =====================================================
              BOTÃO MOBILE
          ====================================================== */}

          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="lg:hidden w-11 h-11 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 flex items-center justify-center transition"
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
          >
            {menuAberto ? (
              <span className="text-2xl">
                ×
              </span>
            ) : (
              <span className="text-2xl">
                ☰
              </span>
            )}
          </button>

        </div>


        {/* =======================================================
            MENU MOBILE
        ======================================================== */}

        {menuAberto && (

          <nav className="lg:hidden border-t border-gray-100 py-4">

            <div className="flex flex-col">

              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={fecharMenu}
                  className="px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-orange-50 hover:text-orange-600 transition"
                >
                  {link.nome}
                </a>
              ))}

              <a
                href="#apoie"
                onClick={fecharMenu}
                className="mt-2 text-center bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-bold transition"
              >
                ❤️ Apoie o Projeto
              </a>

            </div>

          </nav>

        )}

      </div>

    </header>
  );
}