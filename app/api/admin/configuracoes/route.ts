import { NextResponse } from "next/server";

const URL_GOOGLE_APPS_SCRIPT =
  "https://script.google.com/macros/s/AKfycbyzQvmlyQfvh_Y1JFHG697N5vbj59w-EuPfR1WmBuUGxBZ1swciS6VeMLLXdljV8KdFdQ/exec";

export async function GET() {
  try {
    const resposta = await fetch(
      `${URL_GOOGLE_APPS_SCRIPT}?acao=configuracao`,
      {
        cache: "no-store",
      }
    );

    if (!resposta.ok) {
      throw new Error(
        `Google Apps Script respondeu com status ${resposta.status}`
      );
    }

    const resultado = await resposta.json();

    if (!resultado.sucesso) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem:
            resultado.mensagem ||
            "Não foi possível obter as configurações.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(resultado);
  } catch (erro) {
    console.error(
      "Erro ao consultar configurações:",
      erro
    );

    return NextResponse.json(
      {
        sucesso: false,
        mensagem:
          "Não foi possível consultar as configurações.",
      },
      { status: 500 }
    );
  }
}


// =====================================================
// POST — SALVAR CONFIGURAÇÕES
// =====================================================

export async function POST(request: Request) {
  try {
    const dados = await request.json();

    const resposta = await fetch(
      URL_GOOGLE_APPS_SCRIPT,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "text/plain;charset=utf-8",
        },
        body: JSON.stringify(dados),
      }
    );

    if (!resposta.ok) {
      throw new Error(
        `Google Apps Script respondeu com status ${resposta.status}`
      );
    }

    const resultado = await resposta.json();

    if (!resultado.sucesso) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem:
            resultado.mensagem ||
            "Não foi possível salvar as configurações.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(resultado);

  } catch (erro) {

    console.error(
      "Erro ao salvar configurações:",
      erro
    );

    return NextResponse.json(
      {
        sucesso: false,
        mensagem:
          "Não foi possível salvar as configurações.",
      },
      { status: 500 }
    );
  }
}