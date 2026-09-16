"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";


// =====================================================
// TIPAGEM
// =====================================================

type Album = {
  idAlbum: string;
  titulo: string;
  descricao: string;
  dataEvento: string;
  local: string;
  capaUrl: string;
  status: string;
  dataCadastro: string;
  quantidadeFotos: number;
};


type FotoSelecionada = {
  arquivo: File;
  preview: string;
};


type FotoCadastrada = {
  idFoto: string;
  idAlbum: string;
  dataCadastro: string;
  nomeArquivo: string;
  mimeType: string;
  fileId: string;
  url: string;
  urlImagem: string;
  capa: number;
};


// =====================================================
// PÁGINA
// =====================================================

export default function GaleriaPage() {

  const router = useRouter();

  // ===================================================
  // FORMULÁRIO DO ÁLBUM
  // ===================================================

  const [titulo, setTitulo] =
    useState("");

  const [descricao, setDescricao] =
    useState("");

  const [dataEvento, setDataEvento] =
    useState("");

  const [local, setLocal] =
    useState("");

  const [status, setStatus] =
    useState("PUBLICADO");


  // ===================================================
  // MODO DE EDIÇÃO DO ÁLBUM
  // ===================================================

  const [modoEdicao, setModoEdicao] =
    useState(false);

  const [idAlbumEmEdicao, setIdAlbumEmEdicao] =
    useState<string | null>(null);


  // ===================================================
  // ÁLBUNS
  // ===================================================

  const [albuns, setAlbuns] =
    useState<Album[]>([]);

  const [carregandoAlbuns, setCarregandoAlbuns] =
    useState(true);


  // ===================================================
  // ESTADOS DO ÁLBUM
  // ===================================================

  const [salvando, setSalvando] =
    useState(false);

  const [mensagem, setMensagem] =
    useState("");

  const [erro, setErro] =
    useState("");

  const [excluindoAlbum, setExcluindoAlbum] =
    useState<string | null>(null);


  // ===================================================
  // ESTADOS DAS FOTOS
  // ===================================================

  const [albumSelecionado, setAlbumSelecionado] =
    useState<Album | null>(null);

  const [fotosSelecionadas, setFotosSelecionadas] =
    useState<FotoSelecionada[]>([]);

  const [fotosCadastradas, setFotosCadastradas] =
    useState<FotoCadastrada[]>([]);

  const [carregandoFotos, setCarregandoFotos] =
    useState(false);

  const [excluindoFoto, setExcluindoFoto] =
    useState<string | null>(null);

  const [enviandoFotos, setEnviandoFotos] =
    useState(false);

  const [mensagemFotos, setMensagemFotos] =
    useState("");

  const [erroFotos, setErroFotos] =
    useState("");

  const [definindoCapa, setDefinindoCapa] =
    useState<string | null>(null);


  // ===================================================
  // CARREGAR ÁLBUNS
  // ===================================================

  async function carregarAlbuns() {

    setCarregandoAlbuns(true);

    setErro("");

    try {

      const resposta =
        await fetch(
          "/api/admin/galeria",
          {
            method: "GET",
            cache: "no-store",
          }
        );


      const resultado =
        await resposta.json();


      if (
        !resposta.ok ||
        !resultado.sucesso
      ) {

        throw new Error(
          resultado.mensagem ||
          "Não foi possível carregar os álbuns."
        );

      }


      setAlbuns(
        resultado.albuns || []
      );


    } catch (error) {

      console.error(
        "Erro ao carregar álbuns:",
        error
      );


      setErro(

        error instanceof Error
          ? error.message
          : "Não foi possível carregar os álbuns."

      );

    } finally {

      setCarregandoAlbuns(false);

    }

  }


  // ===================================================
  // CARREGAR AO ABRIR A PÁGINA
  // ===================================================

  useEffect(() => {

    carregarAlbuns();

  }, []);


  // ===================================================
  // LIMPAR FORMULÁRIO
  // ===================================================

  function limparFormularioAlbum() {

    setTitulo("");

    setDescricao("");

    setDataEvento("");

    setLocal("");

    setStatus("PUBLICADO");

    setModoEdicao(false);

    setIdAlbumEmEdicao(null);

  }


  // ===================================================
  // INICIAR EDIÇÃO DE ÁLBUM
  // ===================================================

  function iniciarEdicaoAlbum(
    album: Album
  ) {

    setTitulo(
      album.titulo
    );

    setDescricao(
      album.descricao
    );

    setDataEvento(
      album.dataEvento
    );

    setLocal(
      album.local
    );

    setStatus(
      album.status || "PUBLICADO"
    );

    setModoEdicao(true);

    setIdAlbumEmEdicao(
      album.idAlbum
    );

    setMensagem("");

    setErro("");


    document
      .getElementById(
        "formulario-album"
      )
      ?.scrollIntoView({
        behavior: "smooth",
      });

  }


  // ===================================================
  // CANCELAR EDIÇÃO
  // ===================================================

  function cancelarEdicaoAlbum() {

    limparFormularioAlbum();

    setMensagem("");

    setErro("");

  }


  // ===================================================
  // SALVAR ÁLBUM (CRIAR OU ATUALIZAR)
  // ===================================================

  async function handleSalvar(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();


    setSalvando(true);

    setMensagem("");

    setErro("");


    try {

      // =================================================
      // MODO EDIÇÃO
      // =================================================

      if (
        modoEdicao &&
        idAlbumEmEdicao
      ) {

        const resposta =
          await fetch(
            "/api/admin/galeria",
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({

                  idAlbum:
                    idAlbumEmEdicao,

                  titulo,

                  descricao,

                  dataEvento,

                  local,

                  status,

                }),

            }
          );


        const resultado =
          await resposta.json();


        if (
          !resposta.ok ||
          !resultado.sucesso
        ) {

          throw new Error(

            resultado.mensagem ||
            "Não foi possível atualizar o álbum."

          );

        }


        setMensagem(
          "Álbum atualizado com sucesso."
        );


        limparFormularioAlbum();


        await carregarAlbuns();


        return;

      }


      // =================================================
      // MODO CRIAÇÃO
      // =================================================

      const resposta =
        await fetch(
          "/api/admin/galeria",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({

                titulo,

                descricao,

                dataEvento,

                local,

                status,

              }),

          }
        );


      const resultado =
        await resposta.json();


      if (
        !resposta.ok ||
        !resultado.sucesso
      ) {

        throw new Error(

          resultado.mensagem ||
          "Não foi possível salvar o álbum."

        );

      }


      setMensagem(
        "Álbum salvo com sucesso."
      );


      limparFormularioAlbum();


      await carregarAlbuns();


    } catch (error) {

      console.error(
        "Erro ao salvar álbum:",
        error
      );


      setErro(

        error instanceof Error
          ? error.message
          : "Não foi possível salvar o álbum."

      );

    } finally {

      setSalvando(false);

    }

  }


  // ===================================================
  // EXCLUIR ÁLBUM
  // ===================================================

  async function excluirAlbumHandler(
    album: Album
  ) {

    if (
      excluindoAlbum
    ) {

      return;

    }


    const confirmar =
      window.confirm(
        `Deseja realmente excluir o álbum "${album.titulo}"? Todas as fotos desse álbum também serão excluídas. Essa ação não pode ser desfeita.`
      );


    if (!confirmar) {

      return;

    }


    setExcluindoAlbum(
      album.idAlbum
    );

    setErro("");

    setMensagem("");


    try {

      const resposta =
        await fetch(
          "/api/admin/galeria",
          {
            method: "DELETE",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({

                idAlbum:
                  album.idAlbum,

              }),

          }
        );


      const resultado =
        await resposta.json();


      if (
        !resposta.ok ||
        !resultado.sucesso
      ) {

        throw new Error(

          resultado.mensagem ||
          "Não foi possível excluir o álbum."

        );

      }


      // =================================================
      // SE O ÁLBUM EXCLUÍDO ESTAVA ABERTO, FECHAR MODAL
      // =================================================

      if (
        albumSelecionado?.idAlbum === album.idAlbum
      ) {

        setAlbumSelecionado(null);

        setFotosCadastradas([]);

        setFotosSelecionadas([]);

      }


      // =================================================
      // SE O ÁLBUM EXCLUÍDO ESTAVA EM EDIÇÃO, LIMPAR
      // =================================================

      if (
        idAlbumEmEdicao === album.idAlbum
      ) {

        limparFormularioAlbum();

      }


      setMensagem(
        "Álbum excluído com sucesso."
      );


      await carregarAlbuns();


    } catch (error) {

      console.error(
        "Erro ao excluir álbum:",
        error
      );


      setErro(

        error instanceof Error
          ? error.message
          : "Não foi possível excluir o álbum."

      );

    } finally {

      setExcluindoAlbum(null);

    }

  }


  // ===================================================
  // FORMATAR DATA
  // ===================================================

  function formatarData(
    data: string
  ) {

    if (!data) {

      return "";

    }


    const partes =
      data.split("-");


    if (
      partes.length !== 3
    ) {

      return data;

    }


    return (
      `${partes[2]}/${partes[1]}/${partes[0]}`
    );

  }


  // ===================================================
  // CARREGAR FOTOS DO ÁLBUM
  // ===================================================

  async function carregarFotosAlbum(
    album: Album
  ) {

    setCarregandoFotos(true);

    setErroFotos("");

    setMensagemFotos("");


    try {

      const resposta =
        await fetch(
          `/api/admin/galeria/fotos?idAlbum=${encodeURIComponent(
            album.idAlbum
          )}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );


      const resultado =
        await resposta.json();


      if (
        !resposta.ok ||
        !resultado.sucesso
      ) {

        throw new Error(
          resultado.mensagem ||
          "Não foi possível carregar as fotos."
        );

      }


      setFotosCadastradas(
        resultado.fotos || []
      );


      setAlbumSelecionado(
        (albumAtual) => {

          if (!albumAtual) {

            return null;

          }


          return {

            ...albumAtual,

            quantidadeFotos:
              Number(
                resultado.quantidade ||
                0
              ),

          };

        }
      );


    } catch (error) {

      console.error(
        "Erro ao carregar fotos:",
        error
      );


      setErroFotos(

        error instanceof Error
          ? error.message
          : "Não foi possível carregar as fotos."

      );

    } finally {

      setCarregandoFotos(false);

    }

  }


  // ===================================================
  // ABRIR GERENCIADOR DE FOTOS
  // ===================================================

  function abrirGerenciadorFotos(
    album: Album
  ) {

    setAlbumSelecionado(album);

    setFotosSelecionadas([]);

    setFotosCadastradas([]);

    setMensagemFotos("");

    setErroFotos("");


    carregarFotosAlbum(album);

  }


  // ===================================================
  // FECHAR GERENCIADOR DE FOTOS
  // ===================================================

  function fecharGerenciadorFotos() {

    if (
      enviandoFotos ||
      excluindoFoto ||
      definindoCapa
    ) {

      return;

    }


    fotosSelecionadas.forEach(
      (foto) => {

        URL.revokeObjectURL(
          foto.preview
        );

      }
    );


    setFotosSelecionadas([]);

    setFotosCadastradas([]);

    setAlbumSelecionado(null);

    setMensagemFotos("");

    setErroFotos("");

  }


  // ===================================================
  // SELECIONAR FOTOS
  // ===================================================

  function handleSelecionarFotos(
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    if (
      enviandoFotos ||
      excluindoFoto
    ) {

      return;

    }


    const arquivos =
      Array.from(
        event.target.files || []
      );


    if (!arquivos.length) {

      return;

    }


    setErroFotos("");

    setMensagemFotos("");


    const imagens =
      arquivos.filter(
        (arquivo) =>
          arquivo.type.startsWith(
            "image/"
          )
      );


    if (
      imagens.length !== arquivos.length
    ) {

      setErroFotos(
        "Somente arquivos de imagem podem ser enviados."
      );

    }


    const novasFotos =
      imagens.map(
        (arquivo) => ({

          arquivo,

          preview:
            URL.createObjectURL(
              arquivo
            ),

        })
      );


    setFotosSelecionadas(
      (fotosAtuais) => [

        ...fotosAtuais,

        ...novasFotos,

      ]
    );


    event.target.value = "";

  }


  // ===================================================
  // REMOVER FOTO DA SELEÇÃO
  // ===================================================

  function removerFoto(
    indice: number
  ) {

    if (
      enviandoFotos ||
      excluindoFoto
    ) {

      return;

    }


    const foto =
      fotosSelecionadas[indice];


    if (foto) {

      URL.revokeObjectURL(
        foto.preview
      );

    }


    setFotosSelecionadas(
      (fotosAtuais) =>
        fotosAtuais.filter(
          (_, index) =>
            index !== indice
        )
    );

  }


  // ===================================================
  // CONVERTER ARQUIVO PARA BASE64
  // ===================================================

  function arquivoParaBase64(
    arquivo: File
  ): Promise<string> {

    return new Promise(
      (
        resolve,
        reject
      ) => {

        const leitor =
          new FileReader();


        leitor.onload = () => {

          resolve(
            String(
              leitor.result || ""
            )
          );

        };


        leitor.onerror = () => {

          reject(
            new Error(
              `Não foi possível ler o arquivo "${arquivo.name}".`
            )
          );

        };


        leitor.readAsDataURL(
          arquivo
        );

      }
    );

  }


  // ===================================================
  // EXCLUIR FOTO CADASTRADA
  // ===================================================

  async function excluirFotoCadastrada(
    foto: FotoCadastrada
  ) {

    if (
      enviandoFotos ||
      excluindoFoto ||
      definindoCapa
    ) {

      return;

    }


    const confirmar =
      window.confirm(
        `Deseja realmente excluir a foto "${foto.nomeArquivo}"?`
      );


    if (!confirmar) {

      return;

    }


    setExcluindoFoto(
      foto.idFoto
    );

    setMensagemFotos("");

    setErroFotos("");


    try {

      const resposta =
        await fetch(
          "/api/admin/galeria/fotos",
          {

            method:
              "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body:
              JSON.stringify({

                acao:
                  "excluirFoto",

                idFoto:
                  foto.idFoto,

              }),

          }
        );


      const resultado =
        await resposta.json();


      if (
        !resposta.ok ||
        !resultado.sucesso
      ) {

        throw new Error(

          resultado.mensagem ||
          "Não foi possível excluir a foto."

        );

      }


      setMensagemFotos(
        "Foto excluída com sucesso."
      );


      // =================================================
      // RECARREGAR FOTOS E ÁLBUNS
      // =================================================
      //
      // Recarregamos em vez de apenas remover localmente
      // porque a exclusão pode ter mudado a capa do
      // álbum (o backend se auto-ajusta).
      //

      if (
        albumSelecionado
      ) {

        await carregarFotosAlbum(
          albumSelecionado
        );

      }


      await carregarAlbuns();


    } catch (error) {

      console.error(
        "Erro ao excluir foto:",
        error
      );


      setErroFotos(

        error instanceof Error
          ? error.message
          : "Não foi possível excluir a foto."

      );

    } finally {

      setExcluindoFoto(null);

    }

  }


  // ===================================================
  // DEFINIR FOTO COMO CAPA DO ÁLBUM
  // ===================================================

  async function definirComoCapa(
    foto: FotoCadastrada
  ) {

    if (
      !albumSelecionado ||
      enviandoFotos ||
      excluindoFoto ||
      definindoCapa
    ) {

      return;

    }


    setDefinindoCapa(
      foto.idFoto
    );

    setMensagemFotos("");

    setErroFotos("");


    try {

      const resposta =
        await fetch(
          "/api/admin/galeria/fotos",
          {

            method:
              "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body:
              JSON.stringify({

                acao:
                  "definirCapaFoto",

                idAlbum:
                  albumSelecionado.idAlbum,

                idFoto:
                  foto.idFoto,

              }),

          }
        );


      const resultado =
        await resposta.json();


      if (
        !resposta.ok ||
        !resultado.sucesso
      ) {

        throw new Error(

          resultado.mensagem ||
          "Não foi possível definir a capa do álbum."

        );

      }


      // =================================================
      // ATUALIZAR ESTADO LOCAL DAS FOTOS
      // =================================================

      setFotosCadastradas(
        (fotosAtuais) =>
          fotosAtuais.map(
            (item) => ({

              ...item,

              capa:
                item.idFoto === foto.idFoto
                  ? 1
                  : 0,

            })
          )
      );


      // =================================================
      // ATUALIZAR CAPA NO ÁLBUM SELECIONADO
      // =================================================

      setAlbumSelecionado(
        (albumAtual) => {

          if (!albumAtual) {

            return null;

          }


          return {

            ...albumAtual,

            capaUrl:
              resultado.capaUrl ||
              albumAtual.capaUrl,

          };

        }
      );


      setMensagemFotos(
        "Capa do álbum atualizada com sucesso."
      );


      // =================================================
      // ATUALIZAR LISTA DE ÁLBUNS
      // =================================================

      await carregarAlbuns();


    } catch (error) {

      console.error(
        "Erro ao definir capa:",
        error
      );


      setErroFotos(

        error instanceof Error
          ? error.message
          : "Não foi possível definir a capa do álbum."

      );

    } finally {

      setDefinindoCapa(null);

    }

  }


  // ===================================================
  // ENVIAR FOTOS
  // ===================================================

  async function handleEnviarFotos() {

    if (
      !albumSelecionado
    ) {

      return;

    }


    if (
      enviandoFotos ||
      excluindoFoto
    ) {

      return;

    }


    if (
      fotosSelecionadas.length === 0
    ) {

      setErroFotos(
        "Selecione pelo menos uma foto."
      );

      return;

    }


    setEnviandoFotos(true);

    setMensagemFotos("");

    setErroFotos("");


    try {

      const fotos =
        await Promise.all(

          fotosSelecionadas.map(
            async (
              item
            ) => {

              const data =
                await arquivoParaBase64(
                  item.arquivo
                );


              return {

                nome:
                  item.arquivo.name,

                mimeType:
                  item.arquivo.type ||
                  "image/jpeg",

                data,

              };

            }
          )

        );


      const resposta =
        await fetch(
          "/api/admin/galeria/fotos",
          {

            method:
              "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body:
              JSON.stringify({

                acao:
                  "salvarFotosAlbum",

                idAlbum:
                  albumSelecionado.idAlbum,

                fotos,

              }),

          }
        );


      const resultado =
        await resposta.json();


      if (
        !resposta.ok ||
        !resultado.sucesso
      ) {

        throw new Error(

          resultado.mensagem ||
          "Não foi possível enviar as fotos."

        );

      }


      setMensagemFotos(

        resultado.mensagem ||
        `${fotos.length} foto(s) enviada(s) com sucesso.`

      );


      setAlbumSelecionado(
        (albumAtual) => {

          if (!albumAtual) {

            return null;

          }


          return {

            ...albumAtual,

            quantidadeFotos:
              Number(
                resultado.totalFotos ||
                albumAtual.quantidadeFotos +
                fotos.length
              ),

            capaUrl:
              resultado.capaUrl ||
              albumAtual.capaUrl,

          };

        }
      );


      await carregarAlbuns();


      // Recarregar fotos cadastradas
      if (albumSelecionado) {

        await carregarFotosAlbum(
          albumSelecionado
        );

      }


      fotosSelecionadas.forEach(
        (foto) => {

          URL.revokeObjectURL(
            foto.preview
          );

        }
      );


      setFotosSelecionadas([]);


    } catch (error) {

      console.error(
        "Erro ao enviar fotos:",
        error
      );


      setErroFotos(

        error instanceof Error
          ? error.message
          : "Não foi possível enviar as fotos."

      );

    } finally {

      setEnviandoFotos(false);

    }

  }


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <div className="space-y-8">


      {/* =================================================
          BOTÃO VOLTAR
          ================================================= */}

      <div>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="mb-4 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          ← Voltar
        </button>
      </div>

      {/* =================================================
          CABEÇALHO
          ================================================= */}

      <div className="flex items-start justify-between gap-4">

        <div>

          <h1 className="text-2xl font-bold text-gray-900">
            Galeria
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Gerencie os álbuns e fotos que serão exibidos
            na galeria do Projeto Som do Alto.
          </p>

        </div>


        <button
          type="button"

          onClick={() => {

            limparFormularioAlbum();


            document
              .getElementById(
                "formulario-album"
              )
              ?.scrollIntoView({
                behavior: "smooth",
              });

          }}

          className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
        >
          + Novo álbum
        </button>

      </div>


      {/* =================================================
          ÁLBUNS CADASTRADOS
          ================================================= */}

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

        <div className="mb-6">

          <h2 className="text-xl font-bold text-gray-900">
            Álbuns cadastrados
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Álbuns disponíveis no sistema.
          </p>

        </div>


        {carregandoAlbuns && (

          <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">

            Carregando álbuns...

          </div>

        )}


        {!carregandoAlbuns &&
          erro &&
          albuns.length === 0 && (

            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm font-medium text-red-700">

              {erro}

            </div>

          )}


        {!carregandoAlbuns &&
          !erro &&
          albuns.length === 0 && (

            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">

              <div className="text-4xl">
                📷
              </div>

              <p className="mt-3 text-sm font-semibold text-gray-700">
                Nenhum álbum cadastrado.
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Crie o primeiro álbum usando o formulário abaixo.
              </p>

            </div>

          )}


        {!carregandoAlbuns &&
          albuns.length > 0 && (

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

              {albuns.map(
                (album) => (

                  <div
                    key={
                      album.idAlbum
                    }

                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                  >

                    {/* CAPA */}

                    <div className="aspect-video overflow-hidden bg-gray-100">

                      {album.capaUrl ? (

                        <img
                          src={
                            album.capaUrl
                          }
                          alt={
                            album.titulo
                          }
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />

                      ) : (

                        <div className="flex h-full items-center justify-center text-5xl">
                          📷
                        </div>

                      )}

                    </div>


                    {/* CONTEÚDO */}

                    <div className="p-5">

                      <div className="flex items-start justify-between gap-3">

                        <div>

                          <h3 className="font-bold text-gray-900">
                            {album.titulo}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            {formatarData(
                              album.dataEvento
                            )}
                            {" • "}
                            {album.local}
                          </p>

                        </div>


                        <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                          {album.status}
                        </span>

                      </div>


                      {album.descricao && (

                        <p className="mt-3 line-clamp-2 text-sm text-gray-600">
                          {album.descricao}
                        </p>

                      )}


                      <div className="mt-4 flex items-center justify-between">

                        <span className="text-sm text-gray-500">

                          {album.quantidadeFotos}{" "}

                          {album.quantidadeFotos === 1
                            ? "foto"
                            : "fotos"}

                        </span>


                        <button
                          type="button"
                          onClick={() =>
                            abrirGerenciadorFotos(
                              album
                            )
                          }
                          className="rounded-lg bg-gray-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-gray-700"
                        >
                          Gerenciar fotos
                        </button>

                      </div>


                      {/* AÇÕES: EDITAR / EXCLUIR */}

                      <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">

                        <button
                          type="button"
                          onClick={() =>
                            iniciarEdicaoAlbum(
                              album
                            )
                          }
                          className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                          Editar álbum
                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            excluirAlbumHandler(
                              album
                            )
                          }
                          disabled={
                            excluindoAlbum === album.idAlbum
                          }
                          className="flex-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {excluindoAlbum === album.idAlbum
                            ? "Excluindo..."
                            : "Excluir álbum"}
                        </button>

                      </div>

                    </div>

                  </div>

                )

              )}

            </div>

          )}

      </div>


      {/* =================================================
          FORMULÁRIO DO ÁLBUM
          ================================================= */}

      <div
        id="formulario-album"
        className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      >

        <div className="mb-6 flex items-start justify-between gap-4">

          <div>

            <h2 className="text-xl font-bold text-gray-900">
              {modoEdicao
                ? "Editar álbum"
                : "Novo álbum"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {modoEdicao
                ? "Atualize as informações do álbum selecionado."
                : "Cadastre um novo álbum para a galeria."}
            </p>

          </div>


          {modoEdicao && (

            <button
              type="button"
              onClick={cancelarEdicaoAlbum}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Cancelar edição
            </button>

          )}

        </div>


        {mensagem && (

          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {mensagem}
          </div>

        )}


        {erro && (

          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {erro}
          </div>

        )}


        <form
          onSubmit={handleSalvar}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Título do álbum
            </label>

            <input
              type="text"
              value={titulo}
              onChange={(event) =>
                setTitulo(
                  event.target.value
                )
              }
              placeholder="Ex.: Apresentação de Natal 2026"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              required
            />

          </div>


          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Descrição
            </label>

            <textarea
              value={descricao}
              onChange={(event) =>
                setDescricao(
                  event.target.value
                )
              }
              placeholder="Descrição do evento ou álbum..."
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />

          </div>


          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Data do evento
              </label>

              <input
                type="date"
                value={dataEvento}
                onChange={(event) =>
                  setDataEvento(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                required
              />

            </div>


            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Local
              </label>

              <input
                type="text"
                value={local}
                onChange={(event) =>
                  setLocal(
                    event.target.value
                  )
                }
                placeholder="Ex.: Teatro do Parque"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                required
              />

            </div>

          </div>


          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            >

              <option value="PUBLICADO">
                PUBLICADO
              </option>

              <option value="RASCUNHO">
                RASCUNHO
              </option>

            </select>

          </div>


          <div className="flex justify-end gap-3">

            {modoEdicao && (

              <button
                type="button"
                onClick={cancelarEdicaoAlbum}
                disabled={salvando}
                className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>

            )}


            <button
              type="submit"
              disabled={salvando}
              className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {salvando
                ? "Salvando..."
                : modoEdicao
                  ? "Salvar alterações"
                  : "Salvar álbum"}

            </button>

          </div>

        </form>

      </div>


      {/* =================================================
          GERENCIADOR DE FOTOS
          ================================================= */}

      {albumSelecionado && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

          <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* CABEÇALHO */}

            <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-5">

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Gerenciar fotos
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {albumSelecionado.titulo}
                </p>

              </div>


              <button
                type="button"
                onClick={
                  fecharGerenciadorFotos
                }
                disabled={
                  enviandoFotos ||
                  !!excluindoFoto ||
                  !!definindoCapa
                }
                className="rounded-lg px-3 py-2 text-xl leading-none text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ×
              </button>

            </div>


            {/* CONTEÚDO */}

            <div className="flex-1 overflow-y-auto p-6">

              {/* MENSAGENS */}

              {mensagemFotos && (

                <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  {mensagemFotos}
                </div>

              )}


              {erroFotos && (

                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {erroFotos}
                </div>

              )}


              {/* FOTOS CADASTRADAS */}

              <div>

                <div className="mb-4 flex items-center justify-between">

                  <div>

                    <h3 className="text-base font-bold text-gray-900">
                      Fotos cadastradas
                    </h3>

                    <p className="text-sm text-gray-500">
                      Fotos que já fazem parte deste álbum.
                      Clique em &quot;Definir como capa&quot;
                      para escolher a foto principal do álbum.
                    </p>

                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                    {fotosCadastradas.length}
                  </span>

                </div>


                {carregandoFotos ? (

                  <div className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
                    Carregando fotos...
                  </div>

                ) : fotosCadastradas.length === 0 ? (

                  <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">

                    <div className="text-4xl">
                      📷
                    </div>

                    <p className="mt-3 text-sm font-semibold text-gray-700">
                      Nenhuma foto cadastrada.
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Adicione as primeiras fotos deste álbum abaixo.
                    </p>

                  </div>

                ) : (

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

                    {fotosCadastradas.map(
                      (foto) => {

                        const ehCapa =
                          Number(
                            foto.capa
                          ) === 1;


                        return (

                          <div
                            key={
                              foto.idFoto
                            }
                            className={`group relative overflow-hidden rounded-xl border bg-gray-100 ${
                              ehCapa
                                ? "border-orange-400 ring-2 ring-orange-200"
                                : "border-gray-200"
                            }`}
                          >

                            <div className="aspect-square">

                              <img
                                src={
                                  foto.urlImagem ||
                                  foto.url
                                }
                                alt={
                                  foto.nomeArquivo
                                }
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-cover"
                              />

                            </div>


                            {ehCapa && (

                              <span className="absolute left-2 top-2 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                                Capa atual
                              </span>

                            )}


                            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/80 to-transparent p-2 pt-8">

                              <p className="truncate text-xs font-medium text-white">
                                {foto.nomeArquivo}
                              </p>


                              {!ehCapa && (

                                <button
                                  type="button"
                                  onClick={() =>
                                    definirComoCapa(
                                      foto
                                    )
                                  }
                                  disabled={
                                    !!definindoCapa ||
                                    !!excluindoFoto
                                  }
                                  className="rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold text-gray-800 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {definindoCapa === foto.idFoto
                                    ? "Definindo..."
                                    : "Definir como capa"}
                                </button>

                              )}

                            </div>


                            <button
                              type="button"
                              onClick={() =>
                                excluirFotoCadastrada(
                                  foto
                                )
                              }
                              disabled={
                                excluindoFoto === foto.idFoto ||
                                !!definindoCapa
                              }
                              className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                              title="Excluir foto"
                            >
                              {excluindoFoto === foto.idFoto
                                ? "..."
                                : "×"}
                            </button>

                          </div>

                        );

                      }

                    )}

                  </div>

                )}

              </div>


              {/* DIVISOR */}

              <div className="my-8 border-t border-gray-200" />


              {/* ADICIONAR FOTOS */}

              <div>

                <div className="mb-4">

                  <h3 className="text-base font-bold text-gray-900">
                    Adicionar novas fotos
                  </h3>

                  <p className="text-sm text-gray-500">
                    Selecione uma ou várias imagens para adicionar ao álbum.
                  </p>

                </div>


                <label
                  className={`flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center transition ${
                    enviandoFotos ||
                    !!excluindoFoto
                      ? "cursor-not-allowed opacity-50"
                      : "hover:border-orange-400 hover:bg-orange-50"
                  }`}
                >

                  <div className="text-3xl">
                    📷
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-700">
                    Clique para selecionar fotos
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    JPG, JPEG, PNG ou outras imagens
                  </p>


                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={
                      enviandoFotos ||
                      !!excluindoFoto
                    }
                    onChange={
                      handleSelecionarFotos
                    }
                    className="hidden"
                  />

                </label>

              </div>


              {/* FOTOS SELECIONADAS */}

              {fotosSelecionadas.length > 0 && (

                <div className="mt-6">

                  <div className="mb-4 flex items-center justify-between">

                    <div>

                      <h3 className="text-base font-bold text-gray-900">
                        Fotos selecionadas
                      </h3>

                      <p className="text-sm text-gray-500">
                        Estas fotos ainda serão enviadas.
                      </p>

                    </div>

                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                      {fotosSelecionadas.length}
                    </span>

                  </div>


                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

                    {fotosSelecionadas.map(
                      (
                        foto,
                        indice
                      ) => (

                        <div
                          key={`${foto.arquivo.name}-${indice}`}
                          className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
                        >

                          <div className="aspect-square">

                            <img
                              src={
                                foto.preview
                              }
                              alt={
                                foto.arquivo.name
                              }
                              className="h-full w-full object-cover"
                            />

                          </div>


                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 pt-8">

                            <p className="truncate text-xs font-medium text-white">
                              {foto.arquivo.name}
                            </p>

                          </div>


                          <button
                            type="button"
                            onClick={() =>
                              removerFoto(
                                indice
                              )
                            }
                            disabled={
                              enviandoFotos ||
                              !!excluindoFoto
                            }
                            className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            title="Remover da seleção"
                          >
                            ×
                          </button>

                        </div>

                      )

                    )}

                  </div>

                </div>

              )}

            </div>


            {/* RODAPÉ */}

            <div className="flex items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">

              <div className="text-sm text-gray-500">

                {albumSelecionado.quantidadeFotos}{" "}

                {albumSelecionado.quantidadeFotos === 1
                  ? "foto cadastrada"
                  : "fotos cadastradas"}

              </div>


              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={
                    fecharGerenciadorFotos
                  }
                  disabled={
                    enviandoFotos ||
                    !!excluindoFoto ||
                    !!definindoCapa
                  }
                  className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Fechar
                </button>


                <button
                  type="button"
                  onClick={
                    handleEnviarFotos
                  }
                  disabled={
                    enviandoFotos ||
                    !!excluindoFoto ||
                    fotosSelecionadas.length === 0
                  }
                  className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {enviandoFotos
                    ? "Enviando..."
                    : `Enviar ${fotosSelecionadas.length || ""} ${
                        fotosSelecionadas.length === 1
                          ? "foto"
                          : "fotos"
                      }`}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}