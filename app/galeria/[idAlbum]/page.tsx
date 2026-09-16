"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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

type Foto = {
  idFoto: string;
  idAlbum: string;
  dataCadastro?: string;
  nomeArquivo?: string;
  mimeType?: string;
  fileId?: string;
  url?: string;
  urlImagem?: string;
  capa?: number;
};

export default function AlbumPage() {
  const params = useParams();

  const idAlbum = Array.isArray(params?.idAlbum)
    ? params.idAlbum[0]
    : params?.idAlbum;

  const [album, setAlbum] = useState<Album | null>(null);
  const [fotos, setFotos] = useState<Foto[]>([]);

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [fotoAberta, setFotoAberta] = useState<number | null>(null);

  useEffect(() => {
    if (!idAlbum) return;

    async function carregarAlbum() {
      try {
        setCarregando(true);
        setErro("");

        /*
         * =====================================================
         * CARREGAR ÁLBUM
         * =====================================================
         */

        const respostaAlbuns = await fetch("/api/galeria", {
          method: "GET",
          cache: "no-store",
        });

        const resultadoAlbuns = await respostaAlbuns.json();

        if (
          !respostaAlbuns.ok ||
          !resultadoAlbuns.sucesso
        ) {
          throw new Error(
            resultadoAlbuns.mensagem ||
              "Não foi possível carregar o álbum."
          );
        }

        const albumEncontrado = (
          resultadoAlbuns.albuns || []
        ).find(
          (item: Album) =>
            String(item.idAlbum) === String(idAlbum)
        );

        if (!albumEncontrado) {
          throw new Error(
            "Álbum não encontrado ou não está publicado."
          );
        }

        setAlbum(albumEncontrado);

        /*
         * =====================================================
         * CARREGAR FOTOS
         * =====================================================
         */

        const respostaFotos = await fetch(
          `/api/galeria/fotos?idAlbum=${encodeURIComponent(
            String(idAlbum)
          )}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const resultadoFotos = await respostaFotos.json();

        if (
          !respostaFotos.ok ||
          !resultadoFotos.sucesso
        ) {
          throw new Error(
            resultadoFotos.mensagem ||
              "Não foi possível carregar as fotos."
          );
        }

        setFotos(resultadoFotos.fotos || []);
      } catch (error) {
        console.error(
          "Erro ao carregar álbum:",
          error
        );

        setErro(
          error instanceof Error
            ? error.message
            : "Não foi possível carregar o álbum."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarAlbum();
  }, [idAlbum]);

  /*
   * =========================================================
   * FORMATAR DATA
   * =========================================================
   */

  function formatarData(data?: string) {
    if (!data) return "";

    const partes = data.split("-");

    if (partes.length !== 3) {
      return data;
    }

    const [ano, mes, dia] = partes;

    return `${dia}/${mes}/${ano}`;
  }

  /*
   * =========================================================
   * ABRIR FOTO
   * =========================================================
   */

  function abrirFoto(index: number) {
    setFotoAberta(index);
  }

  /*
   * =========================================================
   * FECHAR FOTO
   * =========================================================
   */

  function fecharFoto() {
    setFotoAberta(null);
  }

  /*
   * =========================================================
   * FOTO ANTERIOR
   * =========================================================
   */

  function fotoAnterior() {
    if (fotoAberta === null || fotos.length === 0) {
      return;
    }

    setFotoAberta(
      fotoAberta === 0
        ? fotos.length - 1
        : fotoAberta - 1
    );
  }

  /*
   * =========================================================
   * PRÓXIMA FOTO
   * =========================================================
   */

  function proximaFoto() {
    if (fotoAberta === null || fotos.length === 0) {
      return;
    }

    setFotoAberta(
      fotoAberta === fotos.length - 1
        ? 0
        : fotoAberta + 1
    );
  }

  /*
   * =========================================================
   * TECLADO
   * =========================================================
   */

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (fotoAberta === null) {
        return;
      }

      if (event.key === "Escape") {
        fecharFoto();
      }

      if (event.key === "ArrowLeft") {
        fotoAnterior();
      }

      if (event.key === "ArrowRight") {
        proximaFoto();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [fotoAberta, fotos.length]);

  /*
   * =========================================================
   * CARREGANDO
   * =========================================================
   */

  if (carregando) {
    return (
      <main className="min-h-screen bg-white">

        <Navbar />

        <section className="pt-28 pb-20 bg-slate-50">

          <div className="flex justify-center py-24">

            <div className="text-center">

              <div className="w-10 h-10 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin mx-auto" />

              <p className="mt-5 text-slate-500">
                Carregando álbum...
              </p>

            </div>

          </div>

        </section>

        <Footer />

      </main>
    );
  }

  /*
   * =========================================================
   * ERRO
   * =========================================================
   */

  if (erro || !album) {
    return (
      <main className="min-h-screen bg-white">

        <Navbar />

        <section className="pt-28 pb-20 bg-slate-50">

          <div className="max-w-2xl mx-auto px-6 text-center">

            <div className="bg-white border border-red-200 rounded-2xl p-10 shadow-sm">

              <div className="text-4xl mb-5">
                ⚠️
              </div>

              <h1 className="text-2xl font-bold text-slate-900">
                Álbum não encontrado
              </h1>

              <p className="mt-4 text-slate-600">
                {erro ||
                  "Não foi possível localizar este álbum."}
              </p>

              <a
                href="/galeria"
                className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600 transition"
              >
                ← Voltar para a galeria
              </a>

            </div>

          </div>

        </section>

        <Footer />

      </main>
    );
  }

  /*
   * =========================================================
   * PÁGINA DO ÁLBUM
   * =========================================================
   */

  return (
    <main className="min-h-screen bg-white">

      <Navbar />

      {/* =====================================================
          CABEÇALHO
      ===================================================== */}

      <section className="pt-12 pb-12 bg-white">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <p className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500 mb-3">
            Galeria
          </p>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900">
            {album.titulo}
          </h1>

          <div className="mt-5 flex justify-center items-center gap-2 text-slate-500">

            {album.dataEvento && (
              <span>
                {formatarData(album.dataEvento)}
              </span>
            )}

            {album.dataEvento && album.local && (
              <span>•</span>
            )}

            {album.local && (
              <span>
                {album.local}
              </span>
            )}

          </div>

          {album.descricao && (
            <p className="mt-5 max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
              {album.descricao}
            </p>
          )}

          <div className="mt-5 text-sm font-semibold text-slate-500">
            {fotos.length}{" "}
            {fotos.length === 1
              ? "foto"
              : "fotos"}
          </div>

        </div>

      </section>


      {/* =====================================================
          FOTOS
      ===================================================== */}

      <section className="py-12 md:py-16 bg-slate-50">

        <div className="max-w-7xl mx-auto px-6">

          {fotos.length === 0 ? (

            <div className="text-center py-16">

              <div className="text-5xl mb-5">
                📷
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                Nenhuma foto encontrada
              </h2>

              <p className="mt-3 text-slate-500">
                Este álbum ainda não possui fotografias.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

              {fotos.map((foto, index) => (

                <button
                  key={foto.idFoto}
                  type="button"
                  onClick={() => abrirFoto(index)}
                  className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300"
                  aria-label={`Abrir foto ${
                    index + 1
                  } de ${fotos.length}`}
                >

                  {foto.urlImagem ? (

                    <img
                      src={foto.urlImagem}
                      alt={
                        foto.nomeArquivo ||
                        `${album.titulo} - foto ${
                          index + 1
                        }`
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                  ) : (

                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      Imagem indisponível
                    </div>

                  )}

                  {/* Sobreposição */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />

                  {/* Número */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/90 text-slate-800 text-xs font-bold shadow">
                    {index + 1}
                  </div>

                </button>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          NAVEGAÇÃO
      ===================================================== */}

      <section className="py-12 bg-white">

        <div className="flex justify-center px-6">

          <a
            href="/galeria"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-orange-500 text-orange-600 font-bold hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            ← Voltar para a galeria
          </a>

        </div>

      </section>


      {/* =====================================================
          LIGHTBOX
      ===================================================== */}

      {fotoAberta !== null &&
        fotos[fotoAberta] && (

          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
            onClick={fecharFoto}
          >

            {/* Fechar */}
            <button
              type="button"
              onClick={fecharFoto}
              className="absolute top-4 right-5 md:top-6 md:right-8 z-20 w-12 h-12 rounded-full bg-white/10 text-white text-4xl leading-none hover:bg-white/20 transition"
              aria-label="Fechar imagem"
            >
              ×
            </button>


            {/* Anterior */}
            {fotos.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  fotoAnterior();
                }}
                className="absolute left-3 md:left-8 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 text-white text-4xl hover:bg-white/20 transition"
                aria-label="Foto anterior"
              >
                ‹
              </button>
            )}


            {/* Imagem */}
            <div
              className="relative max-w-6xl w-full flex flex-col items-center"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <img
                src={
                  fotos[fotoAberta].urlImagem ||
                  ""
                }
                alt={
                  fotos[fotoAberta].nomeArquivo ||
                  `Foto ${fotoAberta + 1}`
                }
                className="max-w-full max-h-[78vh] object-contain rounded-xl shadow-2xl"
              />

              <div className="mt-5 text-center">

                <p className="text-white font-semibold">
                  {fotoAberta + 1} de{" "}
                  {fotos.length}
                </p>

                {fotos[fotoAberta].nomeArquivo && (
                  <p className="mt-1 text-sm text-slate-300">
                    {fotos[fotoAberta].nomeArquivo}
                  </p>
                )}

              </div>

            </div>


            {/* Próxima */}
            {fotos.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  proximaFoto();
                }}
                className="absolute right-3 md:right-8 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 text-white text-4xl hover:bg-white/20 transition"
                aria-label="Próxima foto"
              >
                ›
              </button>
            )}

          </div>
        )}

      <Footer />

    </main>
  );
}