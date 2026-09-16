"use client";

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Album = {
  idAlbum: string;
  titulo: string;
  descricao?: string;
  dataEvento?: string;
  local?: string;
  capaUrl?: string;
  status?: string;
  dataCadastro?: string;
  quantidadeFotos?: number;
};

export default function GaleriaPage() {
  const [albuns, setAlbuns] = useState<Album[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarAlbuns() {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await fetch("/api/galeria", {
          method: "GET",
          cache: "no-store",
        });

        const resultado = await resposta.json();

        if (!resposta.ok || !resultado.sucesso) {
          throw new Error(
            resultado.mensagem ||
              "Não foi possível carregar a galeria."
          );
        }

        setAlbuns(resultado.albuns || []);
      } catch (error) {
        console.error("Erro ao carregar galeria:", error);

        setErro(
          error instanceof Error
            ? error.message
            : "Não foi possível carregar a galeria."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarAlbuns();
  }, []);

  function formatarData(data?: string) {
    if (!data) return "";

    const partes = data.split("-");

    if (partes.length !== 3) {
      return data;
    }

    const [ano, mes, dia] = partes;

    return `${dia}/${mes}/${ano}`;
  }

return (
  <main className="min-h-screen bg-white">

    <Navbar />

    

    {/* =====================================================
        ÁLBUNS
    ===================================================== */}
    <section className="pt-24 pb-16 md:pt-28 md:pb-20 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* Título da seção */}
        <div className="text-center mb-12">

          <p className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500 mb-3">
            Galeria
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Momentos que fazem nossa história
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-600 text-lg">
            Confira os registros das nossas apresentações,
            atividades e momentos especiais vividos pelos
            nossos alunos e professores.
          </p>

        </div>


        {/* =================================================
            CARREGANDO
        ================================================= */}
        {carregando && (
          <div className="flex justify-center py-20">

            <div className="text-center">

              <div className="w-10 h-10 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin mx-auto" />

              <p className="mt-5 text-slate-500">
                Carregando álbuns...
              </p>

            </div>

          </div>
        )}


        {/* =================================================
            ERRO
        ================================================= */}
        {!carregando && erro && (
          <div className="max-w-2xl mx-auto py-12 text-center">

            <div className="rounded-2xl border border-red-200 bg-red-50 p-8">

              <div className="text-4xl mb-4">
                ⚠️
              </div>

              <h3 className="text-xl font-bold text-red-800">
                Não foi possível carregar a galeria
              </h3>

              <p className="mt-3 text-red-600">
                {erro}
              </p>

            </div>

          </div>
        )}


        {/* =================================================
            NENHUM ÁLBUM
        ================================================= */}
        {!carregando &&
          !erro &&
          albuns.length === 0 && (
            <div className="py-16 text-center">

              <div className="text-5xl mb-5">
                📷
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                Nenhum álbum publicado ainda
              </h3>

              <p className="mt-3 text-slate-500">
                Em breve teremos novos registros por aqui.
              </p>

            </div>
          )}


        {/* =================================================
            ÁLBUNS
        ================================================= */}
        {!carregando &&
          !erro &&
          albuns.length > 0 && (

            <div
              className={`
                grid gap-8
                ${
                  albuns.length === 1
                    ? "max-w-md mx-auto"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }
              `}
            >

              {albuns.map((album) => (

                <article
                  key={album.idAlbum}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
                >

                  {/* ===============================
                      FOTO DE CAPA
                  =============================== */}
                  <div className="relative h-72 overflow-hidden bg-slate-100">

                    {album.capaUrl ? (
                      <img
                        src={album.capaUrl}
                        alt={album.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-slate-400">
                          Sem imagem de capa
                        </span>
                      </div>
                    )}

                    {/* Quantidade de fotos */}
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-white/95 text-slate-800 text-sm font-bold shadow">
                      📷 {album.quantidadeFotos || 0}{" "}
                      {album.quantidadeFotos === 1
                        ? "foto"
                        : "fotos"}
                    </div>

                  </div>


                  {/* ===============================
                      INFORMAÇÕES
                  =============================== */}
                  <div className="p-6">

                    <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-orange-500 transition-colors">
                      {album.titulo}
                    </h3>


                    {/* Data */}
                    {album.dataEvento && (
                      <div className="flex items-center gap-2 mt-4 text-slate-600">
                        <span className="text-orange-500">
                          📅
                        </span>

                        <span>
                          {formatarData(album.dataEvento)}
                        </span>
                      </div>
                    )}


                    {/* Local */}
                    {album.local && (
                      <div className="flex items-start gap-2 mt-2 text-slate-600">
                        <span className="text-orange-500">
                          📍
                        </span>

                        <span>
                          {album.local}
                        </span>
                      </div>
                    )}


                    {/* Descrição */}
                    {album.descricao && (
                      <p className="mt-5 text-slate-500 leading-relaxed line-clamp-3">
                        {album.descricao}
                      </p>
                    )}


                    {/* Botão */}
                    <a
                      href={`/galeria/${encodeURIComponent(
                        album.idAlbum
                      )}`}
                      className="inline-flex items-center justify-center gap-2 mt-6 px-6 py-3 rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600 transition-all duration-300 shadow-sm"
                    >
                      Ver álbum
                      <span className="text-lg">
                        →
                      </span>
                    </a>

                  </div>

                </article>

              ))}

            </div>
          )}


        {/* =================================================
            VOLTAR
        ================================================= */}
        <div className="flex justify-center mt-16">

          <a
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-orange-500 text-orange-600 font-bold hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            <span className="text-lg">
              ←
            </span>

            Voltar ao início
          </a>

        </div>

      </div>

    </section>


    <Footer />

  </main>
)
  ;
  }