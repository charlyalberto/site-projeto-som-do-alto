import { NextResponse } from "next/server";

const URL_GOOGLE_APPS_SCRIPT =
  "https://script.google.com/macros/s/AKfycbyzQvmlyQfvh_Y1JFHG697N5vbj59w-EuPfR1WmBuUGxBZ1swciS6VeMLLXdljV8KdFdQ/exec";

export async function GET() {
  try {
    const resposta = await fetch(
      `${URL_GOOGLE_APPS_SCRIPT}?acao=listarAlbuns`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!resposta.ok) {
      throw new Error(
        `Google Apps Script respondeu com status ${resposta.status}`
      );
    }

    const texto = await resposta.text();

    let resultado;

    try {
      resultado = JSON.parse(texto);
    } catch (erro) {
      console.error(
        "Resposta não JSON do Google Apps Script:",
        texto
      );

      throw new Error(
        "O Google Apps Script não retornou uma resposta JSON válida."
      );
    }

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

    /*
     * IMPORTANTE:
     * A área pública deve exibir somente
     * os álbuns com status PUBLICADO.
     */
    const albunsPublicados = Array.isArray(resultado.albuns)
      ? resultado.albuns.filter(
          (album: { status?: string }) =>
            String(album.status || "")
              .trim()
              .toUpperCase() === "PUBLICADO"
        )
      : [];

    return NextResponse.json({
      sucesso: true,
      albuns: albunsPublicados,
    });
  } catch (erro) {
    console.error(
      "Erro ao listar álbuns públicos da galeria:",
      erro
    );

    return NextResponse.json(
      {
        sucesso: false,
        mensagem:
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar a galeria.",
        albuns: [],
      },
      {
        status: 500,
      }
    );
  }
}