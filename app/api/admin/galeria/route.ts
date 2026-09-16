import { NextResponse } from "next/server";

const URL_GOOGLE_APPS_SCRIPT =
  "https://script.google.com/macros/s/AKfycbyzQvmlyQfvh_Y1JFHG697N5vbj59w-EuPfR1WmBuUGxBZ1swciS6VeMLLXdljV8KdFdQ/exec";


// =====================================================
// TIPOS
// =====================================================

type FotoRecebida = {
  nomeArquivo?: string;
  mimeType?: string;
  base64?: string;
};


// =====================================================
// GET — LISTAR ÁLBUNS DA GALERIA
// =====================================================

export async function GET() {

  try {

    const resposta =
      await fetch(
        `${URL_GOOGLE_APPS_SCRIPT}?acao=listarAlbuns`,
        {
          method: "GET",
          cache: "no-store",
        }
      );


    // ===================================================
    // VERIFICAR RESPOSTA HTTP
    // ===================================================

    if (!resposta.ok) {

      throw new Error(
        `Google Apps Script respondeu com status ${resposta.status}`
      );

    }


    // ===================================================
    // LER COMO TEXTO
    // ===================================================

    const texto =
      await resposta.text();


    let resultado;

    try {

      resultado =
        JSON.parse(texto);

    } catch (erro) {

      console.error(
        "Resposta não JSON do Google Apps Script:",
        texto
      );

      throw new Error(
        "O Google Apps Script não retornou uma resposta JSON válida."
      );

    }


    // ===================================================
    // VERIFICAR SUCESSO
    // ===================================================

    if (!resultado.sucesso) {

      return NextResponse.json(

        {
          sucesso: false,

          mensagem:
            resultado.mensagem ||
            "Não foi possível carregar os álbuns.",

          albuns: [],
        },

        {
          status: 500,
        }

      );

    }


    // ===================================================
    // RETORNAR ÁLBUNS
    // ===================================================

    return NextResponse.json({

      sucesso: true,

      albuns:
        resultado.albuns || [],

    });


  } catch (erro) {

    console.error(
      "Erro ao listar álbuns da galeria:",
      erro
    );


    return NextResponse.json(

      {
        sucesso: false,

        mensagem:
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar os álbuns.",

        albuns: [],
      },

      {
        status: 500,
      }

    );

  }

}


// =====================================================
// POST — SALVAR ÁLBUM + FOTO
// =====================================================

export async function POST(
  request: Request
) {

  try {

    // ===================================================
    // LER JSON
    // ===================================================

    const dados =
      await request.json();


    // ===================================================
    // VALIDAR DADOS
    // ===================================================

    if (
      !dados.titulo ||
      !String(dados.titulo).trim()
    ) {

      return NextResponse.json(

        {
          sucesso: false,

          mensagem:
            "O título do álbum é obrigatório.",
        },

        {
          status: 400,
        }

      );

    }


    if (
      !dados.dataEvento
    ) {

      return NextResponse.json(

        {
          sucesso: false,

          mensagem:
            "A data do evento é obrigatória.",
        },

        {
          status: 400,
        }

      );

    }


    if (
      !dados.local ||
      !String(dados.local).trim()
    ) {

      return NextResponse.json(

        {
          sucesso: false,

          mensagem:
            "O local do evento é obrigatório.",
        },

        {
          status: 400,
        }

      );

    }


    // ===================================================
    // PREPARAR FOTO
    // ===================================================

    let foto: FotoRecebida | null = null;


    // ---------------------------------------------------
    // FORMATO 1
    // dados.foto
    // ---------------------------------------------------

    if (
      dados.foto &&
      typeof dados.foto === "object"
    ) {

      foto = {
        nomeArquivo:
          dados.foto.nomeArquivo || "",

        mimeType:
          dados.foto.mimeType || "",

        base64:
          dados.foto.base64 || "",
      };

    }


    // ---------------------------------------------------
    // FORMATO 2
    // dados.fotoBase64
    // ---------------------------------------------------

    if (
      !foto &&
      dados.fotoBase64
    ) {

      foto = {

        nomeArquivo:
          dados.nomeArquivo ||
          "foto-galeria",

        mimeType:
          dados.mimeType ||
          "image/jpeg",

        base64:
          dados.fotoBase64,

      };

    }


    // ===================================================
    // VALIDAR FOTO
    // ===================================================

    if (foto) {

      if (
        !foto.base64
      ) {

        return NextResponse.json(

          {
            sucesso: false,

            mensagem:
              "A foto foi recebida, mas não possui os dados da imagem.",
          },

          {
            status: 400,
          }

        );

      }

    }


    // ===================================================
    // 1 — SALVAR ÁLBUM
    // ===================================================

    const respostaAlbum =
      await fetch(

        URL_GOOGLE_APPS_SCRIPT,

        {

          method: "POST",

          headers: {

            "Content-Type":
              "text/plain;charset=utf-8",

          },

          body:
            JSON.stringify({

              acao:
                "salvarAlbum",

              titulo:
                String(
                  dados.titulo
                ).trim(),

              descricao:
                dados.descricao
                  ? String(
                      dados.descricao
                    ).trim()
                  : "",

              dataEvento:
                dados.dataEvento,

              local:
                String(
                  dados.local
                ).trim(),

              // ------------------------------------------------
              // IMPORTANTE:
              // Não enviamos mais capaUrl como origem da capa.
              // A capa será definida pelo 08_FOTOS.
              // ------------------------------------------------

              capaUrl:
                "",

              status:
                dados.status ||
                "PUBLICADO",

            }),

        }

      );


    // ===================================================
    // VERIFICAR RESPOSTA DO ÁLBUM
    // ===================================================

    if (
      !respostaAlbum.ok
    ) {

      throw new Error(
        `Google Apps Script respondeu com status ${respostaAlbum.status} ao salvar o álbum.`
      );

    }


    // ===================================================
    // LER RESPOSTA
    // ===================================================

    const textoAlbum =
      await respostaAlbum.text();


    let resultadoAlbum;

    try {

      resultadoAlbum =
        JSON.parse(
          textoAlbum
        );

    } catch (erro) {

      console.error(
        "Resposta inválida ao salvar álbum:",
        textoAlbum
      );

      throw new Error(
        "O Google Apps Script não retornou JSON válido ao salvar o álbum."
      );

    }


    // ===================================================
    // VERIFICAR SUCESSO DO ÁLBUM
    // ===================================================

    if (
      !resultadoAlbum.sucesso
    ) {

      return NextResponse.json(

        {
          sucesso: false,

          mensagem:
            resultadoAlbum.mensagem ||
            "Não foi possível salvar o álbum.",
        },

        {
          status: 500,
        }

      );

    }


    // ===================================================
    // ID DO ÁLBUM CRIADO
    // ===================================================

    const idAlbum =
      String(
        resultadoAlbum.idAlbum ||
        ""
      ).trim();


    if (!idAlbum) {

      throw new Error(
        "O álbum foi criado, mas o Google Apps Script não retornou o ID do álbum."
      );

    }


    // ===================================================
    // 2 — SALVAR FOTO
    // ===================================================

    let resultadoFoto = null;


    if (
      foto &&
      foto.base64
    ) {

      const respostaFoto =
        await fetch(

          URL_GOOGLE_APPS_SCRIPT,

          {

            method: "POST",

            headers: {

              "Content-Type":
                "text/plain;charset=utf-8",

            },

            body:
              JSON.stringify({

                acao:
                  "salvarFotosAlbum",

                idAlbum:
                  idAlbum,

                fotos: [

                  {

                    nomeArquivo:
                      foto.nomeArquivo ||
                      "foto-galeria",

                    mimeType:
                      foto.mimeType ||
                      "image/jpeg",

                    base64:
                      foto.base64,

                  }

                ],

              }),

          }

        );


      // =================================================
      // VERIFICAR RESPOSTA DA FOTO
      // =================================================

      if (
        !respostaFoto.ok
      ) {

        throw new Error(
          `O álbum ${idAlbum} foi criado, mas ocorreu um erro HTTP ao salvar a foto.`
        );

      }


      // =================================================
      // LER RESPOSTA
      // =================================================

      const textoFoto =
        await respostaFoto.text();


      try {

        resultadoFoto =
          JSON.parse(
            textoFoto
          );

      } catch (erro) {

        console.error(
          "Resposta inválida ao salvar foto:",
          textoFoto
        );

        throw new Error(
          "O álbum foi criado, mas o Google Apps Script não retornou JSON válido ao salvar a foto."
        );

      }


      // =================================================
      // VERIFICAR SUCESSO DA FOTO
      // =================================================

      if (
        !resultadoFoto.sucesso
      ) {

        throw new Error(
          resultadoFoto.mensagem ||
          "O álbum foi criado, mas não foi possível salvar a foto."
        );

      }

    }


    // ===================================================
    // RETORNO FINAL
    // ===================================================

    return NextResponse.json({

      sucesso: true,

      mensagem:
        foto
          ? "Álbum e foto salvos com sucesso."
          : "Álbum salvo com sucesso.",

      idAlbum:
        idAlbum,

      fotoSalva:
        Boolean(
          foto &&
          foto.base64
        ),

      resultadoFoto:
        resultadoFoto,

    });


  } catch (erro) {

    console.error(
      "Erro ao salvar álbum da galeria:",
      erro
    );


    return NextResponse.json(

      {
        sucesso: false,

        mensagem:
          erro instanceof Error
            ? erro.message
            : "Não foi possível salvar o álbum.",

      },

      {
        status: 500,
      }

    );

  }

}


// =====================================================
// PUT — ATUALIZAR ÁLBUM
// =====================================================

export async function PUT(
  request: Request
) {

  try {

    // ===================================================
    // LER JSON
    // ===================================================

    const dados =
      await request.json();


    // ===================================================
    // VALIDAR ID DO ÁLBUM
    // ===================================================

    if (
      !dados.idAlbum ||
      !String(dados.idAlbum).trim()
    ) {

      return NextResponse.json(

        {
          sucesso: false,

          mensagem:
            "O ID do álbum é obrigatório.",
        },

        {
          status: 400,
        }

      );

    }


    // ===================================================
    // ENVIAR PARA O GOOGLE APPS SCRIPT
    // ===================================================

    const resposta =
      await fetch(

        URL_GOOGLE_APPS_SCRIPT,

        {

          method: "POST",

          headers: {

            "Content-Type":
              "text/plain;charset=utf-8",

          },

          body:
            JSON.stringify({

              acao:
                "atualizarAlbum",

              idAlbum:
                String(
                  dados.idAlbum
                ).trim(),

              titulo:
                dados.titulo,

              descricao:
                dados.descricao,

              dataEvento:
                dados.dataEvento,

              local:
                dados.local,

              status:
                dados.status,

            }),

        }

      );


    // ===================================================
    // VERIFICAR RESPOSTA HTTP
    // ===================================================

    if (!resposta.ok) {

      throw new Error(
        `Google Apps Script respondeu com status ${resposta.status}.`
      );

    }


    // ===================================================
    // LER RESPOSTA
    // ===================================================

    const texto =
      await resposta.text();


    let resultado;

    try {

      resultado =
        JSON.parse(
          texto
        );

    } catch (erro) {

      console.error(
        "Resposta não JSON do Google Apps Script:",
        texto
      );

      throw new Error(
        "O Google Apps Script não retornou uma resposta JSON válida."
      );

    }


    // ===================================================
    // VERIFICAR SUCESSO
    // ===================================================

    if (
      !resultado.sucesso
    ) {

      return NextResponse.json(

        {
          sucesso: false,

          mensagem:
            resultado.mensagem ||
            "Não foi possível atualizar o álbum.",
        },

        {
          status: 500,
        }

      );

    }


    // ===================================================
    // RETORNO
    // ===================================================

    return NextResponse.json(
      resultado
    );


  } catch (erro) {

    console.error(
      "Erro ao atualizar álbum da galeria:",
      erro
    );


    return NextResponse.json(

      {
        sucesso: false,

        mensagem:
          erro instanceof Error
            ? erro.message
            : "Não foi possível atualizar o álbum.",
      },

      {
        status: 500,
      }

    );

  }

}


// =====================================================
// DELETE — EXCLUIR ÁLBUM
// =====================================================

export async function DELETE(
  request: Request
) {

  try {

    // ===================================================
    // LER JSON
    // ===================================================

    const dados =
      await request.json();


    // ===================================================
    // VALIDAR ID DO ÁLBUM
    // ===================================================

    if (
      !dados.idAlbum ||
      !String(dados.idAlbum).trim()
    ) {

      return NextResponse.json(

        {
          sucesso: false,

          mensagem:
            "O ID do álbum é obrigatório.",
        },

        {
          status: 400,
        }

      );

    }


    // ===================================================
    // ENVIAR PARA O GOOGLE APPS SCRIPT
    // ===================================================

    const resposta =
      await fetch(

        URL_GOOGLE_APPS_SCRIPT,

        {

          method: "POST",

          headers: {

            "Content-Type":
              "text/plain;charset=utf-8",

          },

          body:
            JSON.stringify({

              acao:
                "excluirAlbum",

              idAlbum:
                String(
                  dados.idAlbum
                ).trim(),

            }),

        }

      );


    // ===================================================
    // VERIFICAR RESPOSTA HTTP
    // ===================================================

    if (!resposta.ok) {

      throw new Error(
        `Google Apps Script respondeu com status ${resposta.status}.`
      );

    }


    // ===================================================
    // LER RESPOSTA
    // ===================================================

    const texto =
      await resposta.text();


    let resultado;

    try {

      resultado =
        JSON.parse(
          texto
        );

    } catch (erro) {

      console.error(
        "Resposta não JSON do Google Apps Script:",
        texto
      );

      throw new Error(
        "O Google Apps Script não retornou uma resposta JSON válida."
      );

    }


    // ===================================================
    // VERIFICAR SUCESSO
    // ===================================================

    if (
      !resultado.sucesso
    ) {

      return NextResponse.json(

        {
          sucesso: false,

          mensagem:
            resultado.mensagem ||
            "Não foi possível excluir o álbum.",
        },

        {
          status: 500,
        }

      );

    }


    // ===================================================
    // RETORNO
    // ===================================================

    return NextResponse.json(
      resultado
    );


  } catch (erro) {

    console.error(
      "Erro ao excluir álbum da galeria:",
      erro
    );


    return NextResponse.json(

      {
        sucesso: false,

        mensagem:
          erro instanceof Error
            ? erro.message
            : "Não foi possível excluir o álbum.",
      },

      {
        status: 500,
      }

    );

  }

}
