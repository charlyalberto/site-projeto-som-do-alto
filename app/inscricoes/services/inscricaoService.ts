"use client";

type DadosInscricao = Record<string, unknown> & {
  certidaoNascimento: File;
  fotoAluno: File;
};

type ResultadoInscricao = {
  sucesso: boolean;
  mensagem?: string;
  id?: string;
};

const URL_GOOGLE_APPS_SCRIPT =
  "https://script.google.com/macros/s/AKfycbyzQvmlyQfvh_Y1JFHG697N5vbj59w-EuPfR1WmBuUGxBZ1swciS6VeMLLXdljV8KdFdQ/exec";

const arquivoParaBase64 = (
  arquivo: File
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const resultado = reader.result as string;
      const partes = resultado.split(",");

      if (partes.length < 2) {
        reject(
          new Error(
            `Não foi possível processar o arquivo: ${arquivo.name}`
          )
        );
        return;
      }

      resolve(partes[1]);
    };

    reader.onerror = () => {
      reject(
        new Error(
          `Não foi possível ler o arquivo: ${arquivo.name}`
        )
      );
    };

    reader.readAsDataURL(arquivo);
  });
};

export async function enviarInscricao(
  dados: DadosInscricao
): Promise<ResultadoInscricao> {

  const certidaoBase64 =
    await arquivoParaBase64(
      dados.certidaoNascimento
    );

  const fotoBase64 =
    await arquivoParaBase64(
      dados.fotoAluno
    );

  const dadosParaEnvio = {
    ...dados,

    certidaoNascimento: {
      name: dados.certidaoNascimento.name,
      type: dados.certidaoNascimento.type,
      size: dados.certidaoNascimento.size,
      data: certidaoBase64,
    },

    fotoAluno: {
      name: dados.fotoAluno.name,
      type: dados.fotoAluno.type,
      size: dados.fotoAluno.size,
      data: fotoBase64,
    },
  };

  console.log(
    "Enviando inscrição com documentos:",
    {
      ...dadosParaEnvio,

      certidaoNascimento: {
        name:
          dadosParaEnvio.certidaoNascimento.name,
        type:
          dadosParaEnvio.certidaoNascimento.type,
        size:
          dadosParaEnvio.certidaoNascimento.size,
      },

      fotoAluno: {
        name:
          dadosParaEnvio.fotoAluno.name,
        type:
          dadosParaEnvio.fotoAluno.type,
        size:
          dadosParaEnvio.fotoAluno.size,
      },
    }
  );

  const resposta = await fetch(
    URL_GOOGLE_APPS_SCRIPT,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "text/plain;charset=utf-8",
      },

      body: JSON.stringify(
        dadosParaEnvio
      ),
    }
  );

  const resultado =
    await resposta.json();

  console.log(
    "Resposta do Google Apps Script:",
    resultado
  );

  if (!resultado.sucesso) {
    throw new Error(
      resultado.mensagem ||
        "Não foi possível enviar a inscrição."
    );
  }

  return resultado;
}