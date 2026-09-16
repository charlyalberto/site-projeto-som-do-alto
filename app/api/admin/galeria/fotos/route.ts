import { NextResponse } from "next/server";

const URL_GOOGLE_APPS_SCRIPT =
  "https://script.google.com/macros/s/AKfycbyzQvmlyQfvh_Y1JFHG697N5vbj59w-EuPfR1WmBuUGxBZ1swciS6VeMLLXdljV8KdFdQ/exec";


// =====================================================
// FUNÇÃO AUXILIAR — CONVERTER RESPOSTA DO GOOGLE
// =====================================================

async function lerRespostaGoogle(
  resposta: Response
) {

  const texto =
    await resposta.text();


  console.log(
    "Resposta do Google Apps Script:",
    texto
  );


  if (!texto) {

    throw new Error(
      "O Google Apps Script retornou uma resposta vazia."
    );

  }


  try {

    return JSON.parse(
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

}


// =====================================================
// FUNÇÃO AUXILIAR — PROCESSAR RESPOSTA
// =====================================================

async function processarRespostaGoogle(
  resposta: Response
) {

  // ===================================================
  // RESPOSTA DIRETA
  // ===================================================

  if (
    resposta.status >= 200 &&
    resposta.status < 300
  ) {

    return lerRespostaGoogle(
      resposta
    );

  }


  // ===================================================
  // REDIRECIONAMENTO
  // ===================================================

  if (
    resposta.status === 301 ||
    resposta.status === 302 ||
    resposta.status === 303 ||
    resposta.status === 307 ||
    resposta.status === 308
  ) {

    const location =
      resposta.headers.get(
        "location"
      );


    if (!location) {

      throw new Error(
        "O Google Apps Script retornou um redirecionamento sem informar o destino."
      );

    }


    console.log(
      "Google Apps Script redirecionou para:",
      location
    );


    // =================================================
    // IMPORTANTE
    //
    // O POST ORIGINAL JÁ FOI ENVIADO.
    //
    // NÃO devemos repetir o POST.
    //
    // O Google Apps Script normalmente fornece
    // a resposta final através do endereço informado
    // no redirecionamento.
    // =================================================

    const respostaFinal =
      await fetch(
        location,
        {
          method:
            "GET",

          cache:
            "no-store",

        }
      );


    return lerRespostaGoogle(
      respostaFinal
    );

  }


  // ===================================================
  // OUTROS STATUS
  // ===================================================

  const texto =
    await resposta.text();


  console.error(
    "Resposta HTTP inesperada do Google:",
    resposta.status,
    texto
  );


  throw new Error(
    `Google Apps Script respondeu com status ${resposta.status}.`
  );

}


// =====================================================
// GET — LISTAR FOTOS DO ÁLBUM
// =====================================================

export async function GET(
  request: Request
) {

  try {

    const url =
      new URL(
        request.url
      );


    const idAlbum =
      url.searchParams.get(
        "idAlbum"
      );


    // ===================================================
    // VALIDAR ID
    // ===================================================

    if (
      !idAlbum ||
      !idAlbum.trim()
    ) {

      return NextResponse.json(

        {
          sucesso:
            false,

          mensagem:
            "O ID do álbum é obrigatório.",

          fotos:
            [],

        },

        {
          status:
            400,
        }

      );

    }


    // ===================================================
    // CONSULTAR GOOGLE APPS SCRIPT
    // ===================================================

    const respostaGoogle =
      await fetch(

        `${URL_GOOGLE_APPS_SCRIPT}?acao=listarFotosAlbum&idAlbum=${encodeURIComponent(
          idAlbum.trim()
        )}`,

        {

          method:
            "GET",

          cache:
            "no-store",

        }

      );


    // ===================================================
    // VERIFICAR HTTP
    // ===================================================

    if (
      !respostaGoogle.ok
    ) {

      throw new Error(
        `Google Apps Script respondeu com status ${respostaGoogle.status}.`
      );

    }


    // ===================================================
    // LER JSON
    // ===================================================

    const resultado =
      await lerRespostaGoogle(
        respostaGoogle
      );


    // ===================================================
    // RETORNAR
    // ===================================================

    return NextResponse.json(
      resultado
    );


  } catch (erro) {

    console.error(
      "Erro ao listar fotos da galeria:",
      erro
    );


    return NextResponse.json(

      {

        sucesso:
          false,

        mensagem:
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar as fotos.",

        fotos:
          [],

      },

      {
        status:
          500,
      }

    );

  }

}


// =====================================================
// POST — SALVAR, EXCLUIR OU DEFINIR CAPA DA FOTO
// =====================================================

export async function POST(
  request: Request
) {

  try {

    // ===================================================
    // RECEBER DADOS
    // ===================================================

    const dados =
      await request.json();


    // ===================================================
    // VALIDAR AÇÃO
    // ===================================================

    const acao =
      String(
        dados.acao || ""
      )
        .trim();


    // ===================================================
    // EXCLUIR FOTO
    // ===================================================

    if (
      acao ===
      "excluirFoto"
    ) {

      // =================================================
      // VALIDAR ID DA FOTO
      // =================================================

      if (
        !dados.idFoto ||
        !String(
          dados.idFoto
        ).trim()
      ) {

        return NextResponse.json(

          {

            sucesso:
              false,

            mensagem:
              "O ID da foto é obrigatório.",

          },

          {

            status:
              400,

          }

        );

      }


      // =================================================
      // MONTAR CORPO
      // =================================================

      const corpo =
        JSON.stringify({

          acao:
            "excluirFoto",

          idFoto:
            String(
              dados.idFoto
            ).trim(),

        });


      console.log(
        "Enviando exclusão de foto:",
        corpo
      );


      // =================================================
      // ENVIAR PARA GOOGLE
      // =================================================

      const respostaGoogle =
        await fetch(

          URL_GOOGLE_APPS_SCRIPT,

          {

            method:
              "POST",

            redirect:
              "manual",

            headers: {

              "Content-Type":
                "text/plain;charset=utf-8",

            },

            body:
              corpo,

          }

        );


      // =================================================
      // PROCESSAR RESPOSTA
      // =================================================

      const resultado =
        await processarRespostaGoogle(
          respostaGoogle
        );


      // =================================================
      // VERIFICAR RESULTADO
      // =================================================

      if (
        !resultado ||
        resultado.sucesso !== true
      ) {

        return NextResponse.json(

          {

            sucesso:
              false,

            mensagem:
              resultado?.mensagem ||
              "Não foi possível excluir a foto.",

          },

          {

            status:
              500,

          }

        );

      }


      // =================================================
      // SUCESSO
      // =================================================

      console.log(
        "Foto excluída com sucesso:",
        dados.idFoto
      );


      return NextResponse.json({

        sucesso:
          true,

        mensagem:
          resultado.mensagem ||
          "Foto excluída com sucesso.",

        idFoto:
          dados.idFoto,

      });

    }


    // ===================================================
    // DEFINIR FOTO COMO CAPA DO ÁLBUM
    // ===================================================

    if (
      acao ===
      "definirCapaFoto"
    ) {

      // =================================================
      // VALIDAR ID DO ÁLBUM
      // =================================================

      if (
        !dados.idAlbum ||
        !String(
          dados.idAlbum
        ).trim()
      ) {

        return NextResponse.json(

          {

            sucesso:
              false,

            mensagem:
              "O ID do álbum é obrigatório.",

          },

          {

            status:
              400,

          }

        );

      }


      // =================================================
      // VALIDAR ID DA FOTO
      // =================================================

      if (
        !dados.idFoto ||
        !String(
          dados.idFoto
        ).trim()
      ) {

        return NextResponse.json(

          {

            sucesso:
              false,

            mensagem:
              "O ID da foto é obrigatório.",

          },

          {

            status:
              400,

          }

        );

      }


      // =================================================
      // MONTAR CORPO
      // =================================================

      const corpo =
        JSON.stringify({

          acao:
            "definirCapaFoto",

          idAlbum:
            String(
              dados.idAlbum
            ).trim(),

          idFoto:
            String(
              dados.idFoto
            ).trim(),

        });


      // =================================================
      // ENVIAR PARA GOOGLE
      // =================================================

      const respostaGoogle =
        await fetch(

          URL_GOOGLE_APPS_SCRIPT,

          {

            method:
              "POST",

            redirect:
              "manual",

            headers: {

              "Content-Type":
                "text/plain;charset=utf-8",

            },

            body:
              corpo,

          }

        );


      // =================================================
      // PROCESSAR RESPOSTA
      // =================================================

      const resultado =
        await processarRespostaGoogle(
          respostaGoogle
        );


      // =================================================
      // VERIFICAR RESULTADO
      // =================================================

      if (
        !resultado ||
        resultado.sucesso !== true
      ) {

        return NextResponse.json(

          {

            sucesso:
              false,

            mensagem:
              resultado?.mensagem ||
              "Não foi possível definir a capa do álbum.",

          },

          {

            status:
              500,

          }

        );

      }


      // =================================================
      // SUCESSO
      // =================================================

      return NextResponse.json(
        resultado
      );

    }


    // ===================================================
    // SALVAR FOTOS DO ÁLBUM
    // ===================================================

    if (
      acao ===
      "salvarFotosAlbum"
    ) {

      // =================================================
      // VALIDAR ID DO ÁLBUM
      // =================================================

      if (
        !dados.idAlbum ||
        !String(
          dados.idAlbum
        ).trim()
      ) {

        return NextResponse.json(

          {

            sucesso:
              false,

            mensagem:
              "O ID do álbum é obrigatório.",

          },

          {

            status:
              400,

          }

        );

      }


      // =================================================
      // VALIDAR FOTOS
      // =================================================

      if (
        !Array.isArray(
          dados.fotos
        ) ||
        dados.fotos.length === 0
      ) {

        return NextResponse.json(

          {

            sucesso:
              false,

            mensagem:
              "Nenhuma foto foi enviada.",

          },

          {

            status:
              400,

          }

        );

      }


      // =================================================
      // VALIDAR FOTOS
      // =================================================

      const fotos =
        dados.fotos.map(
          (
            foto: {
              nome?: string;
              mimeType?: string;
              data?: string;
            }
          ) => {

            if (
              !foto ||
              !foto.data
            ) {

              throw new Error(
                "Uma ou mais fotos não possuem dados válidos."
              );

            }


            return {

              nome:
                String(
                  foto.nome ||
                  "foto"
                ).trim(),

              mimeType:
                String(
                  foto.mimeType ||
                  "application/octet-stream"
                ).trim(),

              data:
                foto.data,

            };

          }
        );


      // =================================================
      // MONTAR CORPO
      // =================================================

      const corpo =
        JSON.stringify({

          acao:
            "salvarFotosAlbum",

          idAlbum:
            String(
              dados.idAlbum
            ).trim(),

          fotos:
            fotos,

        });


      // =================================================
      // ENVIAR PARA GOOGLE
      // =================================================

      const respostaGoogle =
        await fetch(

          URL_GOOGLE_APPS_SCRIPT,

          {

            method:
              "POST",

            redirect:
              "manual",

            headers: {

              "Content-Type":
                "text/plain;charset=utf-8",

            },

            body:
              corpo,

          }

        );


      // =================================================
      // PROCESSAR RESPOSTA
      // =================================================

      const resultado =
        await processarRespostaGoogle(
          respostaGoogle
        );


      // =================================================
      // VERIFICAR RESULTADO
      // =================================================

      if (
        !resultado ||
        resultado.sucesso !== true
      ) {

        return NextResponse.json(

          {

            sucesso:
              false,

            mensagem:
              resultado?.mensagem ||
              "Não foi possível salvar as fotos.",

          },

          {

            status:
              500,

          }

        );

      }


      // =================================================
      // RETORNAR SUCESSO
      // =================================================

      return NextResponse.json(
        resultado
      );

    }


    // ===================================================
    // AÇÃO INVÁLIDA
    // ===================================================

    return NextResponse.json(

      {

        sucesso:
          false,

        mensagem:
          "Ação não reconhecida: " +
          acao,

      },

      {

        status:
          400,

      }

    );


  } catch (erro) {

    console.error(
      "Erro ao processar fotos da galeria:",
      erro
    );


    return NextResponse.json(

      {

        sucesso:
          false,

        mensagem:
          erro instanceof Error
            ? erro.message
            : "Não foi possível processar a operação.",

      },

      {

        status:
          500,

      }

    );

  }

}