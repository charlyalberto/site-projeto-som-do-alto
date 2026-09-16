import { NextResponse } from "next/server";

const URL_GOOGLE_APPS_SCRIPT =
  "https://script.google.com/macros/s/AKfycbyzQvmlyQfvh_Y1JFHG697N5vbj59w-EuPfR1WmBuUGxBZ1swciS6VeMLLXdljV8KdFdQ/exec";


// =====================================================
// OBTER IP DA REQUISIÇÃO
// =====================================================

function obterIpRequisicao(
  request: Request
): string {

  const encaminhado =
    request.headers.get(
      "x-forwarded-for"
    );


  if (encaminhado) {

    return encaminhado
      .split(",")[0]
      .trim();

  }


  const ipReal =
    request.headers.get(
      "x-real-ip"
    );


  if (ipReal) {

    return ipReal.trim();

  }


  return "localhost";

}


// =====================================================
// GET — STATUS DE BLOQUEIO DE LOGIN DO IP ATUAL
// =====================================================

export async function GET(
  request: Request
) {

  try {

    const ip =
      obterIpRequisicao(
        request
      );


    const resposta =
      await fetch(
        `${URL_GOOGLE_APPS_SCRIPT}?acao=verificarBloqueioLogin&ip=${encodeURIComponent(
          ip
        )}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );


    if (!resposta.ok) {

      throw new Error(
        `Google Apps Script respondeu com status ${resposta.status}.`
      );

    }


    const resultado =
      await resposta.json();


    return NextResponse.json({

      sucesso: true,

      bloqueado:
        Boolean(
          resultado.bloqueado
        ),

      tentativasRestantes:
        Number(
          resultado.tentativasRestantes ??
          5
        ),

      minutosRestantes:
        Number(
          resultado.minutosRestantes ??
          0
        ),

    });


  } catch (erro) {

    console.error(
      "Erro ao consultar status de login:",
      erro
    );


    // =================================================
    // FALHAR ABERTO
    // =================================================

    return NextResponse.json({

      sucesso: true,

      bloqueado: false,

      tentativasRestantes: 5,

      minutosRestantes: 0,

    });

  }

}