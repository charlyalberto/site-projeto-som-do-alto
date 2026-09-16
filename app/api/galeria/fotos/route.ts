import { NextResponse } from "next/server";

const URL_GOOGLE_APPS_SCRIPT =
  "https://script.google.com/macros/s/AKfycbyzQvmlyQfvh_Y1JFHG697N5vbj59w-EuPfR1WmBuUGxBZ1swciS6VeMLLXdljV8KdFdQ/exec";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const idAlbum = searchParams.get("idAlbum");

    if (!idAlbum || !idAlbum.trim()) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem: "O ID do álbum é obrigatório.",
          fotos: [],
        },
        {
          status: 400,
        }
      );
    }

    const resposta = await fetch(
      `${URL_GOOGLE_APPS_SCRIPT}?acao=listarFotosAlbum&idAlbum=${encodeURIComponent(
        idAlbum.trim()
      )}`,
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
            "Não foi possível carregar as fotos.",
          fotos: [],
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      sucesso: true,
      fotos: resultado.fotos || [],
    });
  } catch (erro) {
    console.error(
      "Erro ao listar fotos públicas da galeria:",
      erro
    );

    return NextResponse.json(
      {
        sucesso: false,
        mensagem:
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar as fotos.",
        fotos: [],
      },
      {
        status: 500,
      }
    );
  }
}